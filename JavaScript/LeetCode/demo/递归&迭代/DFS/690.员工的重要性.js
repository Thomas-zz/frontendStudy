/*
 * @lc app=leetcode.cn id=690 lang=javascript
 *
 * [690] 员工的重要性
 */

// @lc code=start
/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function(employees, id) {
  let res = 0;
  dfs(id);
  return res;
    
  function dfs(id){
    if(!employees) return 0;
    // 对所有员工信息遍历
    for(let i = 0; i < employees.length; i++){
      // 如果找到了，重要度相加，继续遍历下属
      if(employees[i].id === id){
        res += employees[i].importance;
        // 对下属进行遍历
        for(let j = 0; j < employees[i].subordinates.length; j++){
          // 查找下属
          dfs(employees[i].subordinates[j]);
        }
        // id唯一，所以可以剪枝
        break;
      }
    }
  }
};
// @lc code=end

