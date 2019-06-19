<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-table
          :rowKey="record => record.id"
          :columns="leftColumns"
          :dataSource="leftData"
          :pagination="leftPagination"
          :loading="leftLoading"
        >
          <template slot="action" slot-scope="text, record, index">
            <a-icon type="right" @click="joinRight(index)"/>
          </template>
        </a-table>
      </a-col>
      <a-col :span="12">
        <a-table
          :rowKey="record => record.id"
          :columns="rightColumns"
          :dataSource="rightData"
          :pagination="rightPagination"
          :loading="rightLoading"
        >
          <template slot="action" slot-scope="text, record, index">
            <a-icon type="left" @click="rightJoin(index)"/>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  export default {
    name: 'shuttle',
    methods: {
      joinRight(index) {
        // 需要加入右边的数据
        let leftJoinToRightData = this.leftData[index];
        this.rightData.push(leftJoinToRightData)
        this.leftData.splice(index,index+1)
        console.log('-----joinRight------' + index)
      },
      rightJoin(index){
        // 需要加入左边的数据
        let rightJoinLeftData = this.rightData[index];
        this.leftData.push(rightJoinLeftData)
        this.rightData.splice(index,index+1)
        console.log('-----rightJoin------' + index)
      }
    },
    data() {
      return {
        leftLoading: false,
        leftPagination: {
          // 是否隐藏底部的分页框
          hideOnSinglePage: true
        },
        leftColumns: [
          {
            title: '姓名',
            dataIndex: 'userName'
          },
          {
            title: '操作',
            scopedSlots: {customRender: 'action'}
          }
        ],
        leftData: [
          {
            id: '1',
            userName: 'test1'
          },
          {
            id: '2',
            userName: 'test2'
          },
          {
            id: '3',
            userName: 'test3'
          }
        ],
        rightLoading: false,
        rightPagination: {
          hideOnSinglePage: true
        },
        rightColumns: [
          {
            title: '操作',
            scopedSlots: {customRender: 'action'}
          },
          {
            title: '姓名',
            dataIndex: 'userName'
          }
        ],
        rightData: []
      }
    }
  }
</script>
