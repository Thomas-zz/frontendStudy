import crypto from "crypto";

// md5加密算法，混入私钥增加加密强度，返回十六进制格式的值
export default (str: string) => {
  return crypto
    .createHash("md5")
    .update("zyan" + str)
    .digest("hex");
};
