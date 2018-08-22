<template>
    <div class="container">
        <div class="model-search clearfix">

            <el-form size="small" :inline="true" :model="formData" >
                <el-form-item id="pad-b">
                    <el-select size="small" style="width:120px;" v-model="formData.cityId" placeholder="城市" class="item-select" >
                       <el-option v-for="item in cityData" :key="item.value" :label="item.label" :value="item.value">
                       </el-option>
                    </el-select>
                     <el-input v-model="formData.address"  placeholder="请输入小区／公寓名称" style="width:180px;"  @keydown.native.enter="searchParam" class="filter-item"></el-input>
                    <el-date-picker
                      v-model="dateTime"
                      size="small" 
                      type="datetimerange" 
                      class="filter-item" 
                      range-separator="至" 
                      start-placeholder="开始日期" 
                      end-placeholder="结束日期" 
                      style="width:360px"
                      @change="searchParam"
                      >
                    </el-date-picker>
                    <el-input v-model="formData.customerKeyword" 
                      placeholder="租客／租客手机号码" 
                      style="width:180px;" 
                      @keydown.native.enter="searchParam" 
                      class="filter-item">
                    </el-input>
                    <el-select size="small" style="width:120px;" v-model="formData.overType" placeholder="逾期状态" class="filter-item"  clearable>
                        <el-option v-for="item in overTypeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select size="small" style="width:180px;" v-model="formData.status" placeholder="请选择订单状态"  clearable >
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" >
                    </el-option>
                  </el-select>
                  <el-input  
                  placeholder="房东／房东手机号码" 
                  style="width:180px;" 
                  v-model='formData.orgKeyword'  
                  @keydown.native.enter="searchParam" 
                  class="filter-item">
                  </el-input>
                  <el-input  v-model='formData.managerKeyword' placeholder="城市管家／城市管家手机号码" style="width:220px;"  @keydown.native.enter="searchParam" class="filter-item"></el-input>
                  <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam"  class="filter-item">查询</el-button>
                  <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
                  <el-button class="right" type="primary" size="small" icon="el-icon-upload" @click.native="exportExcel">导出</el-button>
                </el-form-item>
            </el-form>
            <div class="table-box">
                <div class="model-table"  style="margin-top: 0;">
                    <el-table :data="tableData" v-loading.body="listLoading"  :max-height="tableHeight" size="small" fit stripe highlight-current-row>
                        <el-table-column type="index" width="50" align="center"></el-table-column>
                         <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="账单号">
                                    <span>{{ props.row.billNo }}</span>
                                </el-form-item>
                                <el-form-item label="房源位置">
                                    <span>{{ props.row.subdistrictAddress}}</span>
                                </el-form-item>
                                <el-form-item label="房东">
                                    <span>{{ props.row.orgName }}</span>
                                </el-form-item>
                                <el-form-item label="手机号码">
                                    <span>{{ props.row.orgMobile }}</span>
                                </el-form-item>
                                <el-form-item label="城市管家">
                                    <span>{{ props.row.managerName}}</span>
                                </el-form-item>
                                <el-form-item label="手机号码">
                                    <span>{{ props.row.managerMobile }}</span>
                                </el-form-item>
                                 <el-form-item label="所在部门">
                                    <span>{{ props.row.department }}</span>
                                </el-form-item>
                                <el-form-item label="支付时间">
                                    <span>{{ props.row.finishDate }}</span>
                                </el-form-item>
                                </el-form>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="小区／公寓-房间"
                            width='120px'
                            prop="roomAddress">
                            </el-table-column>
                            <el-table-column
                            label="生成时间"
                            prop="gmtCreate">
                            </el-table-column>
                            <el-table-column
                            label="账单名称"
                             width='100px'
                            prop="billName">
                            </el-table-column>
                            <el-table-column
                            label="账单金额"
                            width='80px'
                            prop="billFee">
                            </el-table-column>
                             <el-table-column
                            label="最迟支付时间"
                             width='100px'
                            prop="deadlineDate">
                            </el-table-column>
                            <el-table-column
                             width='60px'
                            label="状态">
                              <template slot-scope="scope">
                                    <span >{{scope.row.status | filStatus}}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                            width='80px'
                            label="是否逾期">
                               <template slot-scope="scope">
                                  <div class="box-c">
                                      <span v-if='scope.row.isOver===false'>尚未逾期</span>
                                      <span v-else-if='scope.row.isOver===true'>已逾期<span class="col-red">{{scope.row.overDays}}</span>天</span>
                                      <span v-else>-</span>  
                                  </div>
                               </template>
                            </el-table-column>
                              <el-table-column
                              label="逾期原因"
                              width='80px'
                              >
                                <template slot-scope="scope">
                                    <div class="overdueReason" @click="overDue(scope.row.overdueReason,scope.row.overdueType,scope.row.id)">
                                       <span v-if="scope.row.overdueType||scope.row.overdueType==0">
                                         <el-popover
                                          placement="top-start"
                                          title="原因"
                                          width="200"
                                          trigger="hover"
                                          :content="scope.row.overdueReason">
                                           <span slot="reference" >{{scope.row.overdueType | filoverdueType}}</span>
                                        </el-popover>
                                       </span> 
                                       <span v-else class="choose">请选择</span>
                                    </div>
                                </template>
                            </el-table-column>
                              <el-table-column
                              width='130px'
                            label="租客/手机号码">
                              <template slot-scope="scope">
                                  {{scope.row.customerName}}/{{scope.row.customerMobile}}
                              </template>
                            </el-table-column>
                             <el-table-column
                            label="催租跟进">
                              <template slot-scope="scope">
                                  <span class="col-red pad cursor" @click="goFollow(scope.row.id,scope.row.billNo,scope.row.isOver)">{{scope.row.followCount
| filterText }}</span>           
                                  <el-popover
                                    placement="top-start"
                                    width="200"
                                    trigger="hover"
                                    :disabled='scope.row.followType != 3'
                                    :content="scope.row.content">
                                    <el-button slot="reference" v-show="scope.row.followType" size="mini" type="info" plain>{{scope.row.followType | filterBtn}}</el-button>
                                  </el-popover>
                              </template>
                            </el-table-column>
                    </el-table>
                    </div>
                    <div class="model-pagination">
                    <el-pagination background   @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageItems.pageNo" :page-sizes="pageSizeList" :page-size="pageItems.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!--逾期 弹窗 -->
        <renting-A-Bill  ref="rentingABill" v-on:searchCallback = 'searchGo'></renting-A-Bill>
        <!-- 催租跟进弹窗 -->
        <follow-Up ref='followUp' v-on:searchStart = "searchParam"></follow-Up>
    </div>
