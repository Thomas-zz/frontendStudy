var firstDayBeenInAllRooms = function (nextVisit) {
    let map = new Map();
    let len = nextVisit.length;
    let day = 0;

    for (let i = 0; i < len; i++) {
        map.set(i, 0);
    }

    find(0);
    return day;

    function find(n){
        if(map.get(nextVisit[len - 1]) === 1) return;
        let count = map.get(n) + 1;
        day++;
        if(count & 1) {
            find(nextVisit[n]);
            map.set(n, count);
        }else{
            find((n + 1) % len);
            map.set(n, count);
        }
    }
};

console.log(firstDayBeenInAllRooms([0,0]))