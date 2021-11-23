class EventEmiter {
  // key为发布对象的名字，value为订阅列表
  subscribes: Map<string, Array<Function>>;

  constructor() {
    this.subscribes = new Map();
  }

  // 事件订阅方法，订阅某个事件并将订阅方法加入到订阅列表
  listen(key: string, callback: Function) {
    const sub = this.subscribes.get(key) || [];
    sub.push(callback);
    this.subscribes.set(key, sub);
  }

  // 事件发布方法，根据key来找到订阅列表，并依次调用
  trigger(key: string, ...args: Array<any>) {
    const sub = this.subscribes.get(key);
    if (!sub || sub.length === 0) {
      return false;
    }
    const context = this;
    sub.forEach((fn) => {
      fn.apply(context, args);
    });
  }

  // 取消订阅，取消key对应的订阅列表中的某个订阅方法。
  remove(key: string, callback: Function) {
    const sub = this.subscribes.get(key);
    if (!sub) {
      return false;
    }
    const newSub = sub.filter((fn) => fn !== callback);
    this.subscribes.set(key, newSub);
  }

}

const eventEmiter = new EventEmiter();

eventEmiter.listen("sayhi", () => {
  console.log("hi");
});

eventEmiter.trigger("sayhi");