</template>
<script>
import rentingABill from './components/overDue'
import followUp from './components/followUp'
import { parseTime ,delObjectItem}  from '@/utils'
import { getRentingListApi ,exportExcelApi} from '@/api/renting'
export default {
     components: {
    rentingABill ,followUp
  },
    data() {
      return { 
         fullscreenLoading: false,
        pageItems: {   //pageSize对象
          pageNo: 1,
          pageSize: 20
        },
        pageSizeList: [10, 20, 30, 50],
        listLoading:true,
        dialogFormVisible:false,  //逾期弹窗
        total:null,
        cityList:[{
                value: '选项1',
                label: '房东'
                }, {
                value: '选项2',
                label: '租客'
            }, 
          ],
        formData:{
            cityId:310100,   //城市Id
            startTime:"",  //开始时间
            endTime:'',    //结束时间
            customerKeyword:"",  //租客姓名／手机号
            overType:null,      //订单逾期状态
            address:"",     //小区或公寓名称  
            status:0,      //订单状态
            orgKeyword:"",   //房东姓名／房东手机号
            managerKeyword:'',  //城市管家
        },
        select: '',
        tableHeight:'',
        tableData: [],
        cityData:[{
                value: 330100,
                label: '杭州'
                }, {
                value: 310100,
                label: '上海'
            }, 
          ],
          
          dateTime:[], //时间数组
        overTypeList:[{   //逾期状态
            value: 0,
            label: '已逾期'
            }, {
                value: 1,
                label: '尚未逾期'
            }, {
                value: null,
                label: '全部'
            }
        ],
        statusList:[{    //订单状态
           value: 0,
           label: '未缴租'
        },{    //订单状态
           value: 1,
           label: '线上已缴租'
        },{    //订单状态
           value: 2,
           label: '线下已缴租'
        },{    //订单状态
           value: 3,
           label: '已撤销 '
        }],
        
      }
    },
    created(){
        //获取30天时间
        let myDate = new Date();
        let nowY = myDate.getFullYear();
        let nowM = myDate.getMonth()+1;
        let nowD = myDate.getDate();
        this.formData.endTime = `${nowY}-${(nowM<10 ? "0" + nowM : nowM)}-${(nowD<10 ? "0"+ nowD : nowD)} 00:00:00`;//当前日期 
        //获取三十天前日期
        let lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30);//最后一个数字30可改，30天的意思
        let lastY = lw.getFullYear();
        let lastM = lw.getMonth()+1;
        let lastD = lw.getDate();
        this.formData.startTime=`${lastY}-${(lastM<10 ? "0" + lastM : lastM)}-${(lastD<10 ? "0"+ lastD : lastD)} 00:00:00`;//三十天之前日期
      
   },
    filters: {
      filterBtn(val){
         let resultTypeList = [  //1-已退租 2-未缴纳 3-待确认结果真实性 4-未接听
              {
                value:1,
                label:'已退租'
              },{
                value:2,
                label:'未缴纳'
              },{
                value:3,
                label:'待确认真实性'
              },{
                value:4,
                label:'未接听'
              }
          ]
        return resultTypeList[val]?resultTypeList[val-1].label:''
      },
      filStatus(val){
        const valStatus=['未缴租','线上已缴租','线下已缴租','已撤销']
        return valStatus[val]
      },
      filoverdueType(val){
        const valoverType=['已退租','线上交租','个人原因','其他']
        return valoverType[val]
      },
      filterText(val){
         return val>0? `${val}次` : '请跟进'
      }
    },
    mounted(){
        let temp_height = document.body.clientHeight - 252;
        this.tableHeight = temp_height > 300 ? temp_height : 300;
        window.onresize = () => {
        return (() => {
            temp_height = document.body.clientHeight - 252;
            this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300;
        })()
      }
      this.searchParam()
    },
    watch: {
      dateTime(val) {
        val = val || [];
        this.formData.startTime = val[0] ? parseTime(val[0]) : '';
        this.formData.endTime = val[1] ? parseTime(val[1]) : '';
      },
    
    },
    methods:{
      exportExcel(){
        // const loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // });
        this.pageItems.pageSize = 9999;
        let searchParams = Object.assign(this.pageItems, this.formData);
        exportExcelApi(this.formData).then(response => {console.log('124')
          response.data.map((item, index) => {
              item.index = index * 1 + 1;
             })
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = [
            "序号", "生成时间", "账单号", "城市", "区域", "板块", "小区/公寓-房间", "房东", "房东手机号码",
            "账单名称", "最迟支付时间", "状态", "是否逾期","支付时间",
            "租客",
            "租客手机号码",
            "跟进次数",
            "最新跟进时间",
            "最新跟进人",
            "跟进结果",
            "城市管家",
            "城市管家手机号",
            "所在部门",
            "上级部门"
          ];
          const filterVal = [
            "index", "生成时间", "账单号", "城市", "区域", "板块", "小区/公寓-房间", "房东", "房东手机号码",
            "账单名称", "最迟支付时间", "状态", "是否逾期","支付时间",
            "租客",
            "租客手机号码",
            "跟进次数",
            "最新跟进时间",
            "最新跟进人",
            "跟进结果",
            "城市管家",
            "城市管家手机号",
            "所在部门",
            "上级部门"
          ];
          const data = this.formatJson(filterVal, response.data || [])
          export_json_to_excel(tHeader, data, new Date().getTime(), '催租信息表')
          
        })

        loading.close();
        this.$message({
            message: response.message,
            type: 'success'
         });
            // if(response.code == 0){
            //   let data = response.data.bytes
            //   var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
            // 　　var downloadElement = document.createElement('a');
            // 　　var href = window.URL.createObjectURL(blob); //创建下载的链接
            // 　　downloadElement.href = href;
            // 　　downloadElement.download = '列表.xlsx'; //下载后文件名
            // 　　document.body.appendChild(downloadElement);
            // 　　downloadElement.click(); //点击下载
            // 　　document.body.removeChild(downloadElement); //下载完成移除元素
            // 　　window.URL.revokeObjectURL(href); //释放掉blob对象 
            //  console.log(href)
            //   this.$message({
            //     message: response.message,
            //     type: 'success'
            //  });
            // }
        })
      },

        formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      })).catch(response => {
        
         loading.close();
        this.$message({
            message: response.message,
            type: 'error'
         });
      })
    },
      handleSizeChange(val) {
      this.pageItems.pageSize = val;
      this.searchParam();
     },
      handleCurrentChange(val) {
      this.pageItems.pageNo = val;
      this.searchParam();
     },
      searchGo(){
        this.searchParam()
      },
      clearForm(){
        this.formData=delObjectItem(this.formData)
        this.dateTime=[]
      },
      overDue(reason,type,id){
        this.dialogFormVisible=true
        this.$refs.rentingABill.open(this.dialogFormVisible,reason,type,id)
      },
      goFollow(id,billNo,isOver){  //跟进记录
        this.$refs.followUp.open(true,id,billNo,isOver)
      },
      searchParam(){   //搜索
        let searchParams = Object.assign(this.pageItems, this.formData);
        if(this.formData.startTime){
          getRentingListApi(searchParams).then(response => {
            this.tableData = response.data.content
            this.listLoading = false
            this.total = response.data.totalElements
          }).catch()
        }else{
          this.$message({
            message: '请选择时间段',
            type: 'success'
         });
        }
       },
    }
  }
</script>

<style scoped rel="stylesheet/scss">
 .overdueReason{
     cursor:pointer;
 }
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
 #pad-b{
     margin-bottom:10px;
 }
 .box-c{
     text-align: center;
 }
 .pad{
     display: inline-block;
     width:50px;
 }
.container{
    padding:20px;
}
  .model-search .filter-item {
  margin-left: 10px;
}
 .col-red{
     color: #f56c6c;
 }
 .choose{
     text-decoration:underline;
 }
 .cursor{
   cursor:pointer
 }

</style>



