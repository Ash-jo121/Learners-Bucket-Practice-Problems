export class Events{
    obj = {};
    constructor(){}

    subscribe(name,cb){
        if(!obj[name]){
            obj[name] = [{callBack:cb,isOnceOnly:false,counter:0}]
        }else{
            obj[name].push({callBack:cb,isOnceOnly:false,counter:0});
        }
        return {
            remove:() => {
                let i = 0;
                obj[name].forEach((element,index) => {
                    if(element.callBack === cb){
                        index = i;
                    }
                });
                obj[name].splice(i,1);
            }
        }
    }

    publish(name,data){
        
    }

}