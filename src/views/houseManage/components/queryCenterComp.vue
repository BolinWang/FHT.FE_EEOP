<template>
    <div class="clearfix">
        <div class="model-search clearfix">
            <el-form size="small" :inline="true" :model="formData">
                <el-select size="small" v-model="formData.cityId" 
                    placeholder="城市" class="item-select" style="width: 120px;"
                    clearable filterable 
                    @change="cityChange">
                    <el-option
                        v-for="(item,index) in cityOptions"
                        :key="index"
                        :label="item.cityName"
                        :value="item.cityId">
                    </el-option>
                </el-select>
                <el-select size="small" v-model="formData.regionId" 
                    placeholder="地区" class="item-select filter-item" style="width: 120px;"
                    clearable filterable
                    @change="regionChange">
                    <el-option
                        v-for="(item,index) in regionOptions"
                        :key="index"
                        :label="item.areaName"
                        :value="item.areaId">
                    </el-option>
                </el-select>
                <el-select size="small" v-model="formData.subdistrictId" 
                    :placeholder="placeholder" class="item-select filter-item" style="width: 180px;"
                    clearable filterable>
                    <el-option
                        v-for="(item,index) in subdistrictOptions"
                        :key="index"
                        :label="housingTypeClone == 1 ? item.estateName : item.subdistrictName"
                        :value="housingTypeClone == 1 ? item.estateId : item.subdistrictId">
                    </el-option>
                </el-select>
                <el-input size="small" v-model="formData.roomCode" placeholder="输入房源编码查询" class="filter-item" 
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
                        <span v-if="item.type === 'formatAddress'">
                            {{(scope.row[item.prop]) | formatAddress(scope.row)}}
                        </span>
                        <span v-else-if="item.type === 'formatContactName'">
                            {{(scope.row[item.prop]) | formatContactName(scope.row)}}
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
    </div>
</template>
<script>
import waves from '@/directive/waves'
import { marketReviewCheckListByPageApi, marketCityAndSubdistrictListApi } from '@/api/houseManage'
import { ObjectMap, deepClone } from '@/utils'

export default {
    name: 'queryCenterComp',
    props: {
        housingType: {
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
                '1': 'success',
                '2': 'info',
                '3': 'danger'
            }
            return statusMap[status] || 'success'
        },
        statusStrFilter(status){
            const statusStrData = ['待上线','已上线','已下线'];
            return statusStrData[status] || '已上线'
        },
        formatAddress(val,row){
            return `${row.addrProvince}/${row.addrCity}/${row.addrRegion}`
        },
        formatContactName(val,row){
            if (!val) {
                return ''
            }
            let contactGender = row.contactGender == 1 ? '先生' : '女士'
            return `${val} ${contactGender}`
        }
    },
    data() {
        return {
            cityOptions: [],
            regionOptions: [],
            subdistrictOptions: [],
            cityOptionsClone: [],
            subdistrictOptionsClone: [],
            placeholder: '公寓',
            formData:{
                cityId: '',
                regionId: '',
                subdistrictId: '',
                roomCode: ''
            },
            colModels:[
                { prop:'organizationName', label: '组织'},
                { prop:'address', label: '位置', type: 'formatAddress'},
                { prop:'roomName', label: '公寓/小区-房间'},
                { prop:'houseFinanceType', label: '房源类型', width: 120},
                { prop:'roomCode', label: '房源编码', width: 180},
                { prop:'contactName', label: '联系人', width: 120, type: 'formatContactName'},
                { prop:'contactMobile', label: '看房电话', width: 180}
            ],
            tableHeight: 300,
            tableData: [],
            housingTypeClone: this.housingType,
            searchParams: {},
            total: null,
            pageItems: {
                pageNo: 1,
                pageSize: 20
            },
            pageSizeList: [10, 20, 30, 50],
            listLoading: true
        }
    },
    created() {
        this.getCityAndEstateList();
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
        /* 获取城市列表 */
        getCityAndEstateList(){
            marketCityAndSubdistrictListApi({
                housingType: this.housingType
            }).then(response => {
                let dataList = response.data.list;
                this.cityOptions = dataList.cityInfoList;
                this.subdistrictOptions = dataList.subdistrictList;
                this.cityOptionsClone = deepClone(dataList.cityInfoList);
                this.subdistrictOptionsClone = deepClone(dataList.subdistrictList);
            })
        },
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
            if (this.housingTypeClone == 1) {
                params.estateId = params.subdistrictId;
            }
            this.getGridData(Object.assign({
                pageNo: 1,
                pageSize: 20
            },params));
        },
        cityChange(value) {
            if (value == '') {
                this.subdistrictOptions = this.subdistrictOptionsClone;
            }else{
                this.formData.subdistrictId = '';
                this.formData.regionId = '';
                this.subdistrictOptions = this.subdistrictOptionsClone.filter((item) => {
                    return item.cityId ==  value
                });
                let currentItem = this.cityOptions.filter((item) => {
                    return item.cityId == value
                })
                this.regionOptions = currentItem[0].areaList;
            }
        },
        regionChange(value){
            this.formData.subdistrictId = '';
            if (value == '') {
                this.cityChange(this.formData.cityId);
            }else{
                this.subdistrictOptions = this.subdistrictOptionsClone.filter((item) => {
                    return item.areaId ==  value
                });
            }
        },
        clearForm(){
            this.formData = {
                cityId: '',
                regionId: '',
                subdistrictId: '',
                roomCode: ''
            }
            this.pageItems = {
                pageNo: 1,
                pageSize: 20
            };
            this.searchParam();
        },
        /* 列表渲染 */
        getGridData(params) {
            this.listLoading = true;
            this.searchParams = deepClone(params);
            this.searchParams.housingType = this.housingTypeClone
            marketReviewCheckListByPageApi(ObjectMap(this.searchParams)).then(response => {
                this.tableData = response.data.list;
                this.total = response.data.record;
                this.listLoading = false;
            })
        }
    },
    watch: {
        housingType(val){
            this.housingTypeClone = val;
            this.pageItems = {
                pageNo: 1,
                pageSize: 20
            };
            this.clearForm();
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    
</style>


