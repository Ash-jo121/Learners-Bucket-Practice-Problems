class QueueCallbacks {
  callbackQueue = [];
  taskQueue = [];
  constructor(order, concurrency, maxQueueSize) {
    this.order = order;
    this.concurrency = concurrency;
    this.maxQueueSize = maxQueueSize;
  }

  process(callback) {
    if (this.taskQueue.length >= this.concurrency) {
      this.callbackQueue.push(callback);
    } else {
      if (
        this.taskQueue.length < this.concurrency &&
        this.callbackQueue.length === 0
      ) {
        this.execute(callback);
      }
    }
  }

  execute(callback) {
    this.taskQueue = this.taskQueue.filter(
      (item) => item.status !== "finished",
    );
    this.taskQueue.push({
      fn: callback,
      status: "running",
      id: crypto.randomUUID(),
    });
    let index = this.taskQueue.length - 1;
    Promise.resolve(callback)
      .then((res) => {
        console.log(res);
        this.taskQueue[index].status = "finished";
        let element;
        if (this.order === "FIFO") {
          element = this.callbackQueue.shift();
        } else {
          element = this.callbackQueue.pop();
        }
        if (!element) {
          return;
        }
        this.execute(element);
      })
      .catch(console.error);
  }
}

let dummyApi = (index) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(index);
    }, index * 1000);
  });
};

const asyncCallbacks = new QueueCallbacks("FIFO", 2, 8);
asyncCallbacks.process(dummyApi(1));
asyncCallbacks.process(dummyApi(2));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(4));
asyncCallbacks.process(dummyApi(5));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(7));
asyncCallbacks.process(dummyApi(8));
asyncCallbacks.process(dummyApi(9));
asyncCallbacks.process(dummyApi(10));
