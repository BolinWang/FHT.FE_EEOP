<template>
  <div class="app-container">
    <el-row class="room-options-row">
      <el-button type="primary" size="small" @click="$router.push({name: '集中式房源'})" icon="el-icon-arrow-left">返回</el-button>
      <el-button type="primary" size="small" @click="openRoomDetailModel">新建房号</el-button>
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
      listField="data.result"
      totalField="data.records"
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

    <el-dialog class="rent-pay-model" title="交租方式" :visible.sync="rentPayModelVisible" width="1000px">
      <div class="finance-rent-pay-way">
        <el-row :gutter="10" class="rent-pay-model-row">
          <el-col :span="3">
            金融·交租方式
          </el-col>
          <el-col :span="3">
            房价/月
          </el-col>
          <el-col :span="3">
            押金
          </el-col>
          <el-col :span="3">
            最短租期
          </el-col>
          <el-col :span="3">
            最长租期
          </el-col>
          <el-col :span="3">
            服务费·元/月
          </el-col>
          <el-col :span="3">
            服务费支付方式
          </el-col>
        </el-row>
        <el-row :gutter="10" class="rent-pay-model-row" v-for="item in financeRentPayList" :key="item.roomId">
          <el-col :span="3">
            {{item.name}}
          </el-col>
          <el-col :span="3">
            <el-input size="mini" v-model="item.rentPrice">
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-input size="mini" v-model="item.depositPrice">
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-select size="mini" :value="item.minMonthNum + '个月'" disabled>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select size="mini" :value="item.maxMonthNum + '个月'" disabled>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select size="mini" v-model="item.serviceChargeType" disabled>
              <el-option
                v-for="n in serviceChargeTypeList"
                :key="n.value"
                :label="n.label"
                :value="n.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select size="mini" v-model="item.serviceFeeType" disabled>
              <el-option
                v-for="n in serviceFeeTypeList"
                :key="n.value"
                :label="n.label"
                :value="n.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="default-rent-pay-way">
        <el-row :gutter="10" class="rent-pay-model-row">
          <el-col :span="3">
            常规·交租方式
          </el-col>
          <el-col :span="3">
            房价/月
          </el-col>
          <el-col :span="3">
            押金
          </el-col>
          <el-col :span="3">
            最短租期
          </el-col>
          <el-col :span="3">
            最长租期
          </el-col>
          <el-col :span="5">
            服务费·元/月
          </el-col>
          <el-col :span="3">
            服务费支付方式
          </el-col>
        </el-row>
        <el-row :gutter="10" class="rent-pay-model-row" v-for="item in defaultRentPayList" :key="item.roomId">
          <el-col :span="3">
            <span v-if="item.roomRentTypeId">
              {{item.name}}
            </span>
            <el-select v-else v-model="item.name" size="mini">
              <el-option
                v-for="n in baseRentTypeList"
                :key="n.rentQty"
                :label="n.name"
                :value="n.rentQty">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input size="mini" v-model="item.rentPrice">
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-input size="mini" v-model="item.depositPrice">
              <template slot="append">元</template>
            </el-input>
          </el-col>
          <el-col :span="3" class="lease-term">
            <el-select size="mini" v-model="item.minMonthNum">
              <el-option
                v-for="n in 24"
                :key="n"
                :label="n + '个月'"
                :value="n">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3" class="lease-term">
            <el-select size="mini" v-model="item.maxMonthNum">
              <el-option
                v-for="n in 24"
                :key="n"
                :label="n + '个月'"
                :value="n">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select size="mini" v-model="item.serviceChargeType" @change="switchServiceChargeType(item)">
              <el-option
                v-for="n in serviceChargeTypeList"
                :key="n.value"
                :label="n.label"
                :value="n.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-input size="mini"></el-input>
            %
            <el-input size="mini"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select size="mini" v-model="item.serviceFeeType">
              <el-option
                v-if="item.serviceChargeType === 1"
                label="无"
                :value="1">
              </el-option>
              <el-option
                v-else
                v-for="n in serviceFeeTypeList"
                :key="n.value"
                :label="n.label"
                :value="n.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1">
            <el-button class="delete-btn" type="text" icon="el-icon-delete" @click="deleteCurRentPay(item)"></el-button>
          </el-col>
        </el-row>
      </div>
      <el-button type="primary" size="mini" @click="addRentPay">添加交租方式</el-button>
      <span slot="footer">
        <el-button type="primary" size="small" @click="saveRentPay">保 存</el-button>
        <el-button @click="rentPayModelVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog class="room-detail-model" title="新建房号" :visible.sync="roomDetailModelVisible" width="800px">
      <room-detail></room-detail>
      <span slot="footer">
        <el-button type="primary" size="small">保 存</el-button>
        <el-button @click="roomDetailModelVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GridUnit from "@/components/GridUnit/grid"
