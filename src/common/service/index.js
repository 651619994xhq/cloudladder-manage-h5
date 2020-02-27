import api from '@/common/api/api';
import axios from 'utils/Axios';
import awaitWrap from 'utils/awaitWrap';
//获取用户信息
export const getUserInfo = (param)=>{
    let ticket=param.ticket?param.ticket:'';
    return awaitWrap(axios.post(`${api.GET_USER_INFO}?ticket=${ticket}`,{}));
};
//退出登录
export const logout = (param)=>awaitWrap(axios.post(api.LOGOUT,{}));

//查询资产列表
export const queryTaskOrderList = (param)=>{
    let appName=param.appName?param.appName:'',bankNo=param.bankNo?param.bankNo:'',endTime=param.endTime?(''+param.endTime):'',idCard=param.idCard?param.idCard:'',phoneNo=param.phoneNo?param.phoneNo:'',startTime=param.startTime?(''+param.startTime):'',taskName=param.taskName?param.taskName:'',userName=param.userName?param.userName:'',sourceOrderId=param.sourceOrderId?param.sourceOrderId:'',
      registerPhoneNo=param.registerPhoneNo?param.registerPhoneNo:'',taskInstanceId=param.taskInstanceId?param.taskInstanceId:'',userId=param.userId?param.userId:'';
    return awaitWrap(axios.post(api.QUERY_TASK_ORDER_LIST,{appName,bankNo,endTime,idCard,phoneNo,startTime,taskName,userName,sourceOrderId,registerPhoneNo,taskInstanceId,userId}));
};

//查询还款计划
export const queryRepayPlans = (param)=>{
    let taskId=param.taskId?param.taskId:'';
    return awaitWrap(axios.post(api.GET_REPAY_PLANS,{taskId}));
};

//查询新的还款计划
export const queryNewRepayPlans = (param)=>{
    let taskId=param.taskId?param.taskId:'';
    return awaitWrap(axios.post(api.GET_MANAGE_PLANS,{taskId}));
};


//获取appName
export const getAppNames = (param)=>awaitWrap(axios.post(api.GET_APP_INFOS,{}));


//获取资方名称
export const getProductList=(param)=>{
  return awaitWrap(axios.post(api.GET_PRODUCT_LIST,{}));
};
