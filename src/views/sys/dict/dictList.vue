<template>
  <div>
    <a-card title="数据字典维护">
      <div>
        <div style="display:inline-block;float:left;">
          <a-button type="primary" @click="addDict">新增字典</a-button>
        </div>
        <div style="display:inline-block;float:right;">
          <a-input v-model="search" placeholder="请输入相应的查询条件" style="width: auto"/>
          <a-popover
            trigger="click"
            v-model="visible"
            placement="bottom"
          >
            <a-icon type="ellipsis"/>
            <div slot="content">
              <div style="display: block;">
                <a-input v-model="dictCode" placeholder="请输入需要查询的字典编码" style="width: auto"/>
              </div>
              <div style="margin-top: 10px;text-align:center;">
                <a-button type="primary" @click="handleSearch">查询</a-button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a-button type="primary" @click="clearQueryDictForm">清空</a-button>
              </div>
            </div>
          </a-popover>
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
          <template slot-scope="text, record, index" slot="dictCode">
            <a-input
              v-if="editIndex === index"
              style="margin: -5px 0"
              v-model="editDictCode"
            />
            <span v-else>{{ text }}</span>
          </template>
          <template slot-scope="text, record, index" slot="dictText">
            <a-input
              v-if="editIndex === index"
              style="margin: -5px 0"
              v-model="editDictText"
            />
            <span v-else>{{ text }}</span>
          </template>
          <template slot-scope="text, record, index" slot="dictValue">
            <a-input
              v-if="editIndex === index"
              style="margin: -5px 0"
              v-model="editDictValue"
            />
            <span v-else>{{ text }}</span>
          </template>
          <template slot="action" slot-scope="text, record, index">
            <span v-if="editIndex === index">
              <a-button type="primary" size="small" @click="handleUpdate(index)">保存</a-button>
              <a-button type="primary" size="small" @click="editIndex = -1">取消</a-button>
            </span>
            <span v-else>
              <a-button type="primary" size="small" @click="handleEdit(record,index)">修改</a-button>
              <a-button type="danger" size="small" @click="handleDelete(record)">删除</a-button>
            </span>
          </template>
        </a-table>
      </div>
    </a-card>
    <addDict v-model="addShow" v-on:handleSearch="handleSearch"></addDict>
  </div>
</template>
<script>
  import {queryDictList, deleteDict , updateDict} from '../../../api/sys/dict/dict.api'
  import addDict from './addDict'

  export default {
    name: 'dictList',
    components: {
      addDict
    },
    data() {
      return {
        search: '',
        dictCode: '',
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
        visible: false,
        editIndex: -1,
        editId: '',
        editDictCode: '',
        editDictText: '',
        editDictValue: '',
        columns: [
          {
            title: '字典类型',
            dataIndex: 'dictType',
            sorter: true
          },
          {
            title: '字典编码',
            dataIndex: 'dictCode',
            sorter: true,
            scopedSlots: {customRender: 'dictCode'}
          },
          {
            title: '字典编码',
            dataIndex: 'dictText',
            sorter: true,
            scopedSlots: {customRender: 'dictText'}
          },
          {
            title: '字典数值',
            dataIndex: 'dictValue',
            sorter: true,
            scopedSlots: {customRender: 'dictValue'}
          },
          {
            title: '操作',
            scopedSlots: {customRender: 'action'}
          }
        ]
      }
    },
    methods: {
      clearQueryDictForm() {
        this.dictCode = '';
      },
      addDict() {
        this.addShow = true
      },
      showSizeChange(pagination, filters, sorter) {
        this.pagination.pageSize = pagination.pageSize;
        this.pagination.current = pagination.current;
        if (sorter.order) {
          this.key = sorter.column.dataIndex;
          if (sorter.order == 'descend') {
            this.order = 'desc';
          } else {
            this.order = 'asc';
          }
        } else {
          this.key = 'dictType';
          this.order = 'desc';
        }
        this.handleSearch();
      },
      handleUpdate(index) {
        updateDict({
          id: this.editId,
          dictValue: this.editDictValue,
          dictText: this.editDictText,
          dictCode: this.editDictCode
        }).then(res => {
          if (res.code == 200) {
            this.$message.success('修改字典数据成功！')
            this.editIndex = -1
            this.handleSearch()
          } else {
            this.$message.error('修改字典数据失败，失败原因：' + res.msg)
          }
        });
      },
      handleEdit(record, index) {
        this.editIndex = index
        this.editId = record.id
        this.editDictCode = record.dictCode
        this.editDictText = record.dictText
        this.editDictValue = record.dictValue
      },
      handleDelete(record) {
        this.$confirm({
          title: '删除字典数据',
          content: '是否删除字典数据',
          onOk: () => {
            deleteDict({id: record.id}).then(res => {
              if (res.code == 200) {
                this.$message.success('删除数据字典成功');
                // 删除数据成功同时刷新grid
                this.handleSearch();
              } else {
                this.$message.warning('删除数据字典失败，失败原因：' + res.msg);
              }
            });
          }
        })
      },
      handleSearch() {
        let current = this.pagination.current
        let pageSize = this.pagination.pageSize
        let search = this.search
        let orderKey = this.key
        let orderByValue = this.order
        let dictCode = this.dictCode
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
    },
    mounted() {
      // 初始化完成组件的时候执行以下的逻辑
      this.handleSearch();
    }
  }
</script>
