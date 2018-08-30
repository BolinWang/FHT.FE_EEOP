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
                            prop="roomAddress">
                            </el-table-column>
                            <el-table-column
                            label="生成时间"
                            prop="gmtCreate">
                            </el-table-column>
                            <el-table-column
                            label="账单名称"
                            prop="billName">
                            </el-table-column>
                            <el-table-column
                            label="账单金额"
                            prop="billFee">
                            </el-table-column>
                             <el-table-column
                            label="最迟支付时间"
                            prop="deadlineDate">
                            </el-table-column>
                            <el-table-column
                            label="状态">
                              <template slot-scope="scope">
                                    <span :class="[scope.row.status==1?'stypeInfo':'',scope.row.status==2?'stypeInfos':'']">{{scope.row.status | filStatus}}</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                            min-width='100px'
                            label="是否逾期">
                               <template slot-scope="scope">
                                  <div>
                                      <span v-if='scope.row.isOver===false'>尚未逾期</span>
                                      <span v-else-if='scope.row.isOver===true'>已逾期<span class="col-red">{{scope.row.overDays}}</span>天</span>
                                      <span v-else>-</span>  
                                  </div>
                               </template>
                            </el-table-column>
                              <el-table-column
                              label="逾期原因"
                              >
                                <template slot-scope="scope">
                                    <div class="overdueReason" @click="overDue(scope.row.overdueReason,scope.row.overdueType,scope.row.id,scope.row.isOver)">
                                       <span v-if="filterOver(scope.row.overdueType)">
                                         <el-popover
                                          placement="top-start"
                                          title="原因"
                                          width="200"
                                          trigger="hover"
                                          :content="scope.row.overdueReason">
                                           <span slot="reference" >{{scope.row.overdueType | filoverdueType}}</span>
                                        </el-popover>
                                       </span> 
                                       <span v-else-if="scope.row.overdueType==1">{{scope.row.overdueType | filoverdueType}}</span>
                                       <span v-else-if='scope.row.isOver===true' class="choose">请选择</span>
                                        <span v-else-if='scope.row.isOver===false'>-</span>
                                    </div>
                                </template>
                            </el-table-column>
                              <el-table-column
                            label="手机号码/租客">
                              <template slot-scope="scope">
                                  {{scope.row.customerName}}/{{scope.row.customerMobile}}
                              </template>
                            </el-table-column>
                             <el-table-column
                             min-width="170"
                            label="催租跟进">
                              <template slot-scope="scope">
                                  <span class="col-red pad cursor" @click="goFollow(scope.row.id,scope.row.billNo,scope.row.isOver,scope.row.status)">{{scope.row.followCount
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
import { parseTime ,delObjectItem,ObjectMap}  from '@/utils'
import { getRentingListApi ,exportExcelApi} from '@/api/renting'
import { getSessionId } from '@/utils/auth'
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
           label: '未交租'
        },{    //订单状态
           value: 1,
           label: '线上已交租'
        },{    //订单状态
           value: 2,
           label: '线下已交租'
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
       this.dateTime=[this.formData.startTime,this.formData.endTime]
   },
    filters: {
      filterBtn(val){
         const resultTypeList = [  //1-已退租 2-未缴纳 3-待确认结果真实性 4-未接听
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
        return resultTypeList[val-1]?resultTypeList[val-1].label:''
      },
      filStatus(val){
        const valStatus=['未交租','线上已交租','线下已交租','已撤销']
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
      filterOver(type){
        if(type==1||type==null){
          return false
        }else{
          return true
        }
      },
      exportExcel(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
          this.formData.sessionId= getSessionId()
          let data = this.formData
            console.log(data)
          const  form = document.createElement('form');
          form.id = 'formExcel'
          form.name = 'forms'
          form.enctype = "application/json"
          document.body.appendChild(form);

          for(let obj in data) {
            if(data.hasOwnProperty(obj)) {
            const input = document.createElement('input');
            input.type='hidden';
            input.name = obj;
            input.value = data[obj];
            form.appendChild(input)
            }
          }
          console.log(form)

          form.method = "post";//请求方式
          form.action = process.env.BASE_API+'/flying/leaseBill/exportExcel';
          form.submit();
          const child=document.getElementById("formExcel");
          document.body.removeChild(form);
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loading.close();
          }); 
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
      overDue(reason,type,id,isOver){
        if(isOver===true){
        this.dialogFormVisible=true
        this.$refs.rentingABill.open(this.dialogFormVisible,reason,type,id)
        }
      },
      goFollow(id,billNo,isOver,status){  //跟进记录
        this.$refs.followUp.open(true,id,billNo,isOver,status)
      },
      searchParam(){   //搜索
        let searchParams = Object.assign(this.pageItems, this.formData);
         
        // if(!this.formData.startTime){
        //   this.$message({
        //     message: '时间区间为必选字段,请选择你要查询的时间段，点击再次查询',
        //     type: 'error'
        //  });
          
        // }else 
        if(!this.formData.cityId){
           this.$message({
            message: '城市为必选字段,请选择你要查询的城市后，点击再次查询',
            type: 'error'
           });
        }else{
         getRentingListApi(ObjectMap(searchParams)).then(response => {
            this.tableData = response.data.content
            this.listLoading = false
            this.total = response.data.totalElements
          }).catch()
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
 .stypeInfo{
   color: #409eff;
 }
 .stypeInfos{
   color: #67c23a;
 }
 
</style>



