<template>
    <div class="app-container">
        <el-container>
            <el-aside width="240px">
                <div class="model-search">
                    <div class="clearfix" style="margin-bottom: 10px;">
                        <el-button size="small" class="left" type="primary" icon="el-icon-search" v-waves @click.native="handleSearchParams">查询</el-button>
                        <el-button size="small" class="left" icon="el-icon-remove-outline" @click.native="handleReset">清空</el-button>
                        <el-button size="small" class="left" type="primary" icon="el-icon-upload" v-waves @click.native="">导出</el-button>
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
                                        :label="item.label">
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
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, ObjectMap, deepClone } from '@/utils'

export default {
    name: 'dataReport',
    directives: {
        waves
    },
    data() {
        return {
            colModels:[
                { prop:'orgGmtCreate', label: '创建时间', width: 180},
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
        this.tableHeight = temp_height > 400 ? temp_height : 400;
        window.onresize = () => {
            return (() => {
                temp_height = document.body.clientHeight - 152;
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
        },
        textareaHeight(){
            return {
                height: this.tableHeight - 40 + 'px'
            }
        }
    },
    methods: {
        /* 查询列表 */
        change(value) {
            this.getGridData(this.pageItems);
        },
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
        handleSearchParams(){
            this.getGridData(this.pageItems);
        },
        /* 列表渲染，数据请求 */
        getGridData(params) {
            this.listLoading = true;
            this.searchParams = deepClone(params);
            
            this.tableData = [{ "organizationId": 1, "organizationName": "杭州复恒科技有限公司", "displayName": "复恒", "orgLegalPersonName": null, "orgContactMobile": "18867118214", "orgType": 1, "orgTypeName": "系统", "orgGmtCreate": 1483200000000, "orgGmtCreateStr": "2017-01-01 00:00:00", "estateCount": 1, "estateRoomCount": 24, "houseCount": 2, "houseRoomCount": 3, "financehouseCount": 2, "financeRoomCount": 2 }, { "organizationId": 2, "organizationName": "浙江麦家商业管理有限公司", "displayName": "麦家", "orgLegalPersonName": "曾添", "orgContactMobile": "18758160967", "orgType": 2, "orgTypeName": "公司企业", "orgGmtCreate": 1483200000000, "orgGmtCreateStr": "2017-01-01 00:00:00", "estateCount": 169, "estateRoomCount": 14102, "houseCount": 167, "houseRoomCount": 317, "financehouseCount": 61, "financeRoomCount": 98 }, { "organizationId": 3, "organizationName": "磐谷分期", "displayName": "磐谷", "orgLegalPersonName": "王飞飞", "orgContactMobile": "18870447515", "orgType": 2, "orgTypeName": "公司企业", "orgGmtCreate": 1483200000000, "orgGmtCreateStr": "2017-01-01 00:00:00", "estateCount": 0, "estateRoomCount": 0, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 3, "organizationName": "磐谷分期", "displayName": "磐谷", "orgLegalPersonName": "王飞飞", "orgContactMobile": "18262297881", "orgType": 2, "orgTypeName": "公司企业", "orgGmtCreate": 1483200000000, "orgGmtCreateStr": "2017-01-01 00:00:00", "estateCount": 0, "estateRoomCount": 0, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 4, "organizationName": "成都有家商业管理有限公司", "displayName": "成都有家", "orgLegalPersonName": "王飞飞", "orgContactMobile": "18262297911", "orgType": 2, "orgTypeName": "公司企业", "orgGmtCreate": 1483200000000, "orgGmtCreateStr": "2017-01-01 00:00:00", "estateCount": 6, "estateRoomCount": 83, "houseCount": 7, "houseRoomCount": 17, "financehouseCount": 9, "financeRoomCount": 16 }, { "organizationId": 31, "organizationName": "满城", "displayName": "满城", "orgLegalPersonName": "付尖兵", "orgContactMobile": "18158714466", "orgType": 2, "orgTypeName": "公司企业", "orgGmtCreate": 1491815421000, "orgGmtCreateStr": "2017-04-10 17:10:21", "estateCount": 1, "estateRoomCount": 50, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 1, "financeRoomCount": 1 }, { "organizationId": 95, "organizationName": "liyishi", "displayName": null, "orgLegalPersonName": null, "orgContactMobile": "13588118185", "orgType": 3, "orgTypeName": "个人组织", "orgGmtCreate": 1495627931000, "orgGmtCreateStr": "2017-05-24 20:12:11", "estateCount": 1, "estateRoomCount": 35, "houseCount": 2, "houseRoomCount": 4, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 98, "organizationName": "test组织", "displayName": "test组织", "orgLegalPersonName": "王飞飞", "orgContactMobile": "13000000001", "orgType": 2, "orgTypeName": "公司企业", "orgGmtCreate": 1495693805000, "orgGmtCreateStr": "2017-05-25 14:30:05", "estateCount": 0, "estateRoomCount": 0, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 128, "organizationName": "程翠", "displayName": "程翠", "orgLegalPersonName": null, "orgContactMobile": "18657107604", "orgType": 3, "orgTypeName": "个人组织", "orgGmtCreate": 1497239982000, "orgGmtCreateStr": "2017-06-12 11:59:42", "estateCount": 0, "estateRoomCount": 0, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 129, "organizationName": "李绍光", "displayName": "18667100809", "orgLegalPersonName": null, "orgContactMobile": "18667100805", "orgType": 3, "orgTypeName": "个人组织", "orgGmtCreate": 1497263292000, "orgGmtCreateStr": "2017-06-12 18:28:12", "estateCount": 1, "estateRoomCount": 25, "houseCount": 2, "houseRoomCount": 2, "financehouseCount": 1, "financeRoomCount": 2 }, { "organizationId": 145, "organizationName": "程翠", "displayName": "程翠", "orgLegalPersonName": null, "orgContactMobile": "13512341243", "orgType": 3, "orgTypeName": "个人组织", "orgGmtCreate": 1497952643000, "orgGmtCreateStr": "2017-06-20 17:57:23", "estateCount": 0, "estateRoomCount": 0, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 151, "organizationName": "18867118217", "displayName": "18867118217", "orgLegalPersonName": null, "orgContactMobile": "18867118217", "orgType": 3, "orgTypeName": "个人组织", "orgGmtCreate": 1498096461000, "orgGmtCreateStr": "2017-06-22 09:54:21", "estateCount": 0, "estateRoomCount": 0, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 152, "organizationName": "程翠", "displayName": "程翠", "orgLegalPersonName": null, "orgContactMobile": "13429166686", "orgType": 3, "orgTypeName": "个人组织", "orgGmtCreate": 1498183676000, "orgGmtCreateStr": "2017-06-23 10:07:56", "estateCount": 0, "estateRoomCount": 0, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 153, "organizationName": "css", "displayName": "cscs", "orgLegalPersonName": "程翠", "orgContactMobile": "13419156686", "orgType": 2, "orgTypeName": "公司企业", "orgGmtCreate": 1498184403000, "orgGmtCreateStr": "2017-06-23 10:20:03", "estateCount": 0, "estateRoomCount": 0, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 154, "organizationName": "测试", "displayName": "12", "orgLegalPersonName": "程翠", "orgContactMobile": "18867119999", "orgType": 2, "orgTypeName": "公司企业", "orgGmtCreate": 1498184441000, "orgGmtCreateStr": "2017-06-23 10:20:41", "estateCount": 0, "estateRoomCount": 0, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 155, "organizationName": "cs", "displayName": "scs", "orgLegalPersonName": "程翠", "orgContactMobile": "13999888888", "orgType": 2, "orgTypeName": "公司企业", "orgGmtCreate": 1498443784000, "orgGmtCreateStr": "2017-06-26 10:23:04", "estateCount": 0, "estateRoomCount": 0, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 157, "organizationName": "13512345678", "displayName": "13512345678", "orgLegalPersonName": null, "orgContactMobile": "13512345678", "orgType": 3, "orgTypeName": "个人组织", "orgGmtCreate": 1498526033000, "orgGmtCreateStr": "2017-06-27 09:13:53", "estateCount": 1, "estateRoomCount": 15, "houseCount": 3, "houseRoomCount": 3, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 158, "organizationName": "cs", "displayName": "Cs", "orgLegalPersonName": "程翠", "orgContactMobile": "18867999999", "orgType": 2, "orgTypeName": "公司企业", "orgGmtCreate": 1498526181000, "orgGmtCreateStr": "2017-06-27 09:16:21", "estateCount": 1, "estateRoomCount": 10, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 165, "organizationName": "17681887405", "displayName": "17681887405", "orgLegalPersonName": null, "orgContactMobile": "17681887405", "orgType": 3, "orgTypeName": "个人组织", "orgGmtCreate": 1498527883000, "orgGmtCreateStr": "2017-06-27 09:44:43", "estateCount": 0, "estateRoomCount": 0, "houseCount": 0, "houseRoomCount": 0, "financehouseCount": 0, "financeRoomCount": 0 }, { "organizationId": 166, "organizationName": "cs", "displayName": "cs", "orgLegalPersonName": "程翠", "orgContactMobile": "15313705803", "orgType": 2, "orgTypeName": "公司企业", "orgGmtCreate": 1498527996000, "orgGmtCreateStr": "2017-06-27 09:46:36", "estateCount": 24, "estateRoomCount": 77, "houseCount": 15, "houseRoomCount": 24, "financehouseCount": 25, "financeRoomCount": 62 }];
            this.total = 20;
            this.listLoading = false;
            /*getGridApi(ObjectMap(this.searchParams)).then(response => {
                this.tableData = response.data.content;
                this.total = response.data.totalElements;
                this.listLoading = false;
            })*/
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


