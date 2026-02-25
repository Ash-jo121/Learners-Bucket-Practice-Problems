export class Observable {
  callbacks = [];

  subscribe(cb) {
    this.callbacks.push(cb);
    return {
      unsubscribe: () => {
        this.callbacks = this.callbacks.filter((item) => item !== cb);
      },
    };
  }

  notify(data) {
    this.callbacks.forEach((cb) => {
      cb(data);
    });
  }
}

const observable = new Observable();

const subscription = observable.subscribe((data) => {
  console.log("Received:", data);
});

// Notify subscribers
observable.notify("Hello!"); // logs: "Received: Hello!"

// Unsubscribe
subscription.unsubscribe();

// No longer logs anything
observable.notify("Hello again!");
