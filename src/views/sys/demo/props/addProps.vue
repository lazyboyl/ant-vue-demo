<template>
  <a-modal
    title="props例子"
    :visible="show"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >

  </a-modal>
</template>
<script>
  export default {
    name: "addProps",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      userId: {
        type: String
      },
      userInfo: {
        type: Object
      }
    },
    data() {
      return {
        show: this.value,
        confirmLoading: false,
        userIdNow: this.userId,
        userInfoNow: this.userInfo
      }
    },
    methods: {
      handleCancel(e) {
        // 关闭表单，将当前页面的值设置为false,接着看watch中的show的监听
        this.show = false
      },
      handleOk(e) {
        console.log('userIdNow改变了我要做点什么事情，' + this.userIdNow)
        console.log(JSON.stringify(this.userInfoNow))
        // 调用父组件的方法将userrId的值变为789
        this.$emit('changeUserId', {name: 'linzf', age: 12});
      },
      closeModal(val) {
        this.$emit('input', val);
      }
    },
    watch: {
      // 监听userId的值的变化
      userId(val) {
        // 当userId的值发生变化的时候将当前页面的userId的值也改写
        this.userIdNow = val;
        console.log('做点什么事情')
        //console.log('val---' + val)
      },
      value(val) {
        this.show = val;
      },
      show(val) {
        // 此处监听了show的值的拜变化
        if (val) {
          console.log('*--重置表单--*');
        } else {// 反之则关闭页面
          // 当show的值是false的时候，调用父页面的v-model绑定的方法input将父页面的值改为false
          this.closeModal(val);
        }
      }
    }
  }
</script>
