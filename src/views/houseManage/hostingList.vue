<template>
  <div class="app-container">
    <!-- <div>
      <hosting-room-detail></hosting-room-detail>
    </div> -->
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClickTab">
      <el-tab-pane v-for="(item, index) in houseRentTypeList" :key="index" :label="item" :name="item">
      </el-tab-pane>
      <el-form :model="roomSearchForm" size="small" :inline="true">
        <el-form-item>
          <area-select v-model="roomSearchForm.cityArea" placeholder="请选择城市" style="width:120px" :filterable="true" :showAllLevels="false" :level="0"></area-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="roomSearchForm.houseType" filterable clearable size="small" placeholder="房源类型" style="width:120px">
            <el-option v-for="item in houseTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="roomSearchForm.roomStatus" filterable clearable size="small" placeholder="房间状态" style="width:120px">
            <el-option v-for="statusItem in roomStatusList" :key="statusItem.value" :label="statusItem.label" :value="statusItem.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="roomSearchForm.orgName" size="small" placeholder="组织名称" style="width:120px" />
          <el-input v-model="roomSearchForm.subdistrictName" size="small" placeholder="公寓/小区" style="width:120px;margin-left:10px" />
          <el-input v-model="roomSearchForm.roomCode" size="small" placeholder="房源编码" style="width:120px;margin-left:10px" />
        </el-form-item>
        <el-form-item class="house-search-form-group">
          <el-button type="primary" icon="el-icon-search" @click="searchHostingHouseList('search')" class="filter-item">查询</el-button>
          <el-button icon="el-icon-remove-outline" @click="searchHostingHouseList('clear')">清空</el-button>
        </el-form-item>
        <el-form-item>
          <el-dropdown class="room-options-dropdown" @command="handleCommand">
            <el-button plain size="small" style="width:120px">批量房态管理</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="1">未出租</el-dropdown-item>
              <el-dropdown-item :command="2">已出租</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button style="width:120px;margin-left:10px">添加合租房源</el-button>
          <el-button style="width:120px">添加整租房源</el-button>
        </el-form-item>
      </el-form>
      <GridUnit ref="hostingHouseList" :showRowIndex="false" :spanMethod="objectSpanMethod" :formOptions="roomSearchForm" :showSelection="true" :url="houstingListUrl" :dataMethod="method" listField="data.houseList" totalField="data.record" :columns="colModels" :height="tableHeight" @selection-change="handleSelectionChange" :dataHandler="dataHandler" :pageSizes="[50, 100, 200]" border>
        <template slot="index" slot-scope="scope">
          {{scope.row.index + 1}}
        </template>
        <template slot="roomStatus" slot-scope="scope">
          <el-tag :type="[2].includes(scope.row.roomStatus) ? 'success' : ([5, 6, 8, 10].includes(scope.row.roomStatus) ? 'info' : 'danger')">{{scope.row.roomStatus | setRoomStatus(roomStatusList)}}</el-tag>
        </template>
        <template slot="operateHosting" slot-scope="scope">
          <el-row>
            <el-button type="primary" size="mini">交租方式</el-button>
            <el-button type="primary" size="mini">复制到</el-button>
            <el-button type="primary" size="mini">编辑房间</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </el-row>
        </template>
      </GridUnit>
    </el-tabs>
  </div>
</template>

