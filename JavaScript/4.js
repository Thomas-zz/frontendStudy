function minSailCost( input ) {
    if(!input || !input[0]) return -1;
    let res = [], score = 0;
    let iLen = input.length - 1, jLen = input[0].length - 1;
    dfs(0, 0);
    return res[0] === undefined ? -1 : res.sort((a, b) => a - b)[0];

    function dfs(i, j){
        if(i > iLen || j > jLen || input[i][j] === 2) return;
        if(i !== 0 || j !== 0){
            if(input[i][j] === 0) score += 2;
            else score += 1;
        }
        dfs(i + 1, j);
        dfs(i, j + 1);
        if(i === iLen && j === jLen){
            res.push(score);
        }
        if(input[i][j] === 0) score -= 2;
        else score -= 1;
    }
}

console.log(minSailCost([[2,2],[2,2]]));