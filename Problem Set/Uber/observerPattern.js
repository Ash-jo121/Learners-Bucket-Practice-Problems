class Observable {
  allCallbacks = [];
  constructor() {}

  subscribe(callback) {
    this.allCallbacks.push(callback);
    return {
      unsubscribe: () => {
        console.log(this.allCallbacks);
        this.allCallbacks = this.allCallbacks.filter(
          (item) => item !== callback
        );
      },
    };
  }

  fire(data) {
    this.allCallbacks.forEach((cb) => {
      console.log(cb(data));
    });
  }
}

const observable = new Observable();

// Subscribe to changes
const subscription = observable.subscribe(data => {
  console.log('Received:', data);
});

// Notify subscribers
observable.fire('Hello!'); // logs: "Received: Hello!"

// Unsubscribe
subscription.unsubscribe();

// No longer logs anything
observable.fire('Hello again!');