<script>
import { debounce } from "@/utils"
import hostingRoomDetail from './components/hostingRoomDetail'
import areaSelect from "@/components/AreaSelect"
import GridUnit from "@/components/GridUnit/grid"
import { hostingHouseListApi, hostingAddressByKeywordsApi } from '@/api/houseManage'
export default {
  name: 'hostingList',
  components: {
    hostingRoomDetail,
    areaSelect,
    GridUnit
  },
  filters: {
    renderStatusType(status) {
      const statusMap = {
        '已发布': 'success',
        '发布中': 'primary',
        '发布失败': 'danger',
        '下架中': 'warning',
        '未发布': 'info'
      }
      return statusMap[status] || 'info'
    },
    renderStatusValue(status) {
      return status || '未知'
    },
    setRoomStatus(val, statusList) {  
      let status = statusList.filter(item => item.value === val)
      return status.length ? status[0].label : ''
    }
  },
  data() {
    return {
      roomSearchForm: {
        cityId: '',
        cityArea: [],
        houseType: '',
        roomStatus: '',
        orgName: '',
        subdistrictName: '',
        roomCode: '',
        houseRentType: 1
      },
      houseRentTypeList: ['整租', '合租'],
      activeName: '整租',
      tableHeight: 400,
      houstingListUrl: "http://localhost:9528/api/market/fangyuan",
      method: "queryHostingHouseList",
      selectedRooms: [],
      houseTypeList: [
        { label: '普通', value: 1 },
        { label: '金融', value: 2 },
        { label: '飞虎队', value: 3 }
      ],
      roomStatusList: [
        {
          label: '可用',
          value: 2
        },
        {
          label: '在住',
          value: 4
        },
        {
          label: '维修',
          value: 5
        },
        {
          label: '空脏',
          value: 6
        },
        {
          label: '已出租（无租客）',
          value: 9
        },
        {
          label: '装修中',
          value: 10
        }
      ],
      colModels: [
        { label: '#', slotName: "index", fixed: 'left' },
        { prop: "orgName", label: "组织名称" },
        { prop: "addrRegionName", label: "房源位置" },
        { prop: "roomDetailAddress", label: "公寓/小区-房间" },
        { prop: "tags", label: "房间类型" },
        { prop: "roomName", label: "房间" },
        {
          prop: "roomStatus",
          label: "房间状态",
          slotName: "roomStatus",
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                '已出租': 'success',
                '未出租': 'info'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              return status || '未知'
            }
          }
        },
        { prop: "roomCode", label: "平台房源编码" },
        {
          prop: "operate",
          label: "设置",
          slotName: "operateHosting",
          width: "340",
          fixed: 'right'        },
        { prop: "provider", label: "房源提供者" },
        { prop: "operateTime", label: "操作时间" },
      ]
    }
  },
  watch: {
    roomSearchForm: {
      handler: function (val) {
        if (roomSearchForm.cityArea && roomSearchForm.cityArea[1]) {
          this.roomSearchForm.cityId = roomSearchForm.cityArea[1]
        }
        else {
          this.roomSearchForm.cityId = ''
        }
      }
    }
  },
  methods: {
    searchParam() {
      this.roomSearchForm.houseRentType = this.activeName === '整租' ? 1 : 2
      // 解决watch执行顺序
      this.$nextTick(() => {
        this.$refs.hostingHouseList.searchHandler()
      })
    },
    handleClickTab(tab) {
      this.searchParam('clear')
    },
    // 查询/清空
    searchHostingHouseList(type) {
      if (type == "clear") {
        for (const key in this.roomSearchForm) {
          this.roomSearchForm[key] = key === 'cityArea' ? [] : ''
        }
      }
      this.searchParam()
    },
    handleSelectionChange(list) {
      this.selectedRooms = list
    },
    // 批量房态管理
    handleCommand(command) {
      let roomStatusParams = {}
      if (typeof command === 'number') {
        if (!this.selectedRooms.length) {
          this.$message.error('请选择需要设置房态的房间')
          return
        }
        roomStatusParams = {
          roomCodes: this.selectedRooms.map(item => item.roomCode),
          roomStatus: command
        }
      }
      else {
        roomStatusParams = command
      }
      this.searchParam()
      // changeRoomStatusApi(roomStatusParams).then((res) => {
      //   if (res.code === '0') {
      //     let message = {}
      //     if (res.data.success === roomStatusParams.roomCodes.length) {
      //       message = {
      //         message: res.message,
      //         type: 'success'
      //       }
      //     } else if (res.data.fail === roomStatusParams.roomCodes.length) {
      //       message = {
      //         message: res.message,
      //         type: 'error'
      //       }
      //     } else {
      //       const status = roomStatusParams.roomStatus === 2 ? '已出租' : '未出租'
      //       message = {
      //         message: `成功${res.data.success}个房间，失败${res.data.fail}个房间，${res.data.already}个房间已经是${status}状态`,
      //         type: 'success'
      //       }
      //     }
      //     this.$message(message)
      //     this.searchParam()
      //   }
      // })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.roomSearchForm.houseRentType === 2) {
        if (columnIndex <= 5 && columnIndex > 0) {
          if (row.spanArr < 1) {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
          else {
            return {
              rowspan: row.spanArr,
              colspan: 1
            }
          }
        }
      }
    },
    dataHandler(data) {
      let tempArr = []
      data.forEach((item, index) => {
        item.roomList.forEach((v, i) => {
          let row = {
            ...item,
            ...v
          }
          if (i === 0) {
            row.spanArr = item.roomList.length
            row.index = index
          }
          tempArr.push(row)
        })
      })
      return tempArr
    }
    // 添加合租房源
    // 添加整租房源
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
</style>

