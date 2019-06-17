<template>
  <div>
    <a-card title="数据字典维护">
      <div>
        <div style="display:inline-block;float:left;">
          <a-button type="primary" @click="addDict" >新增字典</a-button>
        </div>
        <div style="display:inline-block;float:right;">
          <a-input  v-model="search" placeholder="请输入相应的查询条件" style="width: auto" />
          <a-button type="primary" @click="handleSearch">查询</a-button>
        </div>
      </div>
      <div style="clear: both;"></div>
      <div style="margin-top: 10px;">
        <a-table
          :rowKey="record => record.id"
          :columns="columns"
          :dataSource="dictData"
          :pagination="pagination"
          :loading="loading"
          @change="showSizeChange"
        >
          <span slot="action" slot-scope="text, record">
              <a-button type="primary" size="small">修改</a-button>
              <a-button type="danger" size="small">删除</a-button>
          </span>
        </a-table>
      </div>
    </a-card>
    <addDict v-model="addShow" v-on:handleSearch="handleSearch"></addDict>
  </div>
</template>
<script>
  import {queryDictList} from '../../../api/sys/dict/dict.api'
  import addDict from './addDict'

  export default {
    name: 'dictList',
    components: {
      addDict
    },
    data() {
      return {
        search: '',
        key: 'dictType',
        order: 'desc',
        dictData: [],
        pagination: {
          total: 0,
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '50', '100'],
          showQuickJumper: true,
          showSizeChanger: true
        },
        loading: false,
        addShow: false,
        columns: [
          {
            title: '字典类型',
            dataIndex: 'dictType',
            sorter: true
          },
          {
            title: '字典编码',
            dataIndex: 'dictCode',
            sorter: true
          },
          {
            title: '字典编码',
            dataIndex: 'dictText',
            sorter: true
          },
          {
            title: '字典数值',
            dataIndex: 'dictValue',
            sorter: true
          },
          {
            title: '操作',
            scopedSlots: {customRender: 'action'},
          }
        ]
      }
    },
    methods: {
      addDict() {
        this.addShow = true
      },
      showSizeChange(pagination, filters, sorter){
        this.pagination.pageSize = pagination.pageSize;
        this.pagination.current = pagination.current;
        if(sorter.order){
          this.key = sorter.column.dataIndex;
          if (sorter.order == 'descend') {
            this.order = 'desc';
          } else {
            this.order = 'asc';
          }
        }else{
          this.key = 'dictType';
          this.order = 'desc';
        }
        this.handleSearch();
      },
      handleSearch() {
        let current = this.pagination.current
        let pageSize = this.pagination.pageSize
        let search = this.search
        let orderKey = this.key
        let orderByValue = this.order
        let dictCode = ''
        const _this = this;
        queryDictList({
          current,
          pageSize,
          search,
          orderKey,
          orderByValue,
          dictCode
        }).then(res => {
          if (res.code == 200) {
            _this.pagination.total = res.obj.total
            _this.dictData = res.obj.rows
          }
        })
      }
    }
  }
</script>
