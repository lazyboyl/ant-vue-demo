<template>
  <a-modal
    title="Title"
    :visible="show"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-form
      :form="dictForm"
      @submit="handleSubmit"
    >
    </a-form>
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
    beforeCreate() {
      this.dictForm = this.$form.createForm(this);
    },
    data() {
      return {
        show: this.value,
        confirmLoading: false,
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault()
        this.dictForm.validateFields((err, values) => {
          if (!err) {

          }
        })
      },
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
          this.dictForm.resetFields();
        } else {// 反之则关闭页面
          this.closeModal(val);
        }
      }
    }
  }
</script>
