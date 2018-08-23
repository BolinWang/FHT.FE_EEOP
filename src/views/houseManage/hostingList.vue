<template>
  <div class="app-container">
    <!-- <div>
      <hosting-room-detail></hosting-room-detail>
    </div> -->
    <el-tabs  type="border-card">
      <el-tab-pane v-for="(item,index) in houseRentTypeList" :label="item" :key='index' :name="item">
      </el-tab-pane>
      <el-form :model="roomSearchForm" size="small" :inline="true">
        <el-form-item>
          <area-select v-model="roomSearchForm.cityArea" placeholder="请选择城市" style="width:120px" :filterable="true" :showAllLevels="false" :level="0"></area-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="roomSearchForm.houseType" size="small" placeholder="房源类型" style="width:120px">
            <el-option v-for="item in houseTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="roomSearchForm.roomStatus" size="small" placeholder="房间状态" style="width:120px">
            <el-option v-for="statusItem in roomStatusList" :key="statusItem.value" :label="statusItem.label" :value="statusItem.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="roomSearchForm.orgName" size="small" placeholder="组织名称" style="width:120px" />
          <el-input v-model="roomSearchForm.subdistrictName" size="small" placeholder="公寓/小区" style="width:120px;margin-left:10px" />
          <el-input v-model="roomSearchForm.roomCode" size="small" placeholder="房源编码" style="width:120px;margin-left:10px" />
        </el-form-item>
        <el-form-item class="house-search-form-group">
          <el-button type="primary" icon="el-icon-search" @click="searchHostingHouseList('search')">查询</el-button>
          <el-button icon="el-icon-remove-outline" @click="searchHostingHouseList('clear')">清空</el-button>
        </el-form-item>
        <div class="house-rent-type-select">
          <!-- <el-form-item class="house-search-form-group">
            <el-button type="primary">合 租</el-button>
            <el-button>整 租</el-button>
          </el-form-item> -->
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

          <GridUnit ref="hostingHouseList" :formOptions="roomSearchForm" :showSelection="true" :url="houstingListUrl" :dataMethod="method" listField="data.houseList" totalField="data.record" :columns="colModels" :height="tableHeight" fit @selection-change="handleSelectionChange">
            <template slot="operateHosting" slot-scope="scope">
              <el-row>
                <el-button type="primary" size="mini">交租方式</el-button>
                <el-button type="primary" size="mini">复制到</el-button>
                <el-button type="primary" size="mini">编辑房间</el-button>
                <el-button type="danger" size="mini">删除</el-button>
              </el-row>
            </template>
          </GridUnit>
        </div>
      </el-form>
    </el-tabs>
  </div>
</template>

<script>
import hostingRoomDetail from './components/hostingRoomDetail'
import areaSelect from "@/components/AreaSelect"
import GridUnit from "@/components/GridUnit/grid"
export default {
  name: 'hostingList',
  components: {
    hostingRoomDetail,
    areaSelect,
    GridUnit
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
      activeName:['整租'],
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
          label: '未出租',
          value: 1
        },
        {
          label: '已出租',
          value: 2
        }
      ],
      colModels: [
        { prop: "orgName", label: "组织名称" },
        { prop: "addrRegionName", label: "房源位置" },
        { prop: "roomDetailAddress", label: "公寓/小区-房间" },
        { prop: "tags", label: "房间类型" },
        { prop: "roomName", label: "房间" },
        { prop: "roomStatus", label: "房间状态" },
        { prop: "roomCode", label: "平台房源编码" },
        {          prop: "operate",
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
      this.$refs.hostingHouseList.searchHandler()
    },
    // 切换出租类型
    // handleClickTab(tab) {
    //   this.searchParam('clear')
    // },
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
      debugger
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
      } else {
        roomStatusParams = command
      }
      changeRoomStatusApi(roomStatusParams).then((res) => {
        if (res.code === '0') {
          let message = {}
          if (res.data.success === roomStatusParams.roomCodes.length) {
            message = {
              message: res.message,
              type: 'success'
            }
          } else if (res.data.fail === roomStatusParams.roomCodes.length) {
            message = {
              message: res.message,
              type: 'error'
            }
          } else {
            const status = roomStatusParams.roomStatus === 2 ? '已出租' : '未出租'
            message = {
              message: `成功${res.data.success}个房间，失败${res.data.fail}个房间，${res.data.already}个房间已经是${status}状态`,
              type: 'success'
            }
          }
          this.$message(message)
          this.searchParam()
        }
      })
    },
    // 添加合租房源
    // 添加整租房源
  }
}
</script>

<style lang="scss" scoped>
</style>

