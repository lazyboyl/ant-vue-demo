<template>
  <div>
    <a-form
      :form="selectForm"
      layout="horizontal"
      @submit="handleSubmit"
    >
      <a-form-item
        label="下拉的值"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-select style="width: 120px" v-decorator="[
                        'selectValue'
                    ]">
          <a-select-option value="jack111">Jack</a-select-option>
          <a-select-option value="lucy111">Lucy</a-select-option>
        </a-select>
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

      <a-button type="primary" @click="change">改变</a-button>
    </a-form>
  </div>
</template>
<script>
  export default {
    name: 'upload',
    beforeCreate() {
      this.selectForm = this.$form.createForm(this);
    },
    data() {
      return {}
    },
    methods: {
      change() {
        this.selectForm.setFieldsValue({selectValue: 'lucy111',dictCode:'123123'})
      },
      handleSubmit(e) {

      }
    }
  }
</script>
