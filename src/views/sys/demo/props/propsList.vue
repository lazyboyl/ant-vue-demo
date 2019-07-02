<template>
  <div>
    <a-button type="primary" size="small" @click="showModal">显示</a-button>
    <addProps v-model="show" :userId="userId"  :userInfo="userInfo" v-on:changeUserId="changeMyUserId"></addProps>
  </div>
</template>
<script>
  import addProps from './addProps'
  export default {
    name: 'propsList',
    components:{
      addProps
    },
    data() {
      return {
        show: false,
        userId: '123',
        userInfo: {
          name:'121',
          mama:'212315'
        }
      }
    },
    methods:{
      changeMyUserId(val){
        this.userId = val.name
        console.log('----------' + JSON.stringify(val))
      },
      showModal(){
        this.show = true;
      }
    }
  }
</script>
