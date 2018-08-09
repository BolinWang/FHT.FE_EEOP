<template>
  <div class="app-container">
    <el-form class="house-search-form" ref="houseSearchForm" :inline="true" :model="houseSearchForm" size="small">
      <el-form-item class="house-search-form-group">
        <area-select v-model="houseSearchForm.cityArea" :level="0" placeholder="请选择城市" :filterable="true" :showAllLevels="false"></area-select>
      </el-form-item>
      <el-form-item class="house-search-form-group">
        <el-input v-model="houseSearchForm.organization" placeholder="组织名称"></el-input>
      </el-form-item>
      <el-form-item class="house-search-form-group">
        <el-input v-model="houseSearchForm.estateName" placeholder="公寓名称"></el-input>
      </el-form-item>
      <el-form-item class="house-search-form-group">
        <el-button type="primary" icon="el-icon-search" @click="searchEstateHouseList('search')">查询</el-button>
        <el-button icon="el-icon-remove-outline" @click="searchEstateHouseList('clear')">清空</el-button>
      </el-form-item>
      <el-form-item class="right house-search-form-group">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="openEstateModel(1)">新建公寓</el-button>
      </el-form-item>
    </el-form>

    <grid-unit ref="estateHouseList" :url="estateListUrl" listField="data.result" totalField="data.records" :dataMethod="method" :formOptions="houseSearchForm" :columns="colModels" :height="tableHeight">
      <template slot="operateEstate" slot-scope="scope">
        <el-button type="primary" size="mini" @click="routerToEstateRoomList(scope.row)">查看房间</el-button>
        <el-button type="primary" size="mini" @click="openEstateModel(2, scope.row)">编辑公寓</el-button>
        <el-button type="danger" size="mini" @click="deleteEstate(scope.row)">删除公寓</el-button>
      </template>
      <template slot="operateRecordStr" slot-scope="scope">
        <p>{{scope.row.lastoperator}} {{scope.row.lastOperateTime}}</p>
      </template>
    </grid-unit>

    <el-dialog :title="estateModelTitle" :visible.sync="showEstateModel" width="900px">
      <estate-model ref="estateModel" :type="estateModelTitle" :showEstateModel="showEstateModel"></estate-model>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveEstateData('save')" size="small">保 存</el-button>
        <el-button @click="showEstateModel = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { debounce } from "@/utils"
import GridUnit from "@/components/GridUnit/grid"
import areaSelect from "@/components/AreaSelect"
import estateModel from '../components/estateModel'
import { estateRoomDetailApi, estateDeleteEstateApi } from '@/api/houseManage'
export default {
  name: "estateHouseList",
  components: {
    GridUnit,
    areaSelect,
    estateModel
  },
  data() {
    return {
      estateModelTitle: '',
      showEstateModel: false,
      houseSearchForm: {
        orgName: '',
        estateName: '',
        cityArea: [],
        cityId: ''
      },
      tableHeight: 500,
      estateListUrl: "/market/fangyuan",
      method: "queryEstateList",
      colModels: [
        { prop: "orgName", label: "组织名称", align: "center" },
        { prop: "cityName", label: "城市", align: "center" },
        { prop: "estateName", label: "公寓名称", align: "center" },
        {
          prop: "operate",
          label: "操作",
          slotName: "operateEstate",
          width: "300",
          align: "center",
          fixed: 'right'
        },
        {
          prop: "operateRecord",
          label: "操作记录",
          slotName: "operateRecordStr",
          align: "center"
        }
      ],
      tableData: [
        {
          orgName: "麦家",
          cityName: "杭州",
          estateName: "漫果",
          operateRecord: new Date().getTime()
        }
      ]
    }
  },
  computed: {
    cityArea() {
      return this.houseSearchForm.cityArea
    }
  },
  methods: {
    searchParam() {
      this.$refs.estateHouseList.searchHandler()
    },
    searchEstateHouseList(type) {
      if (type === 'clear') {
        for (const key in this.houseSearchForm) {
          this.houseSearchForm[key] = key === 'cityArea' ? [] : ''
        }
      }
      this.searchParam()
    },
    routerToEstateRoomList(row) {
      this.$router.push({ path: 'estateRoomList', query: { fangyuanCode: row.fangyuanCode } })
    },
    openEstateModel(type, row) {
      if (type === 1) {
        this.estateModelTitle = '新建公寓'
        this.showEstateModel = true
      } else {
        this.estateModelTitle = '编辑公寓'
        this.$store.commit('SET_FANGYUANCODE', row.fangyuanCode)
        estateRoomDetailApi({
          fangyuanCode: row.fangyuanCode
        }).then((res) => {
          this.$store.commit('SET_ESTATEDATA', res.data.dataObject)
          this.showEstateModel = true
        })
      }
    },
    saveEstateData(type) {
      this.$refs.estateModel.saveEstateData(type)
    },
    deleteEstate(row) {
      estateDeleteEstateApi({
        fangyuanCode: row.fangyuanCode
      }).then((res) => {
        if (res.data.code === '0') {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.searchParam()
        }
      })
    }
  },
  watch: {
    cityArea(val) {
      if (val && val[1]) {
        this.houseSearchForm.cityId = val[1]
      }
    },
    showEstateModel(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.estateModel.$refs.estateModel.clearValidate()
        })
      } else {
        this.$store.commit('CLEAR_ESTATEDATA')
      }
    }
  },
  mounted() {
    let changeTableSize = debounce(() => {
      this.tableHeight = Math.max(document.body.clientHeight - 190, 250)
    }, 100)
    changeTableSize()
    window.addEventListener("resize", changeTableSize)
  }
}
</script>

<style lang="scss" scoped>
.house-search-form {
  .house-search-form-group {
    margin-bottom: 0;
    &.right {
      margin-right: 0;
    }
  }
}
</style>


