function lastDigit( str1 ,  str2 ) {
    let a = parseInt(str1[str1.length - 1]);
    let b = BigInt(str2);
    while(b !== 0n){
        if(a === 0) break;
        a = a * a % 10;
        b = b - 1n;
    }
    return a;
}

console.log(lastDigit("10","10000000000"));

// function validISBN10( isbn ) {
//     let sum = 0;
//     for(let i = 0; i < isbn.length; i++){
//         if(isbn[i] === 'X') sum += 100;
//         else sum += isbn[i] * (i + 1);
//     }
//     return sum % 11 === 0;
// }

// console.log(validISBN10("1112223339"))