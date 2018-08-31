 <!-- 催租跟进弹窗 -->
<template>
    <el-dialog title="催租跟进" :visible.sync="dialogTableVisible">
        <el-row>
            <el-button type="primary" @click="addFllow">新增催租结果</el-button>
            <el-button type="primary" @click="rentMessage">短信催租</el-button>
            <el-button type="primary" @click="managerMessage">管家提醒</el-button>
        </el-row>
        <el-dialog
        width="30%"
        title="新增催租结果"
        :visible.sync="innerVisible"
        append-to-body>
           <el-form :model="form" >
             <el-form-item label="催租结果" :label-width="formLabelWidth">
               <el-select v-model="form.resultType" placeholder="请选择催租结果">
                 <el-option v-for="Item in resultTypeList" :key="Item.value" :label="Item.label" :value="Item.value"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="备注"  :label-width="formLabelWidth" v-show="filterType(form.resultType)">
                <el-input v-model="form.content" :maxlength="100" type="textarea"
  :rows="2" placeholder="请输入备注（0-100字）"></el-input>
            </el-form-item>
           </el-form>
            <div slot="footer" class="dialog-footer">
               <el-button type="primary" @click="addFollowSubmit">确 定</el-button>
               <el-button @click="closeInner">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog
        width="30%"
        title="提醒模版"
        :visible.sync="innerWarn"
        append-to-body>
           <el-form >
                <el-form-item label="提醒模版" :label-width="formLabelWidth">
                <el-select v-model="messageType" placeholder="请选择提醒模版">
                    <el-option v-for="Item in messageTypeList" :label="Item.label" :value="Item.value" :key="Item.value"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="managerMessageSubmit">确 定</el-button>
                <el-button @click="innerWarn = false">关闭</el-button>
            </div>
        </el-dialog>
        <div class="all-text">
           <div class="table-container" v-if="gridData.length">
             <div class="box" v-for="Item in gridData" :key="Item.id">
               <div class="name-box">{{Item.gmtCreate}} {{Item.createStatus | filterCreat}}-{{Item.createName}}</div>
                <div class="name-box">{{Item.content}}</div>
             </div>
           </div>
           <div class="table-container" v-else>
             <div class="box">
                <div class="text-empty">暂无数据</div>
             </div>
           </div>
        </div>
       
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">关闭</el-button>
        </div>
     </el-dialog>
</template>
<script>
import { billFollowListApi , rentMessageApi , billFollowApi ,cityManagerMessageApi} from '@/api/renting'
import { delObjectItem}  from '@/utils'
export default {
    data(){
        return {
          status:null,
          gridData: [],
          dialogTableVisible: false,
          innerVisible: false,
          innerWarn: false,
          followId: {
              id:null,
              billNo:null
          },
          pageItems: {
           pageNo: 1,
           pageSize: 20
          },
          isOver:null,
          resultTypeList:[  //1-已退租 2-未缴纳 3-待确认结果真实性 4-未接听
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
          ],
          messageTypeList:[],
          messageType: null,
          messageTypes:[  //1-逾期账单催租提醒,2-租客账单交租提醒,3-租客已退房（账单已逾期）信息确认 4-租客已退房信息确认
              {
                value:1, 
                label:'逾期账单催租提醒'
              },{
                value:2, 
                label:'租客账单交租提醒'  
              },{
                value:3, 
                label:'租客已退房（账单已逾期）信息确认'  
              },{
                value:4, 
                label:'租客已退房信息确认'
              },{
                 value:5, 
                label:'线下交租确认信息'
              }
         ],
         messageTypeIs:[  //租客账单交租提醒、租客已退房信息确认  未逾期
             {
                value:2, 
                label:'租客账单交租提醒'  
              },{
                value:4, 
                label:'租客已退房信息确认'
              },{
                value:5, 
                label:'线下交租确认信息'
              }
         ],
         messageTypeOver:[  
            {
                value:1, 
                label:'逾期账单催租提醒'
              },{
                value:3, 
                label:'租客已退房（账单已逾期）信息确认'  
             },{
                value:5, 
                label:'线下交租确认信息'
              }
         ],
        form: {
          resultType: null,
          content: null,
        },
        messageType:null, //提醒模版
        formLabelWidth: '120px'
        }
    },
    mounted(){
     
    },
    beforeDestroy(){
      let dia=document.querySelectorAll('body>.el-dialog__wrapper')
        dia.forEach(element => {
            element.style.display  = "none";
        });
    },
    filters:{
     filterCreat(val){
       const list=['运营','飞虎队']
       return list[val-1]
     }
    },
    methods:{
      closeInner(){
        this.innerVisible=false
        delObjectItem(this.form)
      },
      filterType(type){
        if(type === 3){
         return true
        }
      },
      textStatus(){
        console.log(this.status)
        if(this.status == 3){
          this.$message({
             message: '账单已撤销，无法继续跟进.',
             type: 'error'
          });
          return false
        }else{
          return true
        }
      },
      rentMessage(){
        rentMessageApi(this.followId).then(response =>{
           if(response.code == 0){
             this.getfollowList()
             this.$message({
                message: response.message,
                type: 'success'
             });
           }
        })
      },
      getfollowList(){
       let params=Object.assign(this.pageItems,this.followId)
       billFollowListApi(params).then(response => {
           this.gridData = response.data.content

       })
      },
      addFllow(){  //新增催租记录
        if(this.textStatus()){
          this.innerVisible = true
        }
      },
      addFollowSubmit(){
        if(!this.form.resultType){
          this.$message({
                message: '请选择催租结果',
                type: 'success'
             });
             return false
        }
        if(this.form.resultType != 3&&this.form.resultType != null&&this.form.resultType != ''){
             this.form.content=this.resultTypeList[this.form.resultType-1].label
             this.addfun()
        }else{

          if(this.form.content===''||this.form.content===null){
            this.$message({
                message: '请填写催租结果的备注',
                type: 'success'
             });
          }else{
            this.addfun()
          }
           
        }
       
        
      },
      addfun(){
         let params=Object.assign(this.followId,this.form)
            
          billFollowApi(params).then(response => {
            this.innerVisible=false
            this.getfollowList()
            this.$emit("searchStart")
            delObjectItem(this.form)
          })
      },
      managerMessageSubmit(){
       
        if(this.messageType){
          this. messageSubmit()
        }else{
            this.$message.error('请选择提醒模版');
        }
      },
      messageSubmit(){
        let dataItem = {
          isOver : this.isOver,
          messageType: this.messageType
        }
        let params = Object.assign(dataItem,this.followId)
          cityManagerMessageApi(params).then(response =>{
            if(response.code == 0){
              this.getfollowList()
              this.$message({
                  message: response.message,
                  type: 'success'
              });
              this.innerWarn=false

            }
          })
      },
      managerMessage(){
        if(this.textStatus()){
          this.innerWarn = true
          if(this.isOver == true){
            this.messageTypeList = this.messageTypeOver   //以逾期
          }else if(this.isOver == false){
            this.messageTypeList = this.messageTypeIs   
          }else{
            this.messageTypeList = messageTypes
          }
        }
        
        
      },
      open(type,id,billNo,isOver,status){
        this.dialogTableVisible = true
        this.followId.id = id
        this.followId.billNo = billNo
        this.isOver = isOver
        this.status = status
        this.getfollowList()
      }
      
 }
}
</script>
<style >
  .table-container{
      width:100%;
      margin-top:20px;
  }
  .box{
    min-height: 68px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  .text-empty{
      line-height: 60px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
  }
</style>
