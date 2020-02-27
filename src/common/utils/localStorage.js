import Cookies from 'js-cookie';
const UserInfo='User-Info';  //用localStoarge 存储{token,userName,userImg}
const MenuList='Menu-List';    //用sessionStorage 暂存菜单数据

export function getUserInfo(){
  if(window.localStorage){
    return  localStorage.getItem(UserInfo)||'';
  }else{
    return  Cookies.get(UserInfo)||'';
  }
}

export function setUserInfo(value){
  if(window.localStorage){
    localStorage.setItem(UserInfo,value)
  }else{
    Cookies.set(UserInfo, value)
  }
}

export function removeUserInfo(){
  if(window.localStorage){
    localStorage.removeItem(UserInfo)
  }else{
    Cookies.remove(UserInfo)
  }
}

export function getMenuList(){
  // if(window.sessionStorage){
  //   return sessionStorage.getItem(MenuList)||'';
  // }else{
  //   return Cookies.get(MenuList)||'';
  // }
}

export function setMenuList(value){
  // if(window.sessionStorage){
  //   return  sessionStorage.setItem(MenuList,value);
  // }else{
  //   return  Cookies.set(MenuList, value)
  // }
}

export function removeMenuList(){
  // if(window.sessionStorage){
  //   return  sessionStorage.removeItem(MenuList);
  // }else{
  //   return  Cookies.remove(MenuList)
  // }
}




