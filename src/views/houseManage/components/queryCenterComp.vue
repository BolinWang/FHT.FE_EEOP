<template>
    <div class="temp-queryCenter">
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
                        <img class="image image-center" width="40" height="40" 
                            v-if="item.type === 'img'"
                            :src="scope.row[item.prop]"
                            @click="showImage(scope.row[item.prop])" /> 
                        <el-tag 
                            v-else-if="item.type === 'status'" 
                            :type="scope.row[item.prop] | statusFilter">
                            {{scope.row[item.prop] | statusStrFilter}}
                        </el-tag>
                        <a 
                            v-else-if="item.type === 'link'" 
                            :href="scope.row[item.prop]" 
                            target="_blank" style="color:#409EFF">
                            {{scope.row[item.prop]}}
                        </a>
                        <span v-else-if="item.type === 'formatTime'">
                            <i v-if="scope.row[item.prop] && scope.row[item.prop] != ''" class="el-icon-time"></i>
                            {{(scope.row[item.prop] || '') | parseTime()}}
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
import { marketCityAndSubdistrictListApi, marketReviewCheckListByPageApi } from '@/api/houseManage'
import { parseTime, ObjectMap, deepClone } from '@/utils'

export default {
    name: 'queryCenterComp',
    props: {
        housingType: {
            type: Number,
            default: 1
        }
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
        }
    },
    data() {
        return {
            colModels:[
                { prop:'organizationName', label: '组织'},
                { prop:'address', label: '位置'},
                { prop:'roomName', label: '公寓/小区-房间'},
                { prop:'houseFinanceType', label: '房源类型', width: 120},
                { prop:'roomCode', label: '房源编码', width: 180},
                { prop:'contactName', label: '联系人', width: 120},
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
        let temp_height = document.body.clientHeight - 200;
        this.tableHeight = temp_height > 300 ? temp_height : 300;
        window.onresize = () => {
            return (() => {
                temp_height = document.body.clientHeight - 200;
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
                housingType: this.housingTypeClone
            }).then(response => {

            })
        },
        /* 查询列表 */
        handleSizeChange(val) {
            this.pageItems.pageSize = val;
            this.getGridData(this.pageItems);
        },
        handleCurrentChange(val) {
            this.pageItems.pageNo = val;
            this.getGridData(this.pageItems);
        },
        /* 列表渲染 */
        getGridData(params) {
            this.listLoading = true;
            this.searchParams = deepClone(params);
            this.searchParams.housingType = this.housingTypeClone
            marketReviewCheckListByPageApi(ObjectMap(this.searchParams)).then(response => {
                this.tableData = response.data.content;
                this.total = response.data.totalElements;
                this.listLoading = false;
            })
        }
    },
    watch: {
        housingType(val){
            this.$nextTick(() => {
                this.housingTypeClone = val;
                this.getGridData(this.pageItems);
                this.$emit('housingTypeChange',this.housingTypeClone);
            })
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    
</style>


