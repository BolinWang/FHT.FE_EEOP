<template>
  <div class="app-container">
    <el-row class="room-options-row">
      <el-button type="primary" size="small" @click="$router.push({name: '集中式房源'})" icon="el-icon-arrow-left">返回</el-button>
      <el-button type="primary" size="small">新建房号</el-button>
      <el-button type="danger" size="small">删除房号</el-button>
      <span class="estate-title">{{estateInfo.estateName}}</span>
      <span class="estate-address">{{estateInfo.subdistrictName + ' - ' + estateInfo.subdistrictAddress}}</span>
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
        <el-button size="mini" @click="openRentPayModel(scope.row)">交租方式</el-button>
        <el-button size="mini" @click="openCopyItemToModel(scope.row)">复制到</el-button>
      </template>
      <template slot="operateRoom" slot-scope="scope">
        <el-button type="primary" size="mini">编辑房间</el-button>
      </template>
    </grid-unit>

    <el-dialog class="copy-item-to-model" title="复制到" :visible.sync="copyItemToModelVisible" width="700px">
      <room-list-selecter ref="copyItemTo" :roomList="copyItemRoomList" :visible="copyItemToModelVisible">
        <el-card class="head-card">
          <div slot="header" class="clearfix">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">选择复制您要的内容，再选择您要编辑的房间，<br/>这样可以方便您快速批量编辑同类房源</div>
              <span class="head-card-title">复制项目<i class="el-icon-warning"></i></span>
            </el-tooltip>
            <div class="check-all">
              <el-form :inline="true" size="mini">
                <el-form-item :label="checkAllCopyItem ? '取消全选' : '全选'">
                  <el-switch v-model="checkAllCopyItem" @change="handleCheckAllChange"></el-switch>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <el-checkbox-group v-model="checkedCopyList">
            <el-checkbox
              class="head-check-options"
              v-for="v in copyOptions"
              :key="v.val"
              :label="v.val"
              @change="handleOptionsChange">
              {{v.label}}
            </el-checkbox>
          </el-checkbox-group>
        </el-card>
        <span slot="card-title">请选择要复制到的房间号</span>
      </room-list-selecter>
      <span slot="footer">
        <el-button size="small" type="primary" @click="saveCopyItemTo">确 定</el-button>
        <el-button size="small" @click="copyItemToModelVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog class="rent-pay-model" title="交租方式" :visible.sync="rentPayModelVisible" width="700px">

    </el-dialog>
  </div>
</template>

<script>
import GridUnit from "@/components/GridUnit/grid"
import { estateRoomFloorApi, estateRoomDetailApi, estateBatchCopyRoomListApi, copyToOtherRoomApi, estateRoomRentPayWayApi } from "@/api/houseManage"
import RoomListSelecter from '@/components/RoomListSelecter'
export default {
  name: 'singleEstateRoom',
  components: {
    GridUnit,
    RoomListSelecter
  },
  data() {
    return {
      fangyuanCode: '',
      curRoomCode: '',
      estateInfo: {},
      floorList: [],
      roomSearchForm: {
        roomStatus: '',
        floor: '',
        roomCode: '',
        roomNo: ''
      },
      estateRoomListUrl: "/market/fangyuan",
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
        { prop: "tag", label: "标签", align: "center" },
        {
          prop: "settings",
          label: "设置",
          width: '182px',
          align: "center",
          fixed: 'right',
          slotName: "settingRoom"
        },
        {
          prop: "operate",
          label: "操作",
          align: "center",
          fixed: 'right',
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
      ],
      copyItemToModelVisible: false,
      copyItemRoomList: {},
      checkAllCopyItem: false,
      copyOptions: [
        {
          label: '交租方式',
          val: 1
        },
        {
          label: '房间类型',
          val: 2
        },
        {
          label: '室卫厅',
          val: 3
        },
        {
          label: '面积',
          val: 4
        },
        {
          label: '装修程度',
          val: 5
        },
        {
          label: '朝向',
          val: 6
        },
        {
          label: '床数',
          val: 7
        },
        {
          label: '最大入住人数',
          val: 8
        },
        {
          label: '飞虎队',
          val: 10
        },
      ],
      checkedCopyList: [],
      rentPayModelVisible: false
    }
  },
  computed: {
    allCheckedOptionsList() {
      return this.copyOptions.map((item) => item.val)
    }
  },
  methods: {
    searchParam() {
      this.$refs.estateRoomList.searchHandler()
    },
    setFloorList() {
      estateRoomFloorApi({
        fangyuanCode: this.fangyuanCode
      }).then((res) => {
        if (res.code === '0') {
          this.floorList = res.data.list
        }
      })
    },
    fetchEstateDetailData() {
      estateRoomDetailApi({
        fangyuanCode: this.fangyuanCode
      }).then((res) => {
        if (res.code === '0') {
          this.$set(this, 'estateInfo', res.data.dataObject)
        }
      })
    },
    openCopyItemToModel(row) {
      this.curRoomCode = row.roomCode
      estateBatchCopyRoomListApi({
        fangyuanCode: this.fangyuanCode,
        roomCode: row.roomCode
      }).then((res) => {
        this.copyItemRoomList = res.data.dataObject
        this.copyItemToModelVisible = true
      })
    },
    openRentPayModel(row) {
      estateRoomRentPayWayApi({
        roomCode: row.roomCode
      }).then((res) => {

        this.rentPayModelVisible = true
      })
    },
    handleCheckAllChange(val) {
      this.checkedCopyList = val ? this.allCheckedOptionsList : []
    },
    handleOptionsChange() {
      this.checkAllCopyItem = this.checkedCopyList.length === this.allCheckedOptionsList.length
    },
    saveCopyItemTo() {
      let checkedRoomList = this.$refs.copyItemTo.returnCheckedList()
      copyToOtherRoomApi({
        fromRoomCode: this.curRoomCode,
        toRoomCodes: checkedRoomList,
        items: this.checkedCopyList
      }).then((res) => {
        if (res.code === '0') {
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.checkedCopyList = []
          this.checkAllCopyItem = false
          this.copyItemToModelVisible = false
          this.searchParam()
        }
      })
    }
  },
  mounted() {
    this.fangyuanCode = this.$route.query.fangyuanCode || ''
    this.setFloorList()
    this.fetchEstateDetailData()
  }
}
</script>

<style lang="scss" scoped>
.room-options-row {
  margin-bottom: 20px;
  .estate-title {
    display: inline-block;
    vertical-align: middle;
    margin-left: 50px;
    font-size: 24px;
    line-height: 1;
  }
  .estate-address {
    display: inline-block;
    vertical-align: middle;
    max-width: 500px;
    overflow: hidden;
    font-size: 14px;
    line-height: 1;
    margin-left: 20px;
  }
}
.room-search-form {
  .room-search-form-group {
    margin-bottom: 10px;
    &.right {
      margin-right: 0;
    }
  }
}
.copy-item-to-model {
  .head-card {
    box-shadow: 0 0;
    margin-bottom: 20px;
    .head-card-title {
      i {
        margin-left: 5px;
        color: #409EFF;
      }
    }
    .check-all {
      float: right;
      position: relative;
      .el-form-item {
        margin-bottom: 0;
      }
    }
    .head-check-options {
      width: 20%;
      margin-left: 0;
    }
  }
}
</style>


