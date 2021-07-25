// 暴力解法
var romanToInt = function (s) {
    const obj = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
    const map = new Map(Object.entries(obj));
    let rome = s.split('');
    let result = 0;
    for (let i = 0; i < rome.length; i++) {
        if (rome[i] == 'I' && rome[i + 1] == 'V') {
            result += 4;
            i++;
        } else if (rome[i] == 'I' && rome[i + 1] == 'X') {
            result += 9;
            i++;
        } else if (rome[i] == 'X' && rome[i + 1] == 'L') {
            result += 40;
            i++;
        } else if (rome[i] == 'X' && rome[i + 1] == 'C') {
            result += 90;
            i++;
        } else if (rome[i] == 'C' && rome[i + 1] == 'D') {
            result += 400;
            i++;
        } else if (rome[i] == 'C' && rome[i + 1] == 'M') {
            result += 900;
            i++;
        } else {
            result += map.get(rome[i]);
        }
    }
    return result;
};

// 按照rome数字的规则，从左往右数字依次减小，特别的如果有小的数字在大的数字作边，则减去这个小的数字
var romanToInt = function (s) {
    const obj = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
    const map = new Map(Object.entries(obj));
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        if (i < s.length - 1 && map.get(s[i]) < map.get(s[i + 1])) {
            result -= map.get(s[i]);
        } else {
            result += map.get(s[i]);
        }
    }
    return result;
};