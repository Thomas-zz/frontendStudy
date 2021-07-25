function content(obj){
    function F(){}
    F.prototype = obj.prototype;
    return new F();
}

function inherit(superClass, subClass) {
    let e = content(superClass);
    subClass.prototype = e;
    subClass.prototype.constructor = subClass;
}