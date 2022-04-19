let data = {};
let name = "zhangjuan";

// Object.defineProperty可以精确地添加或修改对象的属性
Object.defineProperty(data, "name", {
  get() {
    console.log("get");
    return name;
  },
  set(newValue) {
    console.log("set");
    name = newValue;
  },
});

console.log(data.name);
data.name = "zyan";
console.log(data.name);
