/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:11:31
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-10-15 10:33:44
 */

<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :unique-opened="true"
      :default-active="$route.meta.parentPath || $route.path"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b">
      <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.el-menu {
  min-height: 100%;
  -moz-user-select:none;
  -webkit-user-select:none;
  user-select:none;
  border-right: 0;
}
.scrollbar-wrapper {
  overflow-x: hidden!important;
  .el-scrollbar__view {
    height: 100%;
  }
}
</style>
