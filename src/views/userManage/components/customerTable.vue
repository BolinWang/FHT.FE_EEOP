<template>
    <div class="clearfix">
        <div class="model-search clearfix">
            <el-form size="small" :inline="true" :model="formData">
                <el-select size="small" v-if="customerType == 1" 
                    v-model="formData.realNameType" 
                    placeholder="实名认证" class="item-select" style="width: 120px;"
                    clearable filterable>
                    <el-option
                        v-for="(item,index) in attestation"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select size="small" v-if="customerType == 1" 
                    v-model="formData.liveType" 
                    placeholder="入住情况" class="item-select filter-item" style="width: 120px;"
                    clearable filterable>
                    <el-option
                        v-for="(item,index) in checkIn"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select size="small" v-if="customerType == 2" v-model="formData.type" 
                    placeholder="全部组织" class="item-select" style="width: 180px;"
                    clearable filterable>
                    <el-option
                        v-for="(item,index) in organization"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-input size="small" v-model="formData.keyWord" placeholder="姓名/手机号码/证件号" class="filter-item" 
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
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-tag 
                            v-if="item.filterType == 'authentication'"
                            :type="(scope.row[item.prop] == '2' ? 'success' : 'info')">
                            {{(scope.row[item.prop]) | filterStr(item.filterType)}}
                        </el-tag>
                        <span v-else-if="item.filterType">
                            {{(scope.row[item.prop]) | filterStr(item.filterType)}}
                        </span>
                        <span v-else>
                            {{scope.row[item.prop]}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="220" v-if="customerType == 1">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-tickets" size="small" @click.native="showRecord(scope.row)">租房记录</el-button>
                            <el-button type="primary" icon="el-icon-info" size="small" @click.native="showDetail(scope.row)">查看详情</el-button>
                        </el-button-group>
                        
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

        <!-- 租房记录 -->
        <el-dialog 
            title="租房记录" 
            width="1000px"
            @close="overlayData=[]" 
            :visible.sync="rentRecord">
            <el-table :data="overlayData" 
                size="small"
                v-loading.body="listLoading"
                max-height="500"
                fit stripe>
                <el-table-column type="index" width="60" align="center"></el-table-column>
                <el-table-column v-for="(item,index) in overlayCol"
                    :label="item.label" 
                    :width="item.width"
                    key="index"
                    fit
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="item.filterType">
                            {{(scope.row[item.prop]) | filterStr(item.filterType)}}
                        </span>
                        <span v-else>
                            {{scope.row[item.prop]}}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <!-- 详细资料 -->
        <el-dialog title="详细资料" :visible.sync="lookDetail" width="700px">
            <el-form ref="form" :model="detailData" size="small" label-width="90px">
                <div class="clearfix">
                    <el-col :span="8">
                        <el-form-item label="姓名">
                            <el-input :disabled="true" :value="detailData.realName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机号码">
                            <el-input :disabled="true" :value="detailData.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="国籍">
                            <el-input :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </div>
                <div class="clearfix">
                    <el-col :span="8">
                        <el-form-item label="省份">
                            <el-input :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="市县">
                            <el-input :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="地区">
                            <el-input :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </div>
                <el-form-item label="详细地址">
                    <el-input :disabled="true" ></el-input>
                </el-form-item>
                <div class="clearfix">
                    <el-col :span="8">
                        <el-form-item label="证件类型">
                            <el-input :disabled="true" 
                            :value="detailData.cardType | filterStr('cardType')">
                                
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="证件号码">
                            <el-input :disabled="true" :value="detailData.cardNo"></el-input>
                        </el-form-item>
                    </el-col>
                </div>
                <div class="clearfix">
                    <el-col :span="8">
                        <el-form-item label="客户来源">
                            <el-input :disabled="true" 
                            :value="detailData.registerSource | filterStr('registerSource')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="销售员">
                            <el-input :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </div>
                
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import waves from '@/directive/waves'
import { customerListApi, businessUserListApi, queryRentRecordApi } from '@/api/userManage'
import { ObjectMap, deepClone } from '@/utils'

export default {
    name: 'queryCenterComp',
    props: {
        customerType: {
            type: Number,
            default: 1
        }
    },
    directives: {
        waves
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                '1': 'info',
                '2': 'success'
            }
            return statusMap[status] || 'info'
        },
        filterStr(status, key) {
            const statusStrData = {
                'gender': ['','男','女'],
                'cardType': ['','身份证','护照','港澳通行证','台湾通行证'],
                'authentication': ['未认证','未认证','已认证'],
                'authenticationSource': ['','系统','人工','系统'],
                'registerSource': ['','PC','APP'],
                'status': ['未入住','在住','申请换房','申请退房','已搬离'],
                'isContracter': ['否','是'],
                'housingType': ['','集中式','分散式']
            }
            if (!statusStrData[key]) {
                return '';
            } 
            return statusStrData[key][status] 
                    || (key == 'authenticationSource' ? '其他' : '');             
        }
    },
    data() {
        return {
            attestation: [
                {value: 0, label: '未提交资料'},
                {value: 1, label: '审核中'},
                {value: 2, label: '认证通过'},
                {value: 3, label: '审核不通过'}
            ],
            checkIn: [
                {value: 1, label: '目前在住'},
                {value: 2, label: '尚未入住'}
            ],
            organization: [
                {value: 1, label: '系统'},
                {value: 2, label: '公司企业'},
                {value: 3, label: '个人组织'}
            ],
            formData:{
                type: '',
                realNameType: '',
                liveType: '',
                keyWord: ''
            },
            overlayCol: [
                { prop:'subdistrictAddress', label: '位置'},
                { prop:'subdistrictName', label: '小区/公寓'},
                { prop:'status', label: '入住状态', filterType:'status', width: 80},
                { prop:'isContracter', label: '签约人', filterType:'isContracter', width: 80},
                { prop:'startDate', label: '入住时间'},
                { prop:'endDate', label: '离开时间'},
                { prop:'housingType', label: '房源类型', filterType:'housingType', width: 80},
                { prop:'orgName', label: '归属组织'},
            ],
            rentRecord:false,
            lookDetail:false,
            tableHeight: 300,
            tableData: [],
            overlayData: [],
            customerTypeClone: this.customerType,
            searchParams: {},
            detailData: {},
            total: null,
            pageItems: {
                pageNo: 1,
                pageSize: 20
            },
            pageSizeList: [10, 20, 30, 50],
            listLoading: false
        }
    },
    created() {
        if (this.customerType == 1) {
            this.colModels = [
                { prop:'customerId', label: 'ID'},
                { prop:'customerName', label: '用户名'},
                { prop:'mobile', label: '手机号码', width: 120},
                { prop:'realName', label: '真实姓名', width: 120},
                { prop:'gender', label: '性别', width: 80, filterType:'gender'},
                { prop:'cardType', label: '证件类型', width: 100, filterType:'cardType'},
                { prop:'cardNo', label: '证件号码', width: 180},
                { prop:'authentication', label: '实名状态', width: 100, filterType:'authentication'},
                { prop:'authenticationSource', label: '实名类型', width: 80, filterType:'authenticationSource'},
                { prop:'registerSource', label: '注册端', width: 80, filterType:'registerSource'}
            ]
        } else {
            this.colModels = [
                { prop:'mobile', label: '手机号码'},
                { prop:'name', label: '姓名'},
                { prop:'gender', label: '性别', filterType:'gender'},
                { prop:'cardType', label: '证件类型', width: 120, filterType:'cardType'},
                { prop:'cardNo', label: '证件号码', width: 180},
                { prop:'authentication', label: '实名状态', width: 120, filterType:'authentication'},
                { prop:'gmtCreateName', label: '归属组织', width: 180}
            ]
        }
        this.getGridData(this.pageItems);
    },
    mounted() {
        /* 表格高度控制 */
        let temp_height = document.body.clientHeight - 267;
        this.tableHeight = temp_height > 300 ? temp_height : 300;
        window.onresize = () => {
            return (() => {
                temp_height = document.body.clientHeight - 267;
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
        searchParam(){
            let params = deepClone(this.formData)
            this.getGridData(Object.assign({
                pageNo: 1,
                pageSize: 20
            },params));
        },
        clearForm(){
            this.formData = {
                type: '',
                realNameType: '',
                liveType: '',
                keyWord: ''
            }
            this.pageItems = {
                pageNo: 1,
                pageSize: 20
            };
            this.searchParam();
        },
        showRecord(row) {
            this.rentRecord = true;
            let search = {
                pageNo: 1,
                pageSize: 20,
                customerId: row.customerId
            }
            this.listLoading = true;
            queryRentRecordApi(ObjectMap(search)).then(response => {
                this.overlayData = response.data.list;
                this.overlayTotal = response.data.record;
                this.listLoading = false;
            })
        },
        showDetail(row) {
            this.lookDetail = true;
            this.detailData = row;
        },
        /* 列表渲染 */
        getGridData(params) {
            this.listLoading = true;
            this.searchParams = deepClone(params);
            let dataApi = this.customerType == 1 ? customerListApi : businessUserListApi;
            dataApi(ObjectMap(this.searchParams)).then(response => {
                this.tableData = response.data.list;
                this.total = response.data.record;
                this.listLoading = false;
            })
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    
</style>


