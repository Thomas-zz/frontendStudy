let a = function () {
  console.log(1);
};

let _a = a;

a = function () {
  _a();
  console.log(2);
};

a();
