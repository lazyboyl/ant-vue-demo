<template>
  <div>
    <a-select style="width: 120px" :value="selectValue">
      <a-select-option value="jack111">Jack</a-select-option>
      <a-select-option value="lucy111">Lucy</a-select-option>
    </a-select>
    <a-button type="primary" @click="change">改变</a-button>
  </div>
</template>
<script>
  export default {
    name: 'upload',
    data() {
      return {
        selectValue:'lucy111'
      }
    },
    methods:{
      change(){
        this.selectValue = 'jack111';
      }
    }
  }
</script>
