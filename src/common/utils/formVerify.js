import {regExpConfig} from "@/common/configs/regular.config";
import {isRepeat} from 'utils/tool';
//金额校验
let  $moneyVerify= (rule,value,callback)=>{
    if(value===0||value==='0'){
        callback()
        return ;
    }
    if (!value) {
        return callback(new Error('金额不能为空'))
    };
    if(!regExpConfig.money.test(value)){
        return callback(new Error('请输入正确的金额'))
    };
    callback();
};
export const moneyVerify=[{required: true, message: '不能为空'},{ validator:$moneyVerify,trigger: 'blur,change' }];
//流水号 债权编号 ... 等校验
let  $serialNumberVerify=(rule,value,callback)=>{
    if (!value) {
        return    callback(new Error('编号不能为空'))
    };
    if(!regExpConfig.isNumAlpha.test(value)){
        return callback(new Error('请输入正确的编号'))
    };
    if(value.length>50){
        return callback(new Error('字符串长度不能超过50'))
    }
    callback();
};
export const serialNumberVerify=[{required: true, message: '不能为空'},{ validator:$serialNumberVerify,trigger: 'blur,change' }];

let  $rateVerify= (rule,value,callback)=>{
    if(value===0||value==='0'){
        callback()
        return ;
    }
    if (!value) {
        return callback(new Error('费率不能为空'))
    };
    if(!regExpConfig.rate.test(value)){
        return callback(new Error('请输入正确的费率,费率为小数，最大不超过4位'))
    };
    if(value>1){
        return callback(new Error('费率不能大于1'))
    };
    callback();
};

export const rateVerify=[{required: true, message: '不能为空'},{ validator:$rateVerify,trigger: 'blur,change' }];

//校验 3,4,5 类的字符串
let $periodsVerify= (rule,value,callback)=>{
    if (!value||value==0||value=='0') {
        return callback(new Error('期数不能为空'))
    };
    if(value.length>100){
      return callback(new Error('字符长度不能超过100'));
    };
    let arr=value.split(',');
    for(let i=0,len=arr.length;i<len;i++){
        if(!regExpConfig.rate.test(arr[i])){
            return callback(new Error('请输入正确格式1,2,3,4,5'))
        };
    }
    let $isRepeat=isRepeat(arr);
    if($isRepeat){
        return  callback(new Error('请输入正确格式1,2,3,4,5 不要有重复的期数'))
    }
    callback();
};

export const periodsVerify=[{required: true, message: '不能为空'},{ validator:$periodsVerify,trigger: 'blur,change' }];

//邮箱校验
let $emailVerify= (rule,value,callback)=>{
    if (!value||value==0||value=='0') {
        return callback(new Error('邮箱不能为空'))
    };
    if(!regExpConfig.rate.test(value)){
        return callback(new Error('请输入正确的邮箱'))
    }
    callback();
};

export const emailVerify=[{ validator:$emailVerify,trigger: 'blur,change' }];

//url校验
let $urlVerify = (rule,value,callback)=>{
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

    if (!value||value==0||value=='0') {
        return callback(new Error('url不能为空'))
    };
    let re = new RegExp(strRegex);
    if(!re.test(value)){
    return callback(new Error('url格式不正确'))
   };
    callback();
};
export const urlVerify=[{required: true, message: '不能为空'},{ validator:$urlVerify,trigger: 'blur,change' }];

