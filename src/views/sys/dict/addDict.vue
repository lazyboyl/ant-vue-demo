<template>
  <a-modal
    title="Title"
    :visible="show"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <p>数据字典</p>
  </a-modal>
</template>
<script>
  export default {
    name: "addDict",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        show: this.value,
        confirmLoading: false,
      }
    },
    methods: {
      handleOk(e) {
        this.confirmLoading = true;
        setTimeout(() => {
          this.show = false;
          this.confirmLoading = false;
          this.$emit('handleSearch');
        }, 2000);
      },
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.show = false
      },
      closeModal(val) {
        this.$emit('input', val);
      }
    },
    watch: {
      value(val) {
        console.log('val'+val)
        this.show = val;
      },
      show(val) {
        //当重新显示增加数据的时候重置整个form表单
        if (val) {

        } else {// 反之则关闭页面
          this.closeModal(val);
        }
      }
    }
  }
</script>
