
/**
 * 使用方法 class 封装
 * 使用方法
 * AjaxRuquest.request({
 * 	url:'/djljd',
 *  method: 'post',
 *  data:{
 *      usre,
 *      pass,
 *   }
 * })
 */

/**引入的插件
 * 1.引入axios
 * 2.引入缓存函数
 * 3.store 引入 vuex 
 *  */ 
import axios from 'axios'
import util from './local';
import store from '../store'

class AjaxRuquest {
    // 构造函数
    constructor(){
        // 路径 判断是否是生成环境
        this.BaseURL = process.env.NODE_ENV === 'development'?"http://localhost:3000":"/";
        // this.BaseURL = "http://localhost:3000";
        // 请求时间
        this.timeout = 3000;
        // loading 队列
        this.queue = {};
    }
    // 合并参数 路径
    merge(options){
        // 注意 baseURL timeout 的属性名一定要以文档中定义的为主不要自己命名
        return {baseURL:this.BaseURL, timeout:this.timeout, ...options} 
    }

    /****************** 设置拦截器 ************************/
    setInterceptors(instance,url){

    /****************** 设置请求拦截器 ************************/
        // 设置请求拦截器
        instance.interceptors.request.use(config=>{
            this.queue[url]=url
            console.log(Object.keys(this.queue))
            if(Object.keys(this.queue).length){
                    store.commit('showloading')
                console.log('显示loading')
            }
        /***************** 设置token **************************/
        /**
         * 如果有token 使用 
         * config.headers.authorization =  util.getlocal('token')
         * 
         * 如果没有token 使用 
         *  config.headers.authorization = 'token'
         *  */
            config.headers.authorization =  util.getlocal('token')
            return config
        },(err)=>{
            Promise.reject(err)
        })

    /****************** 设置响应拦截器 ************************/
        instance.interceptors.response.use((res)=>{
            // 使用 delete 进行对象的属性删除
            delete this.queue[url];
            if(Object.keys(this.queue).length==0){
                // 模拟1秒后响应完成
                setTimeout(()=>{
                    store.commit('hideloading')
                },3000)
                console.log('隐藏loading')
            }
           return res.data
        },(err)=>{
            Promise.reject(err)
        })
        
    }

    /******************请求调用************************/
    request(options){
        const instance = axios.create();
        // 把传进来的参数和默认额参数合并
        let config = this.merge(options)
        // 设置拦截器
        // 
        this.setInterceptors(instance,options.url);

        return instance(config)
    }
}
export default new AjaxRuquest();

