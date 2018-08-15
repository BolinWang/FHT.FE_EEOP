<template>
  <div class="app-container">
    <el-row class="room-options-row">
      <el-button type="primary" size="small" @click="$router.push({name: '集中式房源'})" icon="el-icon-arrow-left">返回</el-button>
      <el-button type="primary" size="small" @click="openRoomDetailModel(1)">新建房号</el-button>
      <el-button type="danger" size="small" @click="deleteRoom">删除房号</el-button>
      <span class="estate-title">{{estateInfo.estateName}}</span>
      <span class="estate-address">{{estateInfo.subdistrictName + ' - ' + estateInfo.subdistrictAddress}}</span>
    </el-row>
    <el-form class="room-search-form" ref="form" :inline="true" :model="roomSearchForm" size="small">
      <el-form-item class="room-search-form-group">
        <el-select v-model="roomSearchForm.floor" placeholder="楼层">
          <el-option v-for="item in estateInfo.floors" :key="item.floorId" :label="item.floorName" :value="item.floorId">
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
        <el-button type="primary" @click="searchEstateRoomList('search')">查询</el-button>
        <el-button @click="searchEstateRoomList('clear')">清空</el-button>
      </el-form-item>
    </el-form>

    <grid-unit ref="estateRoomList" :url="estateRoomListUrl" listField="data.result" totalField="data.records" :dataMethod="reqMethod" :formOptions="roomSearchForm" :showSelection="true" :columns="colModels" :height="tableHeight" @selection-change="handleSelectionChange">
      <template slot="setTag" slot-scope="scope">
        <el-tag v-if="scope.row.tag === 1">飞虎队</el-tag>
      </template>
      <template slot="settingRoom" slot-scope="scope">
        <el-button size="mini" @click="openRentPayModel(scope.row)">交租方式</el-button>
        <el-button size="mini" @click="openCopyItemToModel(scope.row)">复制到</el-button>
        <el-popover placement="bottom" width="150" trigger="hover">
          ....
          <el-button slot="reference" size="mini">房态管理</el-button>
        </el-popover>
      </template>
      <template slot="operateRoom" slot-scope="scope">
        <el-button type="primary" size="mini" @click="openRoomDetailModel(2, scope.row)">编辑房间</el-button>
      </template>
    </grid-unit>

    <el-dialog class="copy-item-to-model" title="复制到" :visible.sync="copyItemToModelVisible" width="700px">
      <room-list-selecter ref="copyItemTo" :roomList="copyItemRoomList" :visible="copyItemToModelVisible">
        <el-card class="head-card">
          <div slot="header" class="clearfix">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">选择复制您要的内容，再选择您要编辑的房间，<br/>这样可以方便您快速批量编辑同类房源</div>
              <span class="head-card-title">复制项目
                <i class="el-icon-warning"></i>
              </span>
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
            <el-checkbox class="head-check-options" v-for="v in copyOptions" :key="v.val" :label="v.val" @change="handleOptionsChange">
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
      <el-table class="finance-rent-pay-way" :data="financeRentPayList" style="width: 100%">
        <el-table-column label="金融·交租方式" width="130">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="房价/月">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.rentPrice" class="rent-price-input">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="押金">
          <template slot-scope="scope">
            <el-input size="mini" v-model="scope.row.depositPrice" class="rent-price-input">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="最短租期" width="100">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.minMonthNum" disabled>
              <el-option v-for="n in 24" :key="n" :label="n + '个月'" :value="n">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="最长租期" width="100">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.maxMonthNum" disabled>
              <el-option v-for="n in 24" :key="n" :label="n + '个月'" :value="n">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="服务费·元/月" width="130">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.serviceChargeType" @change="switchServiceChargeType(scope.row)" disabled>
              <el-option v-for="n in serviceChargeTypeList" :key="n.value" :label="n.label" :value="n.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="" width="140">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="24" v-if="scope.row.serviceChargeType === 2">
                <el-input size="mini" v-model="scope.row.serviceChargePrice" disabled></el-input>
              </el-col>
              <template v-else-if="scope.row.serviceChargeType === 3">
                <el-col :span="10">
                  <el-input size="mini" v-model="scope.row.serviceChargeRatio" disabled></el-input>
                </el-col>
                <el-col :span="4" class="service-charge-price-percent">
                  %
                </el-col>
                <el-col :span="10">
                  <el-input size="mini" v-model="scope.row.serviceChargePrice" disabled></el-input>
                </el-col>
              </template>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="服务费支付方式" width="130">
          <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.serviceFeeType" disabled>
              <el-option v-if="scope.row.serviceChargeType === 1" label="无" :value="1">
              </el-option>
              <el-option v-else v-for="n in serviceFeeTypeList" :key="n.value" :label="n.label" :value="n.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="" width="50">
          <template slot-scope="scope">
            <el-button v-show="false" class="delete-btn" type="text" icon="el-icon-delete" @click="deleteCurRentPay(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form :model="defaultRentPayForm" ref="defaultRentPayForm" label-width="0">
        <el-table class="default-rent-pay-way" :data="defaultRentPayForm.defaultRentPayList" style="width: 100%">
          <el-table-column label="常规·交租方式" width="130">
            <template slot-scope="scope">
                <span v-if="scope.row.roomRentTypeId">
                  {{scope.row.name}}
                </span>
                <el-form-item
                  v-else
                  label=""
                  :key="scope.row.roomRentTypeId"
                  :prop="'defaultRentPayList.' + scope.$index + '.rentQty'"
                  :rules="{
                    required: true, message: 'heiheihei', trigger: 'change'
                  }">
                  <el-select  v-model="scope.row.rentQty" size="mini" @change="switchRentType(scope.row)">
                    <el-option v-for="n in baseRentTypeList" :key="n.rentQty" :label="n.name" :value="n.rentQty">
                    </el-option>
                  </el-select>
                </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="房价/月">
            <template slot-scope="scope">
              <el-form-item
                label=""
                :key="scope.row.roomRentTypeId"
                :prop="'defaultRentPayList.' + scope.$index + '.rentPrice'"
                :rules="{
                  required: true, message: 'heiheihei', trigger: ['change', 'blur']
                }">
                <el-input size="mini" v-model="scope.row.rentPrice" class="rent-price-input" @change="computeServiceChargePrice(scope.row)">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="押金">
            <template slot-scope="scope">
              <el-form-item
                label=""
                :key="scope.row.roomRentTypeId"
                :prop="'defaultRentPayList.' + scope.$index + '.depositPrice'"
                :rules="{
                  required: true, message: 'heiheihei', trigger: ['change', 'blur']
                }">
                <el-input size="mini" v-model="scope.row.depositPrice" class="rent-price-input">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="最短租期" width="100">
            <template slot-scope="scope">
              <el-form-item
                label=""
                :key="scope.row.roomRentTypeId"
                :prop="'defaultRentPayList.' + scope.$index + '.minMonthNum'"
                :rules="{
                  required: true, message: 'heiheihei', trigger: ['change', 'blur']
                }">
                <el-select size="mini" v-model="scope.row.minMonthNum">
                  <el-option v-for="n in 24" :key="n" :label="n + '个月'" :value="n">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="最长租期" width="100">
            <template slot-scope="scope">
              <el-form-item
                label=""
                :key="scope.row.roomRentTypeId"
                :prop="'defaultRentPayList.' + scope.$index + '.maxMonthNum'"
                :rules="{
                  required: true, message: 'heiheihei', trigger: ['change', 'blur']
                }">
                <el-select size="mini" v-model="scope.row.maxMonthNum">
                  <el-option v-for="n in 24" :key="n" :label="n + '个月'" :value="n">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="服务费·元/月" width="130">
            <template slot-scope="scope">
              <el-form-item
                label=""
                :key="scope.row.roomRentTypeId"
                :prop="'defaultRentPayList.' + scope.$index + '.serviceChargeType'"
                :rules="{
                  required: true, message: 'heiheihei', trigger: ['change', 'blur']
                }">
                <el-select size="mini" v-model="scope.row.serviceChargeType" @change="switchServiceChargeType(scope.row)">
                  <el-option v-for="n in serviceChargeTypeList" :key="n.value" :label="n.label" :value="n.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="" width="140">
            <template slot-scope="scope">
              <el-row>
                <el-col :span="24" v-if="scope.row.serviceChargeType === 2">
                  <el-form-item
                    label=""
                    :key="scope.row.roomRentTypeId"
                    :prop="'defaultRentPayList.' + scope.$index + '.serviceChargePrice'"
                    :rules="{
                      required: true, message: 'heiheihei', trigger: ['change', 'blur']
                    }">
                    <el-input size="mini" v-model="scope.row.serviceChargePrice"></el-input>
                  </el-form-item>
                </el-col>
                <template v-else-if="scope.row.serviceChargeType === 3">
                  <el-col :span="10">
                    <el-form-item
                      label=""
                      :key="scope.row.roomRentTypeId"
                      :prop="'defaultRentPayList.' + scope.$index + '.serviceChargeRatio'"
                      :rules="{
                        required: true, message: 'heiheihei', trigger: ['change', 'blur']
                      }">
                      <el-input size="mini" v-model="scope.row.serviceChargeRatio" @change="computeServiceChargePrice(scope.row)"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="service-charge-price-percent">
                    %
                  </el-col>
                  <el-col :span="10">
                    <el-form-item
                      label=""
                      :key="scope.row.roomRentTypeId"
                      :prop="'defaultRentPayList.' + scope.$index + '.serviceChargePrice'"
                      :rules="{
                        required: true, message: 'heiheihei', trigger: ['change', 'blur']
                      }">
                      <el-input size="mini" v-model="scope.row.serviceChargePrice" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </template>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="服务费支付方式" width="130">
            <template slot-scope="scope">
              <el-form-item
                label=""
                :key="scope.row.roomRentTypeId"
                :prop="'defaultRentPayList.' + scope.$index + '.serviceFeeType'"
                :rules="{
                  required: true, message: 'heiheihei', trigger: ['change', 'blur']
                }">
                <el-select size="mini" v-model="scope.row.serviceFeeType">
                  <el-option v-if="scope.row.serviceChargeType === 1" label="无" :value="1">
                  </el-option>
                  <el-option v-else v-for="n in serviceFeeTypeList" :key="n.value" :label="n.label" :value="n.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="" width="50">
            <template slot-scope="scope">
              <el-button class="delete-btn" type="text" icon="el-icon-delete" @click="deleteCurRentPay(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-button type="primary" size="mini" @click="addRentPay">添加交租方式</el-button>
      <span slot="footer">
        <el-button type="primary" size="small" @click="saveRentPay">保 存</el-button>
        <el-button @click="rentPayModelVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog class="room-detail-model" :title="curType === 1 ? '新建房号' : '编辑房号'" :visible.sync="roomDetailModelVisible" width="800px">
      <room-detail ref="roomDetailModel" :type="curType" :modelVisible="roomDetailModelVisible" :estateInfo="estateInfo"></room-detail>
      <span slot="footer">
        <el-button type="primary" size="small" @click="saveRoomData">{{curType === 1 ? '确 定' : '保 存' }}</el-button>
        <el-button @click="roomDetailModelVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GridUnit from "@/components/GridUnit/grid"
