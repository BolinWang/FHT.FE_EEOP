<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane v-for="(item,index) in tabMapOptions" :label="item" :key='index' :name="item">
        <customer-table v-if='activeName==item' ref="querycenter" :customer-type="index * 1 + 1"></customer-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import customerTable from './components/customerTable'

export default {
  name: 'initCustomerList',
  directives: {
    waves
  },
  components: { customerTable },
  data() {
    return {
      tabMapOptions: ['C端租客', 'B端租客'],
      activeName: 'C端租客'
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.model-search .filter-item {
  margin-left: 10px;
}
</style>
