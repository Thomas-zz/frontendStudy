function addBigInt(num1, num2) {
  let maxLength = Math.max(num1.length, num2.length);

  num1 = num1.padStart(maxLength, "0");
  num2 = num2.padStart(maxLength, "0");

  let sum = "";
  let jin = 0;
  let num = 0;
  for (let i = maxLength - 1; i >= 0; i--) {
    num = parseInt(num1[i]) + parseInt(num2[i]) + jin;
    jin = Math.floor(num / 10);
    sum = (num % 10) + sum;
  }
  if (jin === 1) {
    sum = "1" + sum;
  }
  return sum;
}

let a = "132463545876143236548576";
let b = "132438490582374143236548576";

let c = 132463545876143236548576n;
let d = 132438490582374143236548576n;

console.log(addBigInt(a, b));
console.log(c + d)

