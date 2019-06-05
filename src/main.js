import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//全局前置守卫 导航触发时候调用 如果使用了这个钩子函数必须调用next方法函数才会往下执行 to到哪里去 from从那里来
// 
router.beforeEach(async (to,from,next)=>{
 let islogin =  await store.dispatch('valilogin')
 console.log(islogin)
 if(islogin){// 已经登录了
    if(to.name=='about'){
      // 并且是登录页，就结束
      next('/')
    }else{
      next()
    }
 }else{
   next()
 }
 
  
})