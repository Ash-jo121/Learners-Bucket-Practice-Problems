function helperFunction(root,obj,level){
    if(root === null){
        return;
    }

    if(!obj.hasOwnProperty(level)){
        obj[level] = root.val;
    }

    helperFunction(root.right,obj,level+1);
    helperFunction(root.left,obj,level+1);
}

var rightSideView = function (root) {
    let masterObj = {};
    helperFunction(root,masterObj,0);
    let result = Object.values(masterObj);
    return result;
};