<template>
  <div>
    <a-button type="primary" size="small" @click="showModal">显示</a-button>
    <addProps v-model="show" :userId="userId" v-on:changeUserId="changeUserId"></addProps>
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
        userId: '123'
      }
    },
    methods:{
      changeUserId(val){
        this.userId = val;
        console.log('----------' + val)
      },
      showModal(){
        this.show = true;
      }
    }
  }
</script>
