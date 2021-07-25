
var myAtoi = function (s) {
    const number = parseInt(s, 10);
    if (isNaN(number)) {
        return 0;
    }

    const Max = Math.pow(2, 31) - 1;
    const Min = Math.pow(-2, 31);

    if (number < Min || number > Max) {
        return number < 0 ? Min : Max;
    }

    return res;
};

console.log(myAtoi('42'))