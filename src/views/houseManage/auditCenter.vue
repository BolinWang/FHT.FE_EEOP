<template>
    <div class="app-container">
        <div class="model-search clearfix">
           <el-form size="small" :inline="true" :model="formData">
                <el-select size="small" v-model="formData.type" placeholder="电子签章模块" class="item-select" 
                    clearable
                    @change="changeSelect(`type`)"
                    @clear="clearSelect(`type`)">
                    <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select size="small" v-model="formData.auditStatus" placeholder="审核状态" class="filter-item item-select" 
                    clearable
                    @change="changeSelect(`auditStatus`)"
                    @clear="clearSelect(`auditStatus`)">
                    <el-option
                        v-for="item in auditOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input size="small" v-model="formData.organization" placeholder="输入组织名称查询" class="filter-item" 
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
                    show-overflow-tooltip 
                    sortable>
                    <template slot-scope="scope">
                        <el-tag 
                            v-if="item.type === 'status'" 
                            :type="scope.row[item.prop] | statusFilter">
                            {{scope.row[item.prop] | statusStrFilter}}
                        </el-tag>
                        <span v-else-if="item.type === 'formatTime'">
                            <i v-if="scope.row[item.prop] && scope.row[item.prop] != ''" class="el-icon-time"></i>
                            {{(scope.row[item.prop] || '') | parseTime()}}
                        </span>
                        <span v-else-if="item.type === 'formatType'">
                            {{(scope.row[item.prop] || '') | typeFilter}}
                        </span>
                        <span v-else>
                            {{scope.row[item.prop]}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="62">
                    <template slot-scope="scope">
                        <el-tooltip effect="dark" content="查看详情" placement="bottom">
                            <el-button type="primary" icon="el-icon-warning" size="small" @click.native="showDetail(scope.row)"></el-button>
                        </el-tooltip>
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
                :page-sizes="pageItems.pageSizeList" 
                :page-size="pageItems.pageSize" 
                layout="total, sizes, prev, pager, next, jumper" 
                :total="total">
            </el-pagination>
        </div>
        <el-dialog :model="data_detail" title="个人电子签章" :visible.sync="showDetail_2" width="600px">
            <el-form size="small" label-position="right" label-width="80px" style='width: auto;'>
                <div class="clearfix">
                    <el-col :span="10">
                        <el-form-item label="姓名">
                            <el-input v-model="data_detail.name" :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">&nbsp;</el-col>
                    <el-col :span="13">
                        <el-form-item label="身份证">
                            <el-input v-model="data_detail.cardNo" :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </div>
                <el-form-item label="电子签名">
                    <Preview :pic-list="data_detail.picList"></Preview>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDetail_2 = false" size="small">取 消</el-button>
                <el-button type="primary" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import fetch from '@/utils/fetch';
import waves from '@/directive/waves' // 水波纹指令
import Preview from '@/components/Preview'

export default {
    name: 'queryCenter',
    directives: {
        waves
    },
    components:{
        Preview
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
            return typeData[type - 1] || '个人升级企业'
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
                organization: '',
                type: '',
                auditStatus: ''
            },
            colModels:[
                { prop:'id', label: '审核号', width: 80},
                { prop:'gmtCreate', label: '申请时间', width: 180, type: 'formatTime'},
                { prop:'organizationName', label: '申请组织'},
                { prop:'typeStr', label: '模块',  width: 100, type: 'formatType'},
                { prop:'reviewStatus', label: '审核状态', width: 150, type:'status'},
                { prop:'auditAbout', label: '审核时间', width: 180, type:'formatType'}
            ],
            tableHeight: 300,
            tableData: [],
            total: null,
            pageItems: {
                pageNo: 1,
                pageSize: 20,
                pageSizeList: [10, 20, 30, 50]
            },
            listLoading: true,
            data_detail:{
                picList: [{
                    src: 'https://placekitten.com/600/400'
                }, {
                    src: 'https://placekitten.com/1200/900'
                }]
            },
            showDetail_1: false,
            showDetail_2: false,
            showDetail_3: false
        }
    },
    created() {
        this.getGridData()
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
        /* 分页 */
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        getGridData(value) {
            this.listLoading = true;
            fetch({
                url: '/table/list',
                method: 'get',
                params: {
                    status:value
                }
            }).then(response => {
                this.tableData = response.data.items;
                this.total = this.tableData.length;
                this.tableData.forEach(function(item,index){
                    item.picUrl = 'http://imgtest.memorhome.com/20171128114234448591';
                    item.linkUrl = 'http://www.mdguanjia.com/waptest/activePages/inviteModule/index.html';
                    item.effectiveTime = 1512027461000;
                });
                this.listLoading = false;
            })
        },
        /* 查询 */
        searchParam(){
            console.log(this.formData);
        },
        /* 查询列表 */
        change(value) {
           
        },
        clearForm(){
            this.formData = {
                organization: '',
                type: null,
                auditStatus: null
            }
        },
        changeSelect(val){
            console.log(val)
        },
        clearSelect(val){
            console.log(val)
        },
        showDetail(row){
            this.showDetail_2 = true;
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
</style>


