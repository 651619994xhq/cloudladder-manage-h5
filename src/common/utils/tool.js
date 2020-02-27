function add0(m){return m<10?'0'+m:m }
export function format(shijianchuo){
//shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
};
//导出 函数节流 在指定的时间间隔内只执行一次任务
export function Throttle(fn,delay){
   let last,timer;
   return function(){
       var that=this;
       let _args=arguments;
       let now= +new Date();
       if(last&&now<last+delay){
           clearTimeout(timer);
           timer=setTimeout(function () {
               last=now;
               fn.apply(that,_args);
           },delay)
       }else{
           last=now;
           fn.apply(that,_args);
       }
   }
}

export function debounce(fn,delay){
    let timer = null;
    return function(){
        let that = this;
        let _args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.applay(that,_args);
        },delay)
    }
}

//函数缓存
export const memoize = (func) => {
    //缓存对象
    //keys是arguments,values aer results
    const cache ={};
    //返回一个新的函数
    return (...args) => {
        // 将参数转换成字符串，以便我们可以存储它
        const argStr = JSON.stringify(args)
        //如果已经存，则打印
        console.log('cache',cache,!!cache[argStr]);
        return cache[argStr];
    }
}

//是否是奇数
export const IsUnevenNum = (num) =>{
    if(num%2==0){
        return false
    }
    return true
}


export function getHashParameters(){
    let str=location.hash.split('?')[1];
    if(!str){ return {}};
    let arr=str.split('&');
    var params = {};
    for(var i=0; i<arr.length; i++){
        var data = arr[i].split("=");
        if(data.length == 2){
            params[data[0]] = data[1];
        }
    }
    return params;
}

export function getHashParameter(key){
    var params = getHashParameters();
    return params[key];
}

export function getUrlParam (name) {
    var reg = new RegExp('(^|&)' + name + '=(.*)(&[^&=]+=)');
    var regLast = new RegExp('(^|&)' + name + '=(.*)($)');
    var r = window.location.search.substr(1).match(reg) || window.location.search.substr(1).match(regLast);
    if (r != null) {
        var l = r[2].match(/&[^&=]+=/)
        if (l) {
            return decodeURIComponent(r[2].split(l[0])[0]);
        } else return decodeURIComponent(r[2]);
    }
    return null;
}

export function isRepeat(arr) {
    var hash = {};
    for (var i in arr) {
        if (hash[arr[i]]){
            return true;
        }
        hash[arr[i]] = true;
    }
    return false;
}

export function checkChinese(val) {
    let reg = /^[u4E00-u9FA5]+$/
    return reg.test(val)
}


