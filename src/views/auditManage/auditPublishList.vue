<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="(item,index) in tabMapOptions" :label="item" :key='index' :name="item">
        <!-- <keep-alive> -->
        <audit-publish v-if='activeName==item' ref="auditPublish" :type='2 - index'></audit-publish>
        <!-- </keep-alive> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import auditPublish from './components/auditPublish'

export default {
  name: 'auditPublishList',
  components: {
    auditPublish
  },
  data() {
    const routerType = this.$route.query.type || 0
    const tabMapOptions = ['分散式', '集中式']
    return {
      tabMapOptions,
      activeName: tabMapOptions[routerType]
    }
  },
  methods: {

  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.model-search .filter-item {
  margin-left: 10px;
}

.item-select {
  width: 150px;
}
</style>
