// 1. 要求时间复杂度为O(1),链表的删除操作可以满足O(1),但是链表的查询时间
// 复杂度是O(N)，我们可以利用双向链表结合哈希表，在哈希表中找到key对应的节点，
// 就能快速定位到链表节点，并实现删除节点。

// 2. 添加新节点时，我们从头开始加，然后删除链表最后一个节点。每次有某一节点
// 被访问，就把它提到链表最前面

class DoubleLinkedListNode {
  constructor(key, value) {
    this.key = key;
    this.val = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capatity) {
    this.capatity = capatity;
    this.usedSpace = 0;
    this.hashmap = new Map();
    this.dummyHead = new DoubleLinkedListNode(null, null);
    this.dummyTail = new DoubleLinkedListNode(null, null);
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.prev = this.dummyHead;
  }

  _isFull() {
    return this.usedSpace === this.capatity;
  }

  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
    return node;
  }

  _addToHead(node) {
    const head = this.dummyHead.next;
    node.next = head;
    head.prev = node;
    node.prev = this.dummyHead;
    this.dummyHead.next = node;
  }

  get(key) {
    if (this.hashmap.has(key)) {
      const node = this.hashmap.get(key);
      this._addToHead(this._removeNode(node));
      return node.val;
    } else {
      return -1;
    }
  }

  put(key, value) {
    if (this.hashmap.has(key)) {
      const node = this.hashmap.get(key);
      node.val = value;

      this._addToHead(this._removeNode(node));
    } else {
      if (this._isFull()) {
        const node = this.dummyTail.prev;
        this.hashmap.delete(node.key);
        this._removeNode(node);
        this.usedSpace--;
      }
      const node = new DoubleLinkedListNode(key, value);
      this._addToHead(node);
      this.hashmap.set(key, node);
      this.usedSpace++;
    }
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

