import {getUserInfo,logout} from '@/common/service/index';
import Vue from 'vue';
export default {
    //实现登录操作 获取用户信息 初始化菜单 token menuList
    async HANDLE_LOGIN({commit,state},{success,error,ticket}){
      let [err,data]=await getUserInfo({ticket});
      if(err!==null){error&&error();return ;}
        let userInfo={realname:data.loginUserInfo.realname,roleId:data.loginUserInfo.roleId,roleName:data.loginUserInfo.roleName,userId:data.loginUserInfo.userId,username:data.loginUserInfo.username,token:data.token}
        //调用子模块的
        commit('SET_USERINFO',userInfo);
        commit('HANDLE_MENU',data.loginUserInfo.permissions?data.loginUserInfo.permissions:[]);
        success&&success()
    },
    //实现登出操作 清空用户数据 token 清空 menuList 清空
    async HANDLE_LOGIN_OUT(store){
        let [err,data]=await logout({});
        if(err!==null){Vue.prototype.$message({type:'error',message:'退出登录失败'});return ;}
        Vue.prototype.$message({type:'success',message:'退出登录成功'});
        //调用子模块的信息
        store.commit('CLEAR_USERINFO'); //清理用户信息
        store.commit('CLEAR_MENU'); //清理菜单数据
        if(data.loginUrl) window.location=data.loginUrl;
    },
    //查询app列表信息
    async GET_APPNAME_LIST(store){
        // let [err,data]=await getAppNames({});
        // if(err!==null){Vue.prototype.$message({type:'error',message:'获取appName列表失败'});return ;}
        // //调用子模块的信息
        // store.commit('SET_APPNAME_LIST',data||[]);
    }
}
