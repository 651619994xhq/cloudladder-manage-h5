import Vue from 'vue'
// import {ORDER_STATE,COOPERATION_WAY,REPAY_TYPE,LOAN_STATE,REPAY_STATE,AUDIT_STATE,MAKE_LOAN_STATE,REPAY_PERIOD,GUARANTY_TYPE,TRANSACTION_STATUS,LOAN_TYPE} from 'utils/constants';
//格式化时间戳
Vue.filter('dateTimeFormat',(value)=>{
    if(!value){
        return '';
    };
    var time = new Date(+value);
    var rightTwo = (v) => {v = '0' + v;
        return v.substring(v.length - 2, v.length)
    }
    if (time == null) return;
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return year + '-' + rightTwo(month) + '-' + rightTwo(date) + ' ' + rightTwo(hours) + ':' + rightTwo(minutes) + ':' + rightTwo(seconds);
});
//手机号 脱敏
Vue.filter('noPassByMobile',(str)=>{
    if(null != str && str != undefined){
        var pat=/(\d{3})\d*(\d{4})/;
        return str.replace(pat,'$1****$2');
    } else {
        return "";
    }
});
//证件号 脱敏
Vue.filter('noPassByIdCard',(str)=>{
    if(null != str && str != undefined){
        var pat=/(\d{4})\d*(\d{4})/;
        return str.replace(pat,'$1****$2');
    } else {
        return "";
    }
});
//人名 脱敏
Vue.filter('noPassByName',(str)=>{
    if(null != str && str != undefined){
        if(str.length <= 3){
            return "*" + str.substring(1,str.length);
        } else if(str.length > 3 && str.length <= 6){
            return "**" + str.substring(2,str.length);
        } else if(str.length > 6){
            return str.substring(0,2) + "****" + str.substring(6,str.length)
        }
    } else {
        return "";
    }
});
