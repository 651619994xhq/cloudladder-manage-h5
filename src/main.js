// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/css/base.css'  //导入基础样式库
import store from '@/store'
import '@/filter/index';
import '@/components/common/directives';
import './icons'
// import '@/mockData/index';
Vue.config.productionTip = false
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });
import VueKeepScrollPosition from 'vue-keep-scroll-position' //缓存滚动页面的位置
Vue.use(VueKeepScrollPosition);
import './icons'; //导入矢量图标
import * as Local from 'utils/localStorage';
import {getHashParameter} from 'utils/tool'; //获取地址栏参数


let initVue=()=>{
  console.log('location',location,'router==>',router);
  if((location.href.indexOf('/home?')>-1)&&getHashParameter('ticket')){
    console.log('入口一')
    //从统一登录入口进
    //掉登录接口 更新用户信息 更新路由信息
    store.dispatch('HANDLE_LOGIN',{
      success:(routes)=>{
        new Vue({
          el: '#app',
          router,
          store,
          components: { App },
          template: '<App/>'
        })
      },
      error:(msg)=>{
      },
      ticket: getHashParameter('ticket')
    });
    return;
  }
//刷新页面后 路由表里会只剩下本地定义的，没有登录后添加的，所以这里在处理一下
  let permission = Local.getUserInfo()?true:false;
  if(permission){
    console.log('入口二')
    let userInfo=JSON.parse(Local.getUserInfo());
    store.commit('SET_USERINFO',userInfo); //存储用户信息
    store.dispatch('HANDLE_LOGIN',{
      success:(routes)=>{
        new Vue({
          el: '#app',
          router,
          store,
          components: { App },
          template: '<App/>'
        })
      },
      error:(msg)=>{
      },
    });
     return;
  };

  console.log('入口三');
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
};

initVue();





