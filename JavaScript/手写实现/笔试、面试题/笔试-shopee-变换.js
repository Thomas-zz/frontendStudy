function Point(a, b) {
  this.x = a || 0;
  this.y = b || 0;
}

function canReachEndPoint(startPoint, endPoint) {
  return dfs(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

  function dfs(pointX, pointY) {
    // console.log(pointX, endPointX, pointY, endPointY);
    if (pointX === endPoint.x && pointY === endPoint.y) return true;
    if (pointX > endPoint.x || pointY > endPoint.y) return false;
    return (
      dfs(pointX, pointX + pointY) ||
      dfs(pointX + pointY, pointY)
    );
  }
  // write code here
}

let pointA = new Point(1, 1);
let pointB = new Point(2, 2);

console.log(canReachEndPoint(pointA, pointB));
