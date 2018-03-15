<template>
    <div class="app-container">
        <div class="model-table" :style="tableStyle">
            <el-table 
                :data="tableData" 
                v-loading.body="listLoading" 
                :max-height="tableHeight" 
                size="small"
                fit stripe highlight-current-row>
                <el-table-column type="index" width="60" align="center"></el-table-column>
                <el-table-column v-for="(item,index) in colModels"
                    :label="item.label" 
                    :width="item.width"
                    key="index"
                    fit
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-tag v-if="item.type == 'status'"
                            :type="scope.row[item.prop] | tagFilter">
                            {{scope.row[item.prop] | statusFilter(item.prop)}}
                        </el-tag>
                        <span v-else>
                            {{scope.row[item.prop]}}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import waves from '@/directive/waves' // 水波纹指令
    import { queryLookRecordApi } from '@/api/serviceManage'
    export default {
        name: 'lookRecord',
        directives: {waves},
        filters:{
            tagFilter(val){
                const filterObj = {
                    '0' : 'info',
                    '1' : 'success',
                    '2' : 'success'
                }
                return filterObj[val] || 'info'
            },
            statusFilter(val,item){
                const filterObj = {
                    'lookHouseStatus' : ['未带看','带看中','已带看'],
                    'lookHouseResult' : ['未签约','已签约']
                }
                return filterObj[item][val] || '未知'
            }
        },
        data() {
            return {
                searchParams: { pageNo: 1, pageSize: 9999 },
                listLoading: false,
                colModels:[
                    { prop:'userName', label: '租客姓名', width: 100},
                    { prop:'userMobile', label: '租客电话', width: 100},
                    { prop:'bookingTime', label: '看房时间', width: 150},
                    { prop:'roomAddr', label: '小区/公寓-房间'},
                    { prop:'landlordName', label: '房东', width: 80},
                    { prop:'landlordMobile', label: '房东电话', width: 100},
                    { prop:'serverName', label: '城市管家', width: 80},
                    { prop:'serverMobile', label: '管家电话', width: 100},
                    { prop:'lookHouseStatus', label: '看房进度', width: 80, type: 'status'},
                    { prop:'lookHouseResult', label: '签约状况', width: 80, type: 'status'}
                ],
                tableHeight: 300,
                tableData: []
            }
        },
        mounted() {
            /* 表格高度控制 */
            let temp_height = document.body.clientHeight - 95;
            this.tableHeight = temp_height > 300 ? temp_height : 300;
            window.onresize = () => {
                return (() => {
                    temp_height = document.body.clientHeight - 95;
                    this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300;
                })()
            }
            this.getGridData();
        },
        computed: {
            tableStyle: function () {
                return {
                    width: '100%',
                    height: this.tableHeight + 'px',
                    margin: 0
                }
            }
        },
        methods: {
            getGridData() {
                this.listLoading = true;
                queryLookRecordApi(this.searchParams).then(response => {
                    this.tableData = response.data ? (response.data.list || []) : [];
                    this.listLoading = false;
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    
</style>
