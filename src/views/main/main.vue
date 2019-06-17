<template>
  <div>
    <a-layout>
      <a-layout-header>
        <div class="layout-logo">
          <img height="50px" width="50px" src="../../assets/logo.png"/>
        </div>
        <a-menu
          theme="dark"
          mode="horizontal"
          :defaultSelectedKeys="['adminCenter']"
          :style="{ lineHeight: '64px' }"
          @select="toView"
        >
          <a-menu-item key="1">
            <a-icon type="appstore"/>
            车辆管理
          </a-menu-item>
          <a-sub-menu key="2">
            <span slot="title" class="submenu-title-wrapper"><a-icon type="setting"/>系统管理</span>
            <a-menu-item-group title="基础模块">
              <a-menu-item key="dictList">字典管理</a-menu-item>
              <a-menu-item key="adminCenter">日志管理</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="权限模块">
              <a-menu-item key="setting:3">用户管理</a-menu-item>
              <a-menu-item key="setting:4">组织管理</a-menu-item>
              <a-menu-item key="setting:5">菜单管理</a-menu-item>
              <a-menu-item key="setting:6">角色管理</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
        </a-menu>
      </a-layout-header>
      <a-layout-content :style="{padding: '0 24px 24px'}">
        <a-breadcrumb :style="{margin: '24px 0'}">
          <a-breadcrumb-item href="">
            <a-icon type="home"/>
            <span>首页</span>
          </a-breadcrumb-item>
          <a-breadcrumb-item href="" v-for="item in breadCrumbList" v-bind:key="item.name"
                             v-if="item.meta && item.meta.title">
            <a-icon :type="item.icon"/>
            <span>{{showBreadcrumbItem(item)}}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '488px'}">
          <router-view/>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script>
  import {mapMutations, mapActions} from 'vuex';

  export default {
    name: 'adminCenter',
    methods: {
      ...mapMutations([
        'setBreadCrumb'
      ]),
      toView(item) {
        this.$router.push({
          name: item.key
        })
      },
      showBreadcrumbItem(item) {
        return (item.meta && item.meta.title) || item.name
      }
    },
    computed: {
      breadCrumbList() {
        console.log('----' + this.$store.state.app.breadCrumbList)
        return this.$store.state.app.breadCrumbList
      }
    },
    watch: {
      '$route'(newRoute) {
        console.log('---' + newRoute);
        this.setBreadCrumb(newRoute.matched)
      }
    }
  }
</script>
<style scoped>
  .layout-logo {
    width: 100px;
    height: 30px;
    border-radius: 10px;
    float: left;
    position: relative;
    left: 20px;
  }
</style>
