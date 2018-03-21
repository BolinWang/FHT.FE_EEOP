<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card">
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
    return {
      tabMapOptions: ['分散式', '集中式'],
      activeName: '分散式'
    }
  },
  methods: {

  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.model-search .filter-item {
  margin-left: 10px;
}

.item-select {
  width: 150px;
}
</style>