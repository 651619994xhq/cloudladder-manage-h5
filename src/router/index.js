import Vue from 'vue'
import Router from 'vue-router'
import lazyLoading from 'utils/lazyLoading'
Vue.use(Router);
//静态路由
let staticRoutes = [
    {
        path: '/404',
        name: '404',
        component: lazyLoading('noData'),
        meta: {
            title: '404'
        },
    },
    {
        path: '/403',
        name: '403',
        component: lazyLoading('noPermission'),
        meta: {
            title: '403'
        },
    },
    {
      path: '/test',
      name: 'test',
      component: lazyLoading('realTimeTakeOrder'),
      meta: {
        title: '实时接单'
      },
    },
    {
        path: '*',
        name: '405',
        component: lazyLoading('noData'),
        meta: {
            title: '405'
        },
    },
    // {
    //     path: '/home',
    //     name: 'home',
    //     component: lazyLoading('home'),
    //     meta: {
    //         title: '订单管理'
    //     },
    //     children:[
    //         {path:'order-list',name:'orderList',component: lazyLoading('orderList'),meta:{title:'订单管理',subTitle:'订单管理/订单列表',keepAlive: true,requireAuth:true}}
    //     ]
    // },
];
let router = new Router({
    // mode: 'history',
    // history:false,
    // base:'/dist',
    routes: [
        ...staticRoutes,
    ]
});
//设置路由监听 如果页面没有登录信息了 就会跳转登录页面
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
});
export default router;
