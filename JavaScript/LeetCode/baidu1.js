function fn(array, k) {

  for (let i = 0; i < array.length; i++) {
    let lines = array[i];
    let arr = [];
    for (let j = 0; j < lines.length; j++) {
      let num = lines[j];
      for (let m = 0; m < k; m++) {
        arr.push(num);
      }
    }
    for (let n = 0; n < k; n++) {
      console.log(...arr)

    }
  }
}

fn([[0, 1], [1, 0]], 2);