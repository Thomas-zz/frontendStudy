let count = parseInt(read_line());
for (let i = 0; i < count; i++) {
  line = read_line();
  if (parseInt(line) % 11 === 0) {
    print("yes");
    continue;
  }
  let n = line.split("1").length - 1;
  if (n >= 2) {
    print("yes");
  } else {
    print("no");
  }
}
