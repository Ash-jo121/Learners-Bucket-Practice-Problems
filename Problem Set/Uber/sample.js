class Sample {
  name = "ashish";
  subscribe() {
    this.val = 4;
    return {
      unsubscribe: () => {
        console.log(this.val, this.name);
      },
    };
  }
}

const s = new Sample();
const t = s.subscribe();
t.unsubscribe();
