let data = [
  { id: 1, pid: 0, value: "level 0" },
  { id: 2, pid: 1, value: "level 1" },
  { id: 3, pid: 1, value: "level 1" },
  { id: 4, pid: 2, value: "level 2" },
  { id: 5, pid: 3, value: "level 2" },
  { id: 6, pid: 4, value: "level 0" },
];

function conversion(data) {
  const map = new Map();
  for (let i = 0; i < data.length; i++) {
    let node = data[i];
    let dep = map.get(node.id);
    if (!dep) map.set(node.id, node);
    let father = map.get(node.pid);
    if (father) {
      if (father.children) father.children.push(node);
      else father.children = [node];
      data.splice(i, 1);
      i--;
    }
  }
  return data;
}

console.log(JSON.stringify(conversion(data)));

[
  {
    id: 1,
    pid: 0,
    value: "level 0",
    children: [
      {
        id: 2,
        pid: 1,
        value: "level 1",
        children: [
          {
            id: 4,
            pid: 2,
            value: "level 2",
            children: [{ id: 6, pid: 4, value: "level 0" }],
          },
        ],
      },
      {
        id: 3,
        pid: 1,
        value: "level 1",
        children: [{ id: 5, pid: 3, value: "level 2" }],
      },
    ],
  },
];
