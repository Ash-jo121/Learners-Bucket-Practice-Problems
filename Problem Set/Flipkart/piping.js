function pipe(){
    return function(...args){

    }
}

// Input:
// {
//   a : {
//     b : (a,b,c) => a+b+c,
//     c : (a,b,c) => a+b-c,
//   },
//   d : (a,b,c) => a-b-c
// }

// const output = pipe(obj)(1,1,1);
// console.log(output);

// Output:
// {
//   a : {
//     b : 3,
//     c : 1
//   },
//   d: -1
// }