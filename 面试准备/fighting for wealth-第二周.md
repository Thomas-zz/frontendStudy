## for in 和 for of

**for in **

- for in 更多的是遍历对象，它遍历的是键名
- 遍历的顺序不一定
- 是在其自身和继承的属性上进行迭代
- 会遍历所有可枚举属性，包括数组的原型属性method和索引name

**for of**

- for of用于遍历数组，遍历的是数组的值
- 顺序是按照数组中的顺序来遍历
- 可以正确响应break、continue和return语句，forEach()不行