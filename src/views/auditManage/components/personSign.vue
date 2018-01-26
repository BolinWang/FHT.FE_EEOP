<template>
	<el-form size="small" label-position="right" label-width="80px">
        <div class="clearfix">
            <el-col :span="10">
                <el-form-item label="姓名">
                    <el-input v-model="data_detail.principal" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="13">
                <el-form-item label="身份证">
                    <el-input v-model="data_detail.principalIdCard" :disabled="true">
                    </el-input>
                </el-form-item>
            </el-col>
        </div>
        <el-form-item label="电子签名">
            <Preview :pic-list="data_detail.picList"></Preview>
        </el-form-item>
        <el-form-item label="审核结果">
            <el-radio-group v-if="data_detail.status == 1" v-model="status">
                <el-radio :label="2">通过</el-radio>
                <el-radio :label="3">不通过</el-radio>
            </el-radio-group>
            <el-tag v-else :type="data_detail.status | statusFilter">
                {{data_detail.status | statusStrFilter}}
            </el-tag>
            <el-input v-if="data_detail.status == 3" style="display: inline-block; width:295px;" v-model="data_detail.rejectRemark" :disabled="true">
            </el-input>
            <el-input style="display: inline-block; width:295px;" v-if="status == 3" placeholder="请输入审核不通过原因" v-model="data_detail.rejectRemark">
            </el-input>
        </el-form-item>
    </el-form>
</template>
<script>
import Preview from '@/components/Preview'

export default {
    name: 'personSign',
    props: {
	    dataSign: {
            type: Object,
            default: function(){
                return {}
            }
        },
	},
    filters: {
        statusFilter(status){
            const statusMap = {
                '1': 'info',
                '2': 'success',
                '3': 'danger'
            }
            return statusMap[status] || 'info'
        },
        statusStrFilter(status){
            const statusStrData = ['待审核','审核通过','审核不通过'];
            return statusStrData[status - 1] || '待审核'
        }
    },
    components:{
        Preview
    },
    data() {
        return {
            data_detail: {},
            status: ''
        }
    },
    created(){
        this.data_detail = this.dataSign;
    },
    mounted() {
        
    },
    methods: {
    
    },
    watch:{
        dataSign:{
            handler(val){
                this.data_detail = val;
                this.$emit('handleEmit',{
                    reject_remark: val.rejectRemark,
                    status: this.status
                });
            },
            deep:true
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
	.el-tag {
        margin: 0 5px 5px 0;
    }
</style>
