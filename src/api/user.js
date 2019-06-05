import axios from '../libs/axios.js'
// 登录
export let loginApi = (usre,pass)=>{
   return axios.request({
        url:'/login',
        method: 'post',
        data:{
            usre,
            pass,
        }
    })
}
// 验证是否登录的请求
export let isloginApi =()=>{
    return axios.request({
        url:'/validata',
        method:'post',

    })
}