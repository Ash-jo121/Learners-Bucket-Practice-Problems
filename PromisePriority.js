const priority = (inputs) => {
    let priority = 10000000;
    inputs.forEach(input => {
        if(input.priority < priority){
            priority = input.priority;
        }
    });

    let counter = 0;
    let inputLength = inputs.length;
    let resolvedResult = 0;
    return new Promise((resolve,reject) => {
        
    })
    inputs.forEach((input) => {
        Promise.resolve(input.task).then((val) => {
            counter++;
            if(priority === input.priority){
                resolvedResult = val;
            }

            if(counter === inputLength){
                Promise.resolve(resolvedResult);
            }
        }).catch((err) => {
            Promise.reject(err);
        })
    })
}