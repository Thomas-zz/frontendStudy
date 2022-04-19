function trim(str) {
  return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}

let a = "   wersd  ";
console.log(a);
console.log(trim(a));
