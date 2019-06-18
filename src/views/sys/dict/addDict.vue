<template>
  <a-modal
    title="新增字典"
    :visible="show"
    @ok="handleOk"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-form
      :form="dictForm"
      layout="horizontal"
      @submit="handleSubmit"
    >
      <a-form-item
        label="字典类型"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
                        'dictType',
                        {
                         rules: [
                           { required: true, message: '请输入字典类型!', whitespace: true}
                         ]
                        }
                    ]"
          placeholder="请输入字典类型"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        label="字典编码"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
                        'dictCode',
                        {
                         rules: [
                           { required: true, message: '请输入字典编码!', whitespace: true}
                         ]
                        }
                    ]"
          placeholder="请输入字典编码"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        label="字典描述"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
                        'dictText',
                        {
                         rules: [
                           { required: true, message: '请输入字典描述!', whitespace: true}
                         ]
                        }
                    ]"
          placeholder="请输入字典描述"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        label="字典数值"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input
          v-decorator="[
                        'dictValue',
                        {
                         rules: [
                           { required: true, message: '请输入字典数值!', whitespace: true}
                         ]
                        }
                    ]"
          placeholder="请输入字典数值"
        >
        </a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import {addDict, checkTypeAndCode} from '../../../api/sys/dict/dict.api'

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
        this.confirmLoading = true;
        e.preventDefault()
        this.dictForm.validateFields((err, values) => {
          if (!err) {
            addDict(this.dictForm.getFieldsValue()).then(res => {
              if (res.code == 200) {
                this.$message.success('增加数据字典成功');
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
                // 同时调用父页面的刷新页面的方法
                this.$emit('handleSearch');
              } else {
                this.$message.error('增加数据字典失败，失败原因：' + res.msg);
              }
            })
          }
          this.confirmLoading = false;
        })
      },
      handleOk(e) {
        // 点击确定按钮的时候触发提交事件
        this.handleSubmit(e);
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
