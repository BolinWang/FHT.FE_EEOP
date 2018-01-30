<template>
    <div class="app-container">
        <el-container>
            <el-aside width="240px">
                <div class="model-search">
                    <div class="clearfix" style="margin-bottom: 10px;">
                        <el-button size="small" class="left" type="primary" icon="el-icon-search" v-waves @click.native="handleSearchParams">查询</el-button>
                        <el-button size="small" class="left" icon="el-icon-remove-outline" @click.native="handleReset">清空</el-button>
                        <el-button size="small" class="left" type="primary" icon="el-icon-upload" v-waves @click.native="handleExport">导出</el-button>
                    </div>
                    <el-date-picker
                        :clearable="clearable"
                        v-model="dateTime"
                        size="small"
                        style="margin-bottom: 10px;width: 100%;"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-input
                        type="textarea"
                        :style="textareaHeight"
                        style="margin-bottom: 10px;"
                        placeholder="请输入手机号码或组织名称，多个请换行查询"
                        v-model="textareaVal">
                    </el-input>
                </div>
            </el-aside>
            <el-main style="padding: 0; padding-left: 15px;">
                <div class="model-table" :style="tableStyle" style="margin-top: 0;">
                    <el-table 
                        :data="tableData" 
                        v-loading.body="listLoading" 
                        :max-height="tableHeight" 
                        size="small"
                        fit stripe highlight-current-row>
                        <el-table-column type="index" width="60" align="center"></el-table-column>
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" size="small" inline class="table-expand">
                                    <el-form-item v-for="(item,index) in expandCols"
                                        :label="item.label"
                                        key="index">
                                        <span>{{ props.row[item.prop] }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column v-for="(item,index) in colModels"
                            :label="item.label" 
                            :width="item.width"
                            key="index"
                            fit
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="item.type == `formatAdmin`">
                                    {{scope.row[item.prop] | formatAdminFilter}}
                                </span>
                                <span v-else>
                                    {{scope.row[item.prop]}}
                                </span>
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
            </el-main>
        </el-container>
    </div>
</template>
<script>
import waves from '@/directive/waves'
import { parseTime, ObjectMap, deepClone } from '@/utils'
import { marketOrgHouseReportListApi } from '@/api/houseManage'

export default {
    name: 'dataReport',
    directives: {
        waves
    },
    data() {
        return {
            downloadLoading: false,
            colModels:[
                { prop:'orgGmtCreateStr', label: '创建时间', width: 180},
                { prop:'organizationName', label: '组织名称'},
                { prop:'displayName', label: '组织缩写名'},
                { prop:'orgTypeName', label: '组织类型'},
                { prop:'orgContactMobile', label: '手机号码', width: 150},
                { prop:'orgLegalPersonName', label: '法人姓名'}
            ],
            expandCols: [
                { prop:'estateCount', label: '公寓数量'},
                { prop:'houseCount', label: '分散式套数(非金融)'},
                { prop:'financehouseCount', label: '分散式套数(金融)'},
                { prop:'estateRoomCount', label: '公寓房间数'},
                { prop:'houseRoomCount', label: '分散式房间数(非金融)'},
                { prop:'financeRoomCount', label: '分散式房间数(金融)'}
            ],
            tableHeight: 300,
            listLoading: false,
            tableData: [],
            total: null,
            pageItems: {
                pageNo: 1,
                pageSize: 20
            },
            pageSizeList: [10, 20, 30, 50],
            clearable: false,
            dateTime: [],
            formData: {
                orgNames: '',
                startDate: '',
                endDate: ''
            },
            textareaVal: ''
        }
    },
    created(){
        this.getGridData(this.pageItems);
    },
    mounted() {
        /* 表格高度控制 */
        let temp_height = document.body.clientHeight - 152;
        this.tableHeight = temp_height > 300 ? temp_height : 300;
        window.onresize = () => {
            return (() => {
                temp_height = document.body.clientHeight - 152;
                this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300;
            })()
        }
    },
    computed: {
        tableStyle: function () {
            return {
                width: '100%',
                height: this.tableHeight + 'px'
            }
        },
        textareaHeight(){
            return {
                height: this.tableHeight - 40 + 'px'
            }
        }
    },
    methods: {
        /* 查询列表 */
        handleSizeChange(val) {
            this.pageItems.pageSize = val;
            this.getGridData(this.pageItems);
        },
        handleCurrentChange(val) {
            this.pageItems.pageNo = val;
            this.getGridData(this.pageItems);
        },
        handleReset(){
            this.dateTime = []; 
            this.textareaVal = ''; 
            this.formData = {}; 
            this.getGridData(this.pageItems);
        },
        /* 导出 */
        handleExport() {
            this.downloadLoading = true
            this.searchParams = Object.assign({
                pageNo: 1,
                pageSize: 999999,
            }, this.formData);
            marketOrgHouseReportListApi(ObjectMap(this.searchParams)).then(response => {
                response.data.list.map((item,index) => {
                    item.index = index * 1 + 1; 
                })
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/vendor/Export2Excel')
                    const tHeader = [
                        "序号", "创建日期", "组织名称", "组织缩写名", "组织类型", "手机号码", "法人姓名","公寓数", "公寓房间数", 
                        "分散式套数（非金融）", "分散式间数（非金融）","分散式套数（金融）", "分散式间数 (金融）" ];
                    const filterVal = [
                        'index', 'orgGmtCreateStr', 'organizationName', 'displayName', 'orgTypeName', 
                        'orgContactMobile', 'orgLegalPersonName', 'estateCount', 'estateRoomCount', 'houseCount', 
                        'houseRoomCount', 'financehouseCount', 'financeRoomCount'
                    ];
                    const data = this.formatJson(filterVal, response.data.list || [])
                    export_json_to_excel(tHeader, data, new Date().getTime(), '组织房源信息表')
                    this.downloadLoading = false
                })
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                return v[j]
            }))
        },
        handleSearchParams(){
            this.getGridData(this.pageItems);
        },
        /* 列表渲染，数据请求 */
        getGridData(params) {
            this.listLoading = true;
            this.searchParams = Object.assign(deepClone(params),this.formData);
            marketOrgHouseReportListApi(ObjectMap(this.searchParams)).then(response => {
                this.tableData = response.data.list;
                this.total = response.data.record;
                this.listLoading = false;
            })
        }
    },
    watch:{
        dateTime(val){
            val = val || [];
            this.formData.startDate = val[0] ? parseTime(val[0]) : '';
            this.formData.endDate = val[1] ? parseTime(val[1]) : '';
        },
        textareaVal(val){
            if (val != '') {
                this.formData.orgNames = val.split(/[\n|\r\n|\r]/gi).join(',');
            }
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    .el-textarea textarea{
        height: 100%;
    }
    .table-expand {
        font-size: 0;
        .el-form-item__content{
            font-size: 12px;
        }
        .el-form-item__label{
            font-size: 12px;
        }
    }
    .table-expand label {
        color: #99a9bf;
    }
    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 33%;
    }
</style>


