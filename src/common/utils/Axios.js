import axios from 'axios';
import store from '@/store';
const baseURL = process.env.BASE_URL;
console.log('baseURL==>',baseURL)
import Vue from 'vue';
class Axios {
    constructor (props) {
        this.instance = axios.create({
            // baseURL:store.state.apiGateway?store.state.apiGateway:baseURL,  //这里使用传过来的网关
            baseURL,
            timeout: 10000,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'Content-Type, Scope-Authorization',
                'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS',
                // 'Scope-Authorization':"", //这里使用传过来的token
                // appName,
                // 'x-app-code': appName,
                ...props
            }
        })
    }
    updateProps (props) {
        this.instance.defaults.headers = {...this.instance.defaults.headers, ...props}
    }
    updateBaseURL(){
        // let url=Auth.getApiGateway();
        // if(!url){
        //    url=baseURL;
        // };
        // this.instance.defaults.baseURL=url;
    }
    post (path, params={}) {
        var self=this;
       //跟新header
        console.log(store.state);
        let token=(store.state.user.userInfo&&store.state.user.userInfo.token)?store.state.user.userInfo.token:'';
        this.updateProps({
            'Authorization':token
        });
        return new Promise((resolve, reject)=>{
            this.instance.post(path,{...params},{headers:{}})
                .then(function (response) {
                    if (response && response.data && Number(response.data.status) === 0) {
                        resolve(response.data.data);
                    } else {
                        if(response.data.status == 401){
                            Vue.prototype.$message('登录失效');
                            let loginUrl=response.data.data.loginUrl;
                            loginUrl&&(window.location=loginUrl);
                            return;
                        }
                        reject&&reject(response.data.msg||'系统错误');
                    }
                    return;
                })
                .catch(function (e) {
                    // xhq 2019/4/25  加上如果抛出 网络超时 对消息重新处理一下
                    if(((typeof e) == 'string')&&( e.indexOf('timeout') > -1)){
                        reject&&reject(e||'网络超时');
                        return;
                    };
                    reject&&reject(e||'系统错误');
                })
        });

    }

    //暂时所有的请求 都用post get请求 暂时没有处理逻辑 如果之后需要 再加
    get (path, {success, error}) {
        this.instance.get(path)
            .then(function (response) {
                if (response && response.data && (Number(response.data.status) === 0 || response.data.code === 200)) {
                    success && success(response.data.data)
                } else {
                    error && error(response.data.msg)
                }
            })
            .catch(function (e) {
                error && error(e)
            })
    }
    //这里只是用来写测试掉接口用的
    testPost (path,params, {success, error}) {
        success && success()
    }

}
let axiosIns = new Axios({})
export default axiosIns
