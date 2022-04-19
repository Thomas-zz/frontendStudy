// interface Task {
//   // 任务id
//   id: string;
//   // 任务执行耗时
//   cost: number;
//   // 前置任务id，可选
//   dep?: string;
// }

// 实例任务列表
const tasks = [
  { id: "1", cost: 100 },
  { id: "2", cost: 100, dep: "4" },
  { id: "4", cost: 100, dep: "3" },
  { id: "3", cost: 100 },
];

fn(tasks)

function fn(arr) {
  let map = new Map();
  let max = 0;
  let res = [];
  for (let item of arr) {
    map.set(item.id, item);
  }

  for (let item of arr) {
    let node = map.get(item.dep);
    let time = 0;
    let track = [item.id];
    time = item.cost;

    while (node) {
      time += node.cost;
      track.push(node.id);
      node = map.get(node.dep);
    }

    if(time > max){
      max = time;
      res = track;
    }
  }
  console.log(max);
  console.log(res.reverse());
}


