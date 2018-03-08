<template>
    <div class="app-container">
        <div class="model-search clearfix">
           <el-form size="small" :inline="true" :model="formData">
                <el-date-picker
                    v-model="dateTime"
                    size="small"
                    id="bolin"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width:360px">
                </el-date-picker>
                <el-select size="small" style="width:130px" v-model="formData.type" placeholder="电子签章模块" class="item-select filter-item"
                    clearable>
                    <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select size="small" style="width:120px" v-model="formData.status" placeholder="审核状态" class="filter-item item-select" 
                    clearable>
                    <el-option
                        v-for="item in auditOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input size="small" v-model="formData.name" placeholder="输入组织名称查询" class="filter-item" 
                    style="width:180px;"
                    @keydown.native.enter="searchParam">    
                </el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
                <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
            </el-form>
        </div>
        <div class="model-table" :style="tableStyle">
            <el-table 
                :data="tableData" 
                v-loading.body="listLoading" 
                :max-height="tableHeight" 
                size="small"
                fit stripe highlight-current-row>
                <el-table-column type="index" width="60" align="center">

                </el-table-column>
                <el-table-column v-for="(item,index) in colModels"
                    :label="item.label" 
                    :width="item.width"
                    key="index"
                    fit
                    :show-overflow-tooltip="!item.toolTip">
                    <template slot-scope="scope">
                        <el-popover v-if="item.type === 'status' && scope.row[item.prop] == 3" trigger="hover" placement="top">
                            <p>不通过原因: {{ scope.row.rejectRemark }}</p>
                            <div slot="reference">
                                <el-tag :type="scope.row[item.prop] | statusFilter">
                                    {{scope.row[item.prop] | statusStrFilter}}
                                </el-tag>
                            </div>
                        </el-popover>
                        <el-tag 
                            v-else-if="item.type === 'status'" 
                            :type="scope.row[item.prop] | statusFilter">
                            {{scope.row[item.prop] | statusStrFilter}}
                        </el-tag>
                        <span v-else-if="item.type === 'formatType'">
                            {{(scope.row[item.prop]) | typeFilter}}
                        </span>
                        <span v-else-if="item.type === 'formatTime'">
                            {{scope.row[item.prop] | formatTime(scope.row)}}
                        </span>
                        <span v-else>
                            {{scope.row[item.prop]}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-view" size="small" @click.native="showDetail(scope.$index,scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="model-pagination">
            <el-pagination 
                background
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page.sync="pageItems.pageNo"
                :page-sizes="pageSizeList" 
                :page-size="pageItems.pageSize" 
                layout="total, sizes, prev, pager, next, jumper" 
                :total="total">
            </el-pagination>
        </div>
        <div class="dialog-info">
            <el-dialog :model="data_detail"
                :title="data_detail.type | typeFilter" 
                :visible.sync="layer_showInfo" 
                :width="data_detail.type | widthFilter"
                @close="dialogClose">
                <person-sign v-if="data_detail.type == 3" 
                    :data-sign="data_detail" 
                    ref="signOfRef">
                </person-sign>
                <compony-sign v-else-if="data_detail.type == 2" 
                    :data-sign="data_detail" 
                    ref="signOfRef">    
                </compony-sign>
                <personto-compony-sign v-else 
                    :data-sign="data_detail" 
                    ref="signOfRef">
                </personto-compony-sign>
                <div slot="footer" class="dialog-footer">
                    <el-button v-if="data_detail.status == 1" @click="layer_showInfo = false" size="small">取 消</el-button>
                    <el-button v-else @click="layer_showInfo = false" size="small">关闭</el-button>
                    <el-button v-if="data_detail.status == 1" type="primary" size="small" @click.native="saveAuditResult">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import waves from '@/directive/waves'
import personSign from './components/personSign'
import componySign from './components/componySign'
import persontoComponySign from './components/persontoComponySign'
import { parseTime, ObjectMap, deepClone, plusXing } from '@/utils'
import { signaturesHandleApi, signaturesListsApi } from '@/api/auditCenter'

export default {
    name: 'auditSignatures',
    directives: {
        waves
    },
    components:{
        personSign,
        componySign,
        persontoComponySign
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
        },
        typeFilter(type){
            const typeData = ['个人升级企业','企业电子签章','个人电子签章'];
            return typeData[type - 1] || '个人电子签章'
        },
        widthFilter(type){
            const dialogWidth =  ['700px', '700px', '510px'];
            return dialogWidth[type - 1] || '800px'
        },
        formatTime(val,item){
            if (item.status == 1) {
                return '';
            }
            return `${parseTime(val)} ${item.operator}`
        }
    },
    data() {
        return {
            typeOptions: [
                {value: 3, label: '个人电子签章'},
                {value: 2, label: '企业电子签章'},
                {value: 1, label: '个人升级企业'}
            ],
            auditOptions: [
                {value: 1, label: '未审核'},
                {value: 3, label: '审核不通过'},
                {value: 2, label: '审核通过'}
            ],
            formData:{
                name: '',
                type: '',
                status: '',
                startDate: '',
                endDate: ''
            },
            currentIndex: 0,
            searchParams: {},
            saveAuditParam: {},
            dateTime: [],
            colModels:[
                { prop:'id', label: '审核号', width: 80},
                { prop:'gmtCreate', label: '申请时间', width: 180},
                { prop:'organizationName', label: '申请组织'},
                { prop:'type', label: '模块',  width: 100, type: 'formatType'},
                { prop:'status', label: '审核状态', width: 150, type:'status'},
                { prop:'gmtModified', label: '审核时间', width: 140, type: 'formatTime', toolTip: true}
            ],
            tableHeight: 300,
            tableData: [],
            total: null,
            pageItems: {
                pageNo: 1,
                pageSize: 20,
            },
            pageSizeList: [10, 20, 30, 50],
            listLoading: true,
            data_detail: {
                
            },
            layer_showInfo: false
        }
    },
    created() {
        this.getGridData(this.pageItems)
    },
    mounted() {
        /* 表格高度控制 */
        let temp_height = document.body.clientHeight - 200;
        this.tableHeight = temp_height > 400 ? temp_height : 400;
        window.onresize = () => {
            return (() => {
                temp_height = document.body.clientHeight - 200;
                this.tableHeight = this.tableHeight = temp_height > 400 ? temp_height : 400;
            })()
        }
    },
    computed: {
        tableStyle: function () {
            return {
                width: '100%',
                height: this.tableHeight + 'px'
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageItems.pageSize = val;
            this.getGridData(this.pageItems);
        },
        handleCurrentChange(val) {
            this.pageItems.pageNo = val;
            this.getGridData(this.pageItems);
        },
        getGridData(params) {
            this.listLoading = true;
            this.searchParams = Object.assign(deepClone(params), deepClone(this.formData));
            signaturesListsApi(ObjectMap(this.searchParams)).then(response => {
                this.tableData = response.data.content;
                this.total = response.data.totalElements;
                this.listLoading = false;
            })
        },
        /* 查询 */
        searchParam(){
            this.getGridData(this.pageItems);
        },
        clearForm(){
            this.formData = {
                name: '',
                type: '',
                status: '',
                startDate: '',
                endDate: ''
            };
            this.dateTime = [];
            this.pageItems = {
                pageNo: 1,
                pageSize: 20
            };
            this.searchParam();
        },
        showDetail(index,row){
            this.data_detail = deepClone(row);
            this.data_detail.principalIdCard = plusXing(this.data_detail.principalIdCard, 6, 4);
            let picList = (this.data_detail.licensePicUrls || this.data_detail.electronicSealUrl).split(',') || [];
            this.data_detail.picList = picList.map((item) => {
                return ({src: item, w: 800, h: 600})
            });
            this.currentIndex = index;
            this.layer_showInfo = true;
        },
        dialogClose(){
            this.data_detail = {};
        },
        saveAuditResult(){
            this.saveAuditParam.status = this.$refs.signOfRef.status
            this.saveAuditParam.reject_remark = this.$refs.signOfRef.reject_remark
            if (!this.saveAuditParam.status) {
                this.$message.error('请选择审核结果');
                return false;
            }
            if (this.saveAuditParam.status == 3 && !this.saveAuditParam.reject_remark) {
                this.$message.error('请输入审核不通过原因');
                return false;
            }
            signaturesHandleApi(ObjectMap({
                auditId: this.data_detail.id,
                status: this.saveAuditParam.status,
                reject_remark: this.saveAuditParam.reject_remark
            })).then(response => {
                this.layer_showInfo = false;
                this.getGridData(this.pageItems);
                this.$notify({
                    title: '成功',
                    message: '操作成功',
                    type: 'success',
                    duration: 2000
                })
            })
        }
    },
    watch:{
        dateTime(val){
            val = val || [];
            this.formData.startDate = val[0] ? parseTime(val[0]) : '';
            this.formData.endDate = val[1] ? parseTime(val[1]) : '';
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    .model-search .filter-item{
        margin-left: 10px;
    }
    .item-select{
        width: 150px;
    }
    .el-popover{
        max-width: 500px;
    }
</style>


