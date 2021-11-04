/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  // 为空特殊处理
  if (digits.length === 0) return [];
  let numMap = new Map([
    ['0', ''],
    ['1', ''],
    ['2', 'abc'],
    ['3', 'def'],
    ['4', 'ghi'],
    ['5', 'jkl'],
    ['6', 'mno'],
    ['7', 'pqrs'],
    ['8', 'tuv'],
    ['9', 'wxyz']
  ])
  let res = [];
  dfs("", digits);
  return res;

  function dfs(str, digit) {
    // 如果字符串为空了，将拼接好的字符加入数组
    if (digit.length === 0) res.push(str);
    else {
      // 拿到字符串第一个字符，拿到其对应的数字
      let numstr = numMap.get(digit[0]);
      // 对可能性进行组合
      for (let i = 0; i < numstr.length; i++) {
        str += numstr[i];
        // 递归组好的 str和下一段字符串
        dfs(str, digit.slice(1))
        // 回溯
        str = str.slice(0, -1);
      }
    }
  }
};
// @lc code=end

