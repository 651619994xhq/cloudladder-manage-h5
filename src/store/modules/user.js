import * as Local from 'utils/localStorage';

const userModule = {
  state: {
    userInfo:'',
  },
  getters:{

  },
  mutations: {
    //设置用户信息
    SET_USERINFO:(state,payload)=>{
       Local.setUserInfo(JSON.stringify(payload));
       state.userInfo=payload;
    },
    //清理用户信息
    CLEAR_USERINFO:(state)=>{
      Local.removeUserInfo();
      state.userInfo='';
   },

  },
  actions: {

   }
}

export default userModule
