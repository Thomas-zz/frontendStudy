var numberOfWeakCharacters = function(properties) {
    properties.sort((a, b) => a[0] - b[0]);
    let res = 0;
    for(let i = 1; i < properties.length; i++){
        for(let j = 0; j < i; j++){
            if(properties[i][1] > properties[j][1]) res++;
        }
    }
    return res;
};

console.log(numberOfWeakCharacters())