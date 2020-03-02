import lazyLoading from 'utils/lazyLoading'
//构建路由信息
export const createRoutesWithRes = (res)=>{
      let path=res.url;
      if(path.indexOf('real-time-take-order')>-1){
          return {path:'real-time-take-order',name:'realTimeTakeOrder',component: lazyLoading('realTimeTakeOrder'),meta:{title:'实时接单',subTitle:'',keepAlive: true,requireAuth:true}}
      }
};

//构建菜单数据
export const createMenuListWithRes = (res)=>{
    let path=res.url;
    if(path.indexOf('real-time-take-order')>-1){
        return {index:'/home/real-time-take-order',title:'实时下单',icon:''}
    }
    return {index:'/404',title:res.name};
};

//获取主标题下的图标
export const getHasSubMenuIcon = (res)=>{
    if(res.name=='订单管理'){
        return 'iconfile-text'
    }
}



