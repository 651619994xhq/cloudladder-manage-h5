import * as Local from 'utils/localStorage';
import {updateRoutes,formatMenuList} from '@/common/permission/menu';
import router from '@/router/index';
import store from '@/store/index';
export default {
    //更新菜单信息
    HANDLE_MENU(state,permissions){
        updateRoutes(router,store,permissions);
        let menuList=[...formatMenuList(store,permissions)];
        state.menuList=menuList;
        state.routes=permissions;
    },
    //清理菜单信息
    CLEAR_MENU(state){
        console.log('HANDLE_MENU is run');
        state.routes=[];
        state.menuList=[];
        Local.removeMenuList();
    },
    SET_APPNAME_LIST(state,appNameList){
        state.appNameList = appNameList;
    }
}
