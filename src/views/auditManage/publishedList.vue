<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane v-for="(item,index) in tabMapOptions" :label="item" :key='index' :name="item">
        <!-- <keep-alive> -->
        <published v-if='activeName==item' ref="published" :type='2 - index'></published>
        <!-- </keep-alive> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import published from './components/published'

export default {
  name: 'publishedList',
  components: {
    published
  },
  data() {
    return {
      tabMapOptions: ['分散式', '集中式'],
      activeName: '分散式'
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