import lazyLoading from 'utils/lazyLoading';
import {createRoutesWithRes,createMenuListWithRes,getHasSubMenuIcon} from 'utils/page';
//格式化路由
export const formatRoutes=(permissions)=>{
    if(permissions.length==0){
        return  [{
            path:'/home',
            component:lazyLoading('home'),
            name:'home'
        }];
    };
    let menuRoutes=[{
        path:'/home',
        component:lazyLoading('home'),
        redirect:'',
        children:[]
    }];
    let menuChildren=[];
    permissions.map((item)=>{
        if(!item.url){
            return;
        };
        let childrenComponet=createRoutesWithRes(item);
        if(!childrenComponet){
          return
        };
        menuChildren.push(childrenComponet);
    });

    if(menuChildren[0]){
        menuRoutes[0].children=[...menuChildren];
        menuRoutes[0].redirect=`/home/${menuChildren[0]['path']}`;
    }else{
        menuRoutes=[{
            path:'/home',
            component:lazyLoading('home'),
            name:'home'
        }];
    }

    console.log('menuRoutes',menuRoutes);
    return menuRoutes;
};

//生成生成菜单所需要的数据
export const formatMenuList= (store,permissions) =>{
    if(store.state.menuList.length>0){
        return ;
    };
    let menuList=[];
    let $index=0;
    permissions.map((item)=>{
        $index+=1;
        var $item={...item};
        //这个是有subMenu的父菜单
        if(item.parentId==0&&item.isMenu&&!item.url){
            let id=item.id;
            $item={index:String($index), title:item.name,subs:[],icon:getHasSubMenuIcon(item)};
            permissions.map((item2)=>{
               if(item2.parentId!=0&&item2.isMenu&&item2.url){
                   if(item2.parentId==id){$item.subs.push(createMenuListWithRes(item2));}
               }
            });
            menuList.push($item);
        };
        //这个时没有subMenu的父菜单
        if(item.parentId==0&&item.isMenu&&item.url){
            menuList.push(createMenuListWithRes($item));
        };
    });
    return  menuList;
};

//更新路由表信息  这里需要注意 如果登录在自己的页面系统中，由于addRoutes 并没有吧之前的路由信息移除 当更换了2个不同的角色 就会出现路由信息添加重复，可以看到所有权限了 这里可以自己重进创建一个新的路由 赋值matcher
export const updateRoutes=(router,store,permissions)=>{
   if(store.state.routes.length>0){
     return;
   };
   let menuRoutes=formatRoutes(permissions);
    router.addRoutes(menuRoutes);
    router.options.routes.push(menuRoutes);
};

