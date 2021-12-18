import { body } from "express-validator";
import validate from "../middleware/validation";
import { User } from "../models/model/index";
import md5 from "../util/md5";
import { Query } from "mongoose"

// 定义校验规则，bail()表示前面的校验都通过了才能继续后面的校验
// custom是自定义校验规则
const register = validate([
  body("user.username")
    .notEmpty()
    .withMessage("用户名不能为空")
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        return Promise.reject("用户已存在");
      }
    }),

  body("user.password").notEmpty().withMessage("密码不能为空"),

  body("user.email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不正确")
    .bail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject("邮箱已存在");
      }
    }),
]);

// 设置多组校验规则，一组规则内的校验异步执行，一组规则都通过了，才会进入下一组规则校验
const login = [
  validate([
    body("user.email").notEmpty().withMessage("邮箱不能为空"),
    body("user.password").notEmpty().withMessage("密码不能为空"),
  ]),
  validate([
    // 取到req对象，因为我们要在它上面挂在数据
    body("user.email").custom(async (email, { req }) => {
      // select 是查找并返回指定属性，优先级比select: false高
      const user: Query<any, any, {}, any> = await User.findOne({ email }).select([
        "email",
        "username",
        "bio",
        "image",
        "password",
      ]);
      if (!user) {
        return Promise.reject("用户不存在");
      }

      // 将数据挂在到req请求对象中，后续中间件也就可以继续使用返回的user数据了
      req.user = user;
    }),
  ]),
  validate([
    body("user.password").custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject("密码错误");
      }
    }),
  ]),
];

export default {
  register,
  login,
};
