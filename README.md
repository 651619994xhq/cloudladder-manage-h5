# admin

> this is admin project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 可以考虑页面 动态路由部件映射 暂缺

#export default {
#	// login: require('login/index').default, // 同步的方式
#	// login: () => import('login/index') // 异步的方式
#	"Layout": () => import('@/views/layout/Layout'),
#	"home": () => import('@/components/Home'),
#	"DataAnalysis": () => import('~/contentShop/contentHome'),
#	"ContentHome": () => import('~/contentShop/contentHome'),
#	"TagSetting": () => import('~/contentShop/TagAndDetail/tagsetting'),
#
#}

## 后台权限这块 用到 AddRoutes 后台返回路由表信息 前端进行处理成路由信息  防止页面刷新的时候数据丢失 可以将路由信息保存在sesssion或者localstoage 暂缺
#权限 分为1.页面权限2.操作权限3.数据权限
#toB 可能不需要做的要求非常高，如果toC 如果有A权限过期B权限获得 这种情况 前端可能就需要在每个页面跳转前核查权限有没有变化 如果有变化 刷新页面权限 这块还是必须需要考虑的

