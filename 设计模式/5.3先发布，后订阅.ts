interface SubscribeEvent {
  fn: Function;
  once: boolean;
}

type CacheArgs = Array<any>;

export class EventEmiter {
  subscribes: Map<string, Array<SubscribeEvent>>;
  _cacheQueue: Map<string, Array<CacheArgs>>;

  constructor() {
    this.subscribes = new Map();
    this._cacheQueue = new Map();
  }

  addEvent(key: string, callback: Function, once: boolean = false) {
    const cache = this._cacheQueue.get(key) || [];
    // 在每次订阅的时候，事先看看缓存列表里有没有缓存的对应事件，如果有，就直接执行
    if (cache?.length !== 0) {
      // args是一些参数数组
      cache.forEach((args) => {
        callback(...args);
      });
      this._cacheQueue.delete(key);
    }
    const sub = this.subscribes.get(key) || [];
    sub.push({ fn: callback, once });
    this.subscribes.set(key, sub);
  }

  listen(key: string, callback: Function) {
    this.addEvent(key, callback);
  }

  once(key: string, callback: Function) {
    this.addEvent(key, callback, true);
  }

  trigger(key: string, ...args: Array<any>) {
    const sub = this.subscribes.get(key) || [];

    // 订阅列表里没有对这个key的订阅
    if (sub.length === 0) {
      // 放入缓存列表中
      const cache = this._cacheQueue.get(key) || [];
      cache.push(args);
      this._cacheQueue.set(key, cache);
    } else {
      // 有对这个key的订阅，执行回调
      const context = this;

      sub.forEach(({ fn }) => {
        fn.apply(context, args);
      });

      const newSub = sub.filter((item) => !item.once);
      this.subscribes.set(key, newSub);
    }
  }

  remove(key: string, callback: Function) {
    const sub = this.subscribes.get(key);

    if (!sub) {
      return false;
    }

    const newSub = sub.filter(({ fn }) => fn !== callback);
    this.subscribes.set(key, newSub);
  }
}

const eventEmmiter = new EventEmiter();

// 先发布事件
eventEmmiter.trigger('calculate', 1, 2);
eventEmmiter.trigger('calculate', 3, 4);

eventEmmiter.listen('calculate', (a: number, b: number) => {
  console.log("事件发布后才订阅的, 计算的值为",a + b);
});

