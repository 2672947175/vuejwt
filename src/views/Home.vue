<template>
  <div class="home">
    用户名：{{nickname}}
    <div>
    
        <Spin v-if="showloading" fix>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'home',
  components: {

  },
  computed:{
    ...mapState(['nickname',"showloading"])
  }
}
</script>

<style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>