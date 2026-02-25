class AsyncCallbacks {
  order;
  callbackQueue = [];
  processingQueue = [];
  constructor(order = "FIFO") {
    this.order = order;
  }

  process(cb) {
    if (!this.processingQueue.length) {
      this.processingQueue.push(cb);
      Promise.resolve(cb()).then(() => {
        this.processingQueue = this.processingQueue.filter(
          (item) => item !== cb
        );
        if (this.callbackQueue.length) {
          let item;
          if (this.order === "FIFO") {
            item = this.callbackQueue[0];
          } else {
            item = this.callbackQueue[this.callbackQueue.length - 1];
          }
          this.callbackQueue = this.callbackQueue.filter((q) => q !== item);
          this.process(item);
        }
      });
    } else {
      if (this.processingQueue.length < 2) {
        this.processingQueue.push(cb);
        Promise.resolve(cb()).then(() => {
          this.processingQueue = this.processingQueue.filter(
            (item) => item !== cb
          );
          if (this.callbackQueue.length) {
            let item;
            if (this.order === "FIFO") {
              item = this.callbackQueue[0];
            } else {
              item = this.callbackQueue[this.callbackQueue.length - 1];
            }
            this.callbackQueue = this.callbackQueue.filter((q) => q !== item);
            this.process(item);
          }
        });
      } else {
        if (this.callbackQueue.length < 6) {
          this.callbackQueue.push(cb);
        }
      }
    }
  }
}

let dummyApi = (index) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(index);
      resolve(index);
    }, index * 1000);
  });
};

const asyncCallbacks = new AsyncCallbacks("LIFO");
asyncCallbacks.process(() => dummyApi(1));
asyncCallbacks.process(() => dummyApi(2));
asyncCallbacks.process(() => dummyApi(6));
asyncCallbacks.process(() => dummyApi(4));
asyncCallbacks.process(() => dummyApi(5));
asyncCallbacks.process(() => dummyApi(6));
asyncCallbacks.process(() => dummyApi(7));
asyncCallbacks.process(() => dummyApi(8));
asyncCallbacks.process(() => dummyApi(9));
asyncCallbacks.process(() => dummyApi(10));
