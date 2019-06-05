<template>
  <div class="about">
     <Input v-model="user" placeholder="Enter something..." style="width: 300px" />
     <Input v-model="pass" placeholder="Enter something..." type="password" style="width: 300px" />
     <br>
     <Button type="success" @click="login">登录</Button>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
    export default {
        data () {
            return {
                user: 'ss',
                pass:'aa'
            }
        },
        methods:{
          ...mapActions(['tologin']),
          login(){
            this.tologin({user:this.user,pass:this.pass})
          }
        }
        
    }
</script>