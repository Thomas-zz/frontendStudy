// 通过js的map有序特性，我们可以不使用链表就能实现LRU缓存

class LRUCache{
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key){
    if(!this.map.has(key)) return -1;
    let val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key,val);
    return val;
  }

  put(key, value){
    if(this.map.has(key)){
      this.map.delete(key);
    }
    this.map.set(key, value);
    let keys = this.map.keys();
    while(this.map.size > this.capacity) {
      this.map.delete(keys.next().value);
    }
  }
}