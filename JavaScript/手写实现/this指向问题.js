var testFunc = function () {
  console.log(this)
}

// var testFunc = () => {
//   console.log(this)
// }

var objA = {
  test: testFunc
}

var objB = {};
var testFuncBind = testFunc.bind(objA);
var ttFunc = objA.test;

testFunc();
objA.test();
testFuncBind();
testFunc.apply(objA);
testFuncBind.apply(objB);
ttFunc();
