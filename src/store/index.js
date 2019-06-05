import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {loginApi,isloginApi} from '../api/user'
import util from '../libs/local'
export default new Vuex.Store({
  state: {
    nickname: '',
    showloading:false,
  },
  mutations: {
    setnickname(state,payload){
      state.nickname = payload
    },
    showloading(state){
      state.showloading=true
    },
    hideloading(state){
      state.showloading=false
    }
  },
  actions: {
    // 登录的token
    async  tologin({commit},{user,pass}){ // axtions 提交登录
      let {token,nickname} =  await loginApi(user,pass)
      util.setlocal('token',token)
      commit('setnickname',nickname)
    },
    // 验证是否登录的请求
    async valilogin({commit}){
      // let res= await isloginApi()
     let {nickname,token} = await isloginApi()
    //  console.log(res,'触发')
    
     commit('setnickname',nickname)
     util.setlocal('token',token);
     return nickname!==undefined;

    }
    
  }
})
