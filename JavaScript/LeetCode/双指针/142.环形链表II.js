// 快慢指针
var detectCycle = function (head) {
    if (head === null) {
        return null;
    }
    let fast = head, slow = head;
    while (fast !== null) {
        if (fast.next !== null) {
            fast = fast.next.next;
        } else {
            return null;
        }
        slow = slow.next;
        if (fast === slow) {
            let flag = head;
            while (flag !== slow) {
                flag = flag.next;
                slow = slow.next;
            }
            return flag;
        }
    }
    return null;
};