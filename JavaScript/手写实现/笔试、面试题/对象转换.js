let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

const getChild = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = { ...item, children: [] };
      result.push(newItem);
      getChild(data, newItem.children, item.id);
    }
  }
};

const arrayToTree = (data, pid) => {
  const result = [];
  getChild(data, result, pid);
  return result;
};

// console.log(JSON.stringify(arrayToTree(arr, 0)))
console.log(JSON.stringify(arrayToTree2(arr, 0)));

// --------------------------------------------------
// 继续优化的话可以将两次遍历合并为一次
function arrayToTree2(data) {
  let res = [];
  let map = new Map();

  for (let item of data) {
    map.set(item.id, { ...item, children: [] });
  }

  for (let item of data) {
    let id = item.id;
    let pid = item.pid;
    let node = map.get(id);
    if (pid === 0) {
      res.push(node);
    } else {
      map.get(pid).children.push(node);
    }
  }
  return res;
}

let res = [
  {
    id: 1,
    name: "部门1",
    pid: 0,
    children: [
      { id: 2, name: "部门2", pid: 1, children: [] },
      {
        id: 3,
        name: "部门3",
        pid: 1,
        children: [
          {
            id: 4,
            name: "部门4",
            pid: 3,
            children: [{ id: 5, name: "部门5", pid: 4, children: [] }],
          },
        ],
      },
    ],
  },
];

