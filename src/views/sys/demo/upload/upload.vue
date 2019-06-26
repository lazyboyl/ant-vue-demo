<template>
  <div>
    <a-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture-card"
      :fileList="fileList"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 3">
        <a-icon type="plus"/>
        <div class="ant-upload-text">Upload</div>
      </div>
      <div v-else>
        <a-icon type="plus"/>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage"/>
    </a-modal>
  </div>
</template>
<script>
  export default {
    name: 'upload',
    data() {
      return {
        previewVisible: false,
        previewImage: '',
        fileList: [],
      }
    },
    methods: {
      handleCancel() {
        this.previewVisible = false
      },
      handlePreview(file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      handleChange({fileList,file}) {
        console.log('file==>' + JSON.stringify(file.response))
        this.fileList = fileList
      },
    }
  }
</script>
