export class Router {
  obj = {};
  constructor() {}

  _createObj(tempObj, val, arr, index) {
    //Base Case
    if (index === arr.length - 1) {
      tempObj = { [arr[index]]: val };
      return tempObj;
    }

    //Recursive Case
    const lVal = arr[index];
    if(tempObj[lVal]){
        const resObj = this._createObj(tempObj[lVal], val, arr, index + 1);
        tempObj[lVal] = resObj;
    }else{
        tempObj[lVal]={};
        const resObj = this._createObj(tempObj[lVal],val,arr,index+1);
        tempObj[lVal] = resObj;
    }
    return tempObj;
  }

  addRoute(route, value) {
    let l = route.split("/");
    l = l.filter((item) => item !== "");
    this.obj = this._createObj(this.obj, value, l, 0);
  }

  callRoute() {}
}

const router = new Router();
router.addRoute("/foo", "foo")
router.addRoute("/bar/*/baz", "bar")
