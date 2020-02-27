const Mock=require('mockjs');
import api from '@/common/api/api';
const Random = Mock.Random;
const userInfo = function(){
    let   data={
        "appUrl": "",
        "loginUrl": "",
        "loginUserInfo": {
            "permissions": [
                {
                    "code": "",   //parenId!=0&&isMenu=true&&url 子菜单     父菜单 parrntId==0&&isMenu=true&&!url   匹配父菜单 根据父菜单的Id 找到子菜单想用的parentId
                    "id": 1,
                    "isMenu": true,
                    "name": "订单管理",
                    "parentId": 0,
                    "url": ""
                },
                {
                    "code": "",
                    "id": 1213,
                    "isMenu": true,
                    "name": "订单列表",
                    "parentId": 1,
                    "url": "order-list"
                },
            ],
            "realname": "熊海强",
            "roleId": 52263,
            "roleName": "hello",
            "userId": 31231231231,
            "username": "熊海强"
        },
        "token": "321312423423"
    }
    return data
};

Mock.mock(api.GET_USER_INFO, 'post', userInfo);




