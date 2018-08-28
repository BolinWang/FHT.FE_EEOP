<template>
    <el-dialog title="逾期原因" :visible.sync="dialogFormVisible">
        <el-form :model="from" >
            <el-form-item label="逾期类别" :label-width="formLabelWidth">
            <el-select v-model="from.overdueType" placeholder="请选择逾期类别" @change = "changeType">
                <el-option :key="Item.value" v-for="Item in overdueTypeList" :label='Item.label' :value="Item.value"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="逾期原因"  :label-width="formLabelWidth" v-show="filStatus(from.overdueType)">
              <el-input v-model="from.overdueReason" :maxlength="100" type="textarea"
  :rows="2" placeholder="请输入备注（0-100字）"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { leaseBillApi } from '@/api/renting'
import { delObjectItem,ObjectMap}  from '@/utils'
export default {
    data(){
        return {
        overdueTypeList:[{    //逾期类型  0-已退租(原因),1-线上交租,2-个人原因,3-其他
            value:0,
            label: '已退租'
        },{    //逾期类型  0-已退租(原因),1-线上交租,2-个人原因,3-其他
            value:1,
            label: '线上交租'
        },{    //逾期类型  0-已退租(原因),1-线上交租,2-个人原因,3-其他
            value:2,
            label: '个人原因'
        },{    //逾期类型  0-已退租(原因),1-线上交租,2-个人原因,3-其他
            value:3,
            label: '其他'
        }],
        dialogFormVisible:false,
        from: {
          overdueType:null,
          overdueReason:null,
          id:null
        },
        orderType:'',
        orderReason:'',
        formLabelWidth: '120px'
        }
    },
    methods:{
      changeType(){
        this.from.overdueType==this.orderType?this.from.overdueReason=this.orderReason:this.from.overdueReason=''
      },
      closeDialog(){
        this.dialogFormVisible = false
        delObjectItem(this.from)
      },
      submit(){
          
        let params=ObjectMap(this.from)
        if(this.from.overdueType==''||this.from.overdueType==null||this.from.overdueType==undefined){
            this.$message({
                message: '请选择逾期类别',
                type: 'success'
             });
            return false;
        }
        if(this.from.overdueType!=1&&params.overdueReason==undefined){
            this.$message({
                message: '请填写逾期原因',
                type: 'success'
             });
          }else{
        let that=this
        leaseBillApi(params).then(response => {
          that.$emit('searchCallback')
          this.dialogFormVisible = false
          delObjectItem(this.from)
        }).catch()
        }
      },
      open(dialogFormVisible,reason,type,id){
        this.dialogFormVisible = true
        this.from.overdueType = type
        this.orderType=type
        this.from.overdueReason = reason
        this.orderReason=reason
        this.from.id = id
       },
       filStatus(val){
        let b = val == 1 ? false: true
        return b
      }
    }
}
</script>
<style scoped>

</style>
