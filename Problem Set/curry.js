export default function curry(func) {
    const totalArgs = func.length;
    function curried(...args) {
      const context = this;
      if (args.length < totalArgs) {
        return function (...args2) {
          return curried.apply(context,args.concat(args2));
        };
      } else {
        return func.apply(context, args.slice(0, totalArgs));
      }
    }
  
    return curried;
  }
  