import { estateRoomFloorApi, estateRoomDetailApi, estateBatchCopyRoomListApi, copyToOtherRoomApi, estateRoomRentPayWayApi, saveEstateRoomRentPayWayApi } from "@/api/houseManage"
import RoomListSelecter from '@/components/RoomListSelecter'
import RoomDetail from '../components/roomDetailModel'
export default {
  name: 'singleEstateRoom',
  components: {
    GridUnit,
    RoomListSelecter,
    RoomDetail
  },
  data() {
    return {
      fangyuanCode: '',
      curRoomCode: '',
      estateInfo: {},
      floorList: [],
      roomSearchForm: {
        fangyuanCode: '1',
        roomStatus: '',
        floor: '',
        roomCode: '',
        roomNo: '11'
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
      rentPayModelVisible: false,
      rentPayList: [],
      serviceChargeTypeList: [
        {
          label: '无',
          value: 1
        },
        {
          label: '固定金额',
          value: 2
        },
        {
          label: '租金百分比',
          value: 3
        }
      ],
      serviceFeeTypeList: [
        {
          label: '随租金付',
          value: 2
        },
        {
          label: '一次性付清',
          value: 3
        }
      ],
      baseRentTypeList: [],
      roomDetailModelVisible: false
    }
  },
  computed: {
    allCheckedOptionsList() {
      return this.copyOptions.map((item) => item.val)
    },
    financeRentPayList() {
      return this.rentPayList.filter((item) => item.type === 2)
    },
    defaultRentPayList() {
      return this.rentPayList.filter((item) => item.type === 1)
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
        if (res.code === '0') {
          this.$set(this, 'rentPayList', res.data.dataObject.roomRentTypeList)
          this.$set(this, 'baseRentTypeList', res.data.dataObject.baseRentTypeList)
        }
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
    },
    addRentPay() {
      this.rentPayList.push({
        depositPrice: '',
        depositQty: '',
        maxMonthNum: 24,
        minMonthNum: 1,
        name: "月付",
        rentPrice: '',
        rentQty: '',
        rentTypeId: 1,
        roomId: this.rentPayList[0].roomId,
        roomRentTypeId: undefined,
        serviceChargePrice: 0,
        serviceChargeRatio: 0,
        serviceChargeType: 1,
        serviceFeeType: 1,
        type: 1
      })
    },
    saveRentPay() {
      saveEstateRoomRentPayWayApi({
        roomCode: this.curRoomCode,
        roomRentTypeList: this.rentPayList
      }).then((res) => {
        if (res.code === '0') {
          this.rentPayModelVisible = false
        }
      })
    },
    deleteCurRentPay(row) {
      this.$set(this, 'rentPayList', this.rentPayList.filter((item) => item != row))
    },
    switchServiceChargeType(row) {
      row.serviceFeeType = row.serviceChargeType === 1 ? 1 : 2
    },
    openRoomDetailModel() {
      this.roomDetailModelVisible = true
    }
  },
  mounted() {
    // this.setFloorList()
    this.fetchEstateDetailData()
    // this.openRentPayModel({
    //   roomCode: 1234
    // })
  },
  created() {
    this.fangyuanCode = this.$route.query.fangyuanCode || ''
    this.roomSearchForm.fangyuanCode = this.fangyuanCode
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
.finance-rent-pay-way {
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}
.rent-pay-model-row {
  margin-bottom: 15px;
  .el-col {
    &:last-child {
      .delete-btn {
        padding: 3px 0;
        font-size: 18px;
        color: red;
      }
    }
  }
  .rent-money {
    width: 100px;
    .append {
      padding: 0 5px;
    }
  }
  .lease-term {
    width: 100px;
  }
}
</style>


