//In a singleton design pattern, only one object is created for each interface (class or function) and the same object is returned
//every time when the function is called or class is called

const object1 = singleton.getInstance();
const object2 = singleton.getInstance();

const singleton = (function () {
  let instance;

  function createInstance() {
    const object = new Object("I am the instance");
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
