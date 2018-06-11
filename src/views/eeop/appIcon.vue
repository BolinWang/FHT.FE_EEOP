<template>
  <div class="app-container">
    <GridUnit
      ref="refGridUnit"
      :columns="colModels"
      :showPagination="true"
      :url="url"
      :dataMethod="method"
      :height="tableHeight">
      <template slot="handle" slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="small"
          @click="showDetail(scope.row)">
          编辑
        </el-button>
      </template>
    </GridUnit>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import GridUnit from '@/components/GridUnit/grid'

export default {
  name: 'auditFhd',
  directives: {
    waves
  },
  components: {
    GridUnit
  },
  data() {
    return {
      searchParams: {},
      colModels: [
        { prop: 'title', label: '标题', minWidth: 300 },
        { prop: 'electronicSealUrl', label: '图片', width: 200, type: 'img' },
        { label: '操作', slotName: 'handle', width: 100 }
      ],
      tableHeight: 300,
      url: '/market/audit/',
      method: 'list',
      layer_showInfo: false,
      layer_sign: false,
      layer_card: false
    }
  },
  mounted() {
    /* 表格高度控制 */
   this.$nextTick(() => {
      const offsetTop = this.$refs.refGridUnit.$el.offsetTop || 140
      const pagenationH = 64
      const containerPadding = 20
      let temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
      this.tableHeight = temp_height > 300 ? temp_height : 300
      window.onresize = () => {
        return (() => {
          temp_height = document.body.clientHeight - offsetTop - pagenationH - containerPadding
          this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300
        })()
      }
    })
  },
  computed: {
    tableStyle: function() {
      return {
        width: '100%',
        height: this.tableHeight + 'px'
      }
    }
  },
  methods: {
    searchParam() {
      this.$refs.refGridUnit.searchHandler()
    },
    showDetail(row) {

    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