import { estateRoomFloorApi, estateRoomDetailApi, estateBatchCopyRoomListApi, copyToOtherRoomApi, estateRoomRentPayWayApi, saveEstateRoomRentPayWayApi, oneEstateRoomApi, saveEstateRoomApi, checkRoomHasDeviceApi, deleteRoomApi } from "@/api/houseManage"
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
      defaultRentPayForm: {
        defaultRentPayList: []
      },
      fangyuanCode: '',
      curRoomCode: '',
      estateInfo: {},
      roomSearchForm: {
        fangyuanCode: '',
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
        {
          prop: "tag",
          label: "标签",
          align: "center",
          slotName: "setTag"
        },
        {
          prop: "settings",
          label: "设置",
          width: '290px',
          align: 'center',
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
      roomDetailModelVisible: false,
      curType: '',
      selectedRooms: []
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
    searchEstateRoomList(type) {
      if (type === 'clear') {
        Object.keys(this.roomSearchForm).forEach((key) => {
          this.roomSearchForm[key] = key === 'fangyuanCode' ? this.roomSearchForm[key] : ''
        })
      }
      this.searchParam()
    },
    fetchEstateDetailData() {
      estateRoomDetailApi({
        fangyuanCode: this.fangyuanCode
      }).then((res) => {
        if (res.code === '0') {
          // this.$store.commit('SET_ESTATEDATA', res.data.dataObject)
          this.$set(this, 'estateInfo', res.data)
        }
      })
    },
    openCopyItemToModel(row) {
      this.curRoomCode = row.roomCode
      estateBatchCopyRoomListApi({
        fangyuanCode: this.fangyuanCode,
        roomCode: row.roomCode
      }).then((res) => {
        if (res.code === '0' && res.data) {
          this.copyItemRoomList = res.data
          this.copyItemToModelVisible = true
        }
      })
    },
    openRentPayModel(row) {
      estateRoomRentPayWayApi({
        roomCode: row.roomCode
      }).then((res) => {
        if (res.code === '0') {
          this.$set(this, 'rentPayList', res.data.roomRentTypeList)
          this.$set(this, 'baseRentTypeList', res.data.baseRentTypeList)
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
        rentQty: 1,
        rentTypeId: 1,
        roomId: this.rentPayList[0] ? this.rentPayList[0].roomId : undefined,
        roomRentTypeId: undefined,
        serviceChargePrice: null,
        serviceChargeRatio: null,
        serviceChargeType: 1,
        serviceFeeType: 1,
        type: 1
      })
    },
    saveRentPay() {
      if (true) {
        this.$message.error('请填写完交租方式再保存')
        return
      }
      saveEstateRoomRentPayWayApi({
        roomCode: this.curRoomCode,
        roomRentTypeList: this.rentPayList
      }).then((res) => {
        if (res.code === '0') {
          this.rentPayModelVisible = false
        }
      })
    },
    switchRentType(row) {
      const tempArr = this.baseRentTypeList.filter((item) => item.rentQty === row.rentQty)
      Object.keys(tempArr[0]).forEach((key) => {
        if (key === 'baseRentTypeId') {
          row['rentTypeId'] = tempArr[0][key]
        } else {
          row[key] = tempArr[0][key]
        }
      })
    },
    deleteCurRentPay(row) {
      this.$set(this, 'rentPayList', this.rentPayList.filter((item) => item != row))
    },
    computeServiceChargePrice(row) {
      row.serviceChargePrice = row.serviceChargeRatio * row.rentPrice / 100
    },
    switchServiceChargeType(row) {
      row.serviceFeeType = row.serviceChargeType === 1 ? 1 : 2
    },
    openRoomDetailModel(type, row) {
      this.curType = type
      if (type === 2) {
        oneEstateRoomApi({
          roomCode: row.roomCode
        }).then((res) => {
          if (res.code === '0') {
            this.$store.commit('SET_ESTATEROOMDATA', res.data)
            this.roomDetailModelVisible = true
          }
        })
      } else {
        this.roomDetailModelVisible = true
      }
    },
    saveRoomData() {
      let data = this.$refs.roomDetailModel.saveRoomData()
      if (!data) {
        return
      }
      console.log(data)
      data.fangyuanCode = this.fangyuanCode
      saveEstateRoomApi({
        roomInfo: JSON.stringify(data)
      }, this.curType).then((res) => {
        if (res.code === '0') {
          this.$message({
            message: res.message || '操作成功',
            type: 'success'
          })
          this.roomDetailModelVisible = false
        }
      })
    },
    handleSelectionChange(list) {
      this.selectedRooms = list
    },
    deleteRoom() {
      if (!this.selectedRooms.length) {
        this.$message.error('请先选择要删除的房间号')
        return
      }
      checkRoomHasDeviceApi({
        roomCodeList: this.selectedRooms.map(item => item.roomCode)
      }).then((res) => {
        if (res.code === '0') {
          deleteRoomApi({
            roomCodeList: this.selectedRooms.map(item => item.roomCode)
          }).then((res) => {
            if (res.code === '0') {
              this.$message({
                message: res.message,
                type: 'success'
              })
              this.searchParam()
            }
          })
        }
      })
    }
  },
  watch: {
    roomDetailModelVisible(val) {
      if (val) {
        this.$nextTick(() => {
          // this.$refs.roomDetailModel.$refs.roomDetailModel.clearValidate()
        })
      } else {

      }
    },
    defaultRentPayList(val) {
      if (val) {
        this.defaultRentPayForm.defaultRentPayList = val
      }
    }
  },
  mounted() {
    this.fetchEstateDetailData()
    // this.openRentPayModel({
    //   roomCode: 1234
    // })
  },
  created() {
    this.fangyuanCode = this.$route.query.fangyuanCode || ''
    this.roomSearchForm.fangyuanCode = this.fangyuanCode
  },
  beforeDestroy() {
    let dialog = document.querySelectorAll('body > .el-dialog__wrapper')
    if (dialog) {
      [].forEach.call(dialog, function (item, index) {
        document.body.removeChild(item)
      })
    }
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
        color: #409eff;
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
  margin-bottom: 15px;
  .service-charge-price-percent {
    line-height: 40px;
    text-align: center;
  }
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
  .lease-term {
    width: 100px;
  }
}
.default-rent-pay-way {
  margin-bottom: 15px;
  td {
    padding: 0 !important;
  }
  .delete-btn {
    padding: 3px 0;
    font-size: 18px;
    color: red;
  }
  .service-charge-price-percent {
    line-height: 40px;
    text-align: center;
  }
  .el-form-item {
    height: 60px;
    margin-bottom: 0;
    .el-form-item__error {
      padding-top: 0;
    }
    // margin-bottom: 0;
  }
}
</style>
