function circuitBreaker(fn,failureCount,timeThreshold){
    let attempts = 0;
    let timeSinceLastFailure = 0;

    return function(...args){
        let context = this;
        if(attempts < failureCount){
            const result = fn.apply(context,args);
            attempts++;
            return result;
        }else{
            if(timeSinceLastFailure === 0){
                timeSinceLastFailure = Date.now();
            }

            const diff = Date.now() - timeSinceLastFailure;
            if(diff > )
        }
    }
}