import lazyLoading from 'utils/lazyLoading'
//构建路由信息
export const createRoutesWithRes = (res)=>{
      let path=res.url;
      if(path.indexOf('order-list')>-1){
          return {path:'order-list',name:'orderList',component: lazyLoading('orderList'),meta:{title:'订单管理',subTitle:'订单管理/订单列表',keepAlive: true,requireAuth:true}}
      }
};

//构建菜单数据
export const createMenuListWithRes = (res)=>{
    let path=res.url;
    if(path.indexOf('order-list')>-1){
        return {index:'/home/order-list',title:'订单列表',icon:''}
    }
    return {index:'/404',title:res.name};
};

//获取主标题下的图标
export const getHasSubMenuIcon = (res)=>{
    if(res.name=='订单管理'){
        return 'iconfile-text'
    }
}



