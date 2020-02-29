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

//查询订单列表
export const getOrderList = (param={})=>{
    let mobileNo=param.mobileNo?param.mobileNo:'',orderNo=param.orderNo?param.orderNo:'',orderState=param.orderState?param.orderState:'',productCode=param.productCode?param.productCode:'',
      pageNum=param.pageNum?param.pageNum:1,pageSize=param.pageSize?param.pageSize:10;
    return awaitWrap(axios.post(api.GET_ORDER_LIST,{mobileNo,orderNo,orderState,productCode,pageNum,pageSize}));
};
//setOnlineState 客服设置上下线 0不在线 1 在线
export const setOnlineState = (param={})=>{
  let onlineState=param.onlineState?param.onlineState:0;
  return awaitWrap(axios.post(api.SET_ONLINE_STATE,{onlineState}));
};
//分配客服
export const assignCase = (param={})=>{
  return awaitWrap(axios.post(api.ASSIGN_CASE,{}));
};
//查询节点流程
export const getOrderProcess = (param={})=>{
  let orderNo=param.orderNo?param.orderNo:'';
  return awaitWrap(axios.post(api.GET_ORDER_PROCESS,{orderNo}));
};

//获取银行卡信息
export const getBankInfo = (param={})=>{
  let componentCode=param.componentCode?param.componentCode:'',orderNo=param.orderNo?param.orderNo:'';
  return awaitWrap(axios.post(api.GET_BANK_INFO,{componentCode,orderNo}));
};
//获取身份正信息
export const getIdCard= (param={})=>{
  let orderNo=param.orderNo?param.orderNo:'',componentCode=param.componentCode?param.componentCode:'';
  return awaitWrap(axios.post(api.GET_IDENTITY_PHOTOS,{componentCode,orderNo}));
};
//获取登录信息
export const getSmsLogin= (param={})=>{
  let orderNo=param.orderNo?param.orderNo:'',componentCode=param.componentCode?param.componentCode:'';
  return awaitWrap(axios.post(api.GET_LOGIN_INFO,{orderNo,componentCode}));
};
//获取短信验证信息
export const getSmsVerify= (param={})=>{
  let orderNo=param.orderNo?param.orderNo:'',componentCode=param.componentCode?param.componentCode:'';
  return awaitWrap(axios.post(api.GET_LOGIN_INFO,{orderNo,componentCode}));
};
