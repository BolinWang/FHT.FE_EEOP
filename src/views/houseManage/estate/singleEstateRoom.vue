<template>
  <div class="app-container">
    <el-row class="room-options-row">
      <el-button type="primary" size="small" @click="$router.push({name: '集中式房源'})">返回</el-button>
      <el-button type="primary" size="small">新建房号</el-button>
      <el-button type="danger" size="small">删除房号</el-button>
    </el-row>
    <el-form class="room-search-form" ref="form" :inline="true" :model="roomSearchForm" size="small">
      <el-form-item class="room-search-form-group">
        <el-select v-model="roomSearchForm.floor" placeholder="楼层">
          <el-option
            v-for="item in floorList"
            :key="item.floorId"
            :label="item.floorName"
            :value="item.floorId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="room-search-form-group">
        <el-select v-model="roomSearchForm.roomStatus" placeholder="房间状态">
          <el-option label="已出租" value="1"></el-option>
          <el-option label="未出租" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="room-search-form-group">
        <el-input placeholder="房源编码" v-model="roomSearchForm.roomCode"></el-input>
      </el-form-item>
      <el-form-item class="room-search-form-group">
        <el-input placeholder="房号" v-model="roomSearchForm.roomNo"></el-input>
      </el-form-item>
      <el-form-item class="room-search-form-group">
        <el-button type="primary">查询</el-button>
        <el-button>清空</el-button>
      </el-form-item>
    </el-form>

    <grid-unit
      ref="estateRoomList"
      :url="estateRoomListUrl"
      listField="data.list"
      totalField="data.record"
      :dataMethod="reqMethod"
      :formOptions="roomSearchForm"
      :showSelection="true"
      :columns="colModels"
      :height="tableHeight">
      <template slot="settingRoom" slot-scope="scope">
        <el-button size="mini">交租方式</el-button>
        <el-button size="mini">复制到</el-button>
      </template>
      <template slot="operateRoom" slot-scope="scope">
        <el-button type="primary" size="mini">编辑房间</el-button>
      </template>
    </grid-unit>
  </div>
</template>

<script>
import GridUnit from "@/components/GridUnit/grid"
import { estateRoomFloorApi } from "@/api/houseManage"
export default {
  name: 'singleEstateRoom',
  components: {
    GridUnit
  },
  data() {
    return {
      fangyuanCode: '',
      floorList: [],
      roomSearchForm: {
        roomStatus: '',
        floor: '',
        roomCode: '',
        roomNo: ''
      },
      estateRoomListUrl: "http://localhost:9528/api/market/fangyuan",
      tableHeight: 500,
      reqMethod: 'queryEstateRoomList',
      colModels: [
        { prop: "orgName", label: "房间类型", align: "center" },
        { prop: "floorName", label: "楼层", align: "center" },
        { prop: "roomNo", label: "房号", align: "center" },
        {
          prop: "roomDirection",
          label: "朝向",
          align: "center",
          render(row) {
            let directionList = ['', '朝南', '朝北', '朝东', '朝西', '东南', '西南', '东北', '西北']
            return directionList[row.roomDirection]
          }
        },
        {
          prop: "roomStatus",
          label: "房间状态",
          align: "center",
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                '1': 'success',
                '2': 'info'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              const statusStrData = ['已出租', '未出租']
              return statusStrData[status - 1] || '待上线'
            }
          }
        },
        { prop: "roomCode", label: "平台房源编码", align: "center" },
        {
          prop: "roomLayout",
          label: "室卫厅",
          align: "center",
          render(row) {
            return row.chamberCount + row.boardCount + row.toiletCount
          }
        },
        { prop: "roomArea", label: "面积", align: "center" },
        {
          prop: "decorationDegree",
          label: "装修程度",
          align: "center",
          render(row) {
            let decorationDegreeList = ['', '毛坯', '简装', '精装修', '豪华装']
            return decorationDegreeList[row.decorationDegree]
          }
        },
        { prop: "bedCount", label: "床数", align: "center" },
        { prop: "maxPerson", label: "最大入住人数", align: "center" },
        {
          prop: "settings",
          label: "设置",
          width: '182px',
          align: "center",
          slotName: "settingRoom"
        },
        {
          prop: "operate",
          label: "操作",
          align: "center",
          slotName: "operateRoom"
        },
        {
          prop: "operateRecord",
          label: "操作记录",
          align: "center",
          render(row) {
            return row.lastoperator + ' ' + row.lastOperateTime
          }
        }
      ]
    }
  },
  methods: {
    setFloorList() {
      estateRoomFloorApi({
        fangyuanCode: this.fangyuanCode
      }).then((res) => {
        if (res.code === '0') {
          this.floorList = res.data.list
        }
      })
    }
  },
  mounted() {
    this.fangyuanCode = this.$route.query.fangyuanCode || ''
    this.setFloorList()
  }
}
</script>

<style lang="scss" scoped>
.room-options-row {
  margin-bottom: 20px;
}
.room-search-form {
  .room-search-form-group {
    margin-bottom: 10px;
    &.right {
      margin-right: 0;
    }
  }
}
</style>


