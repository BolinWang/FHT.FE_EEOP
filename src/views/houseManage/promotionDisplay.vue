<template>
    <div class="app-container">
        <div class="model-search clearfix">
            <el-form size="small" :inline="true" :model="formData">
                <el-select size="small" v-model="formData.cityId" 
                    @change=change
                    placeholder="城市加载中..." 
                    class="item-select" style="width: 150px;"
                    clearable>
                    <el-option
                        v-for="item in cityOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button size="small"  class="filter-item right" type="primary" icon="el-icon-rank" @click.native="sortApp">APP展示排序</el-button>
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
                            v-if="item.type === 'status'" 
                            :type="scope.row[item.prop] | statusFilter">
                            {{scope.row[item.prop] | statusStrFilter}}
                        </el-tag>
                        <span v-else>
                            {{scope.row[item.prop]}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-button type="danger" icon="el-icon-sold-out" size="small" @click.native="downImmediate(scope.$index,scope.row)">立即下架</el-button>
                            <el-button type="primary" icon="el-icon-info" size="small" @click.native="showEstateInfo(scope.row)">公寓详情</el-button>
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

        <!-- 公寓信息 -->
        <div class="dialog-info">
            <el-dialog 
                title="查看公寓信息" 
                @close="layerClose"
                :visible.sync="layer_showInfo" width="700px">
                <el-form size="small" :model="temp" label-position="left" label-width="80px" style='width: 620px; margin-left:20px;'>
                    <el-form-item label="公寓名称">
                        <el-input :value="temp.estateName" :disabled="true"></el-input>
                    </el-form-item>
                    <div class="clearfix">
                        <el-col :span="13">
                            <el-form-item label="所在地区">
                                <el-input :value="temp.addressName" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">&nbsp;&nbsp;</el-col>
                        <el-col :span="10">
                            <el-form-item label="所属板块">
                                <el-input :value="temp.zoneName" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <el-form-item label="看房电话">
                        <el-input :value="temp.contactNameInfo" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="地图坐标">
                        <el-input :value="temp.bmapData" :disabled="true">
                            <el-button slot="append" icon="el-icon-search" @click.native="layer_showBMap = true"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.introduction" :disabled="true">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="公寓照片">
                        <Preview :pic-list="temp.picList"></Preview>
                    </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="layer_showInfo = false" size="small">关闭</el-button>
                    </div>
            </el-dialog>
        </div>

        <!-- 百度地图 -->
        <div class="dialog-bmap">
            <el-dialog title="公寓坐标" :visible.sync="layer_showBMap" width="600px" @open="openBMap">
                <div id="addressMap" style="width: 560px;height:400px"></div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="layer_showBMap = false" size="small">关闭</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 列表排序 -->
        <div class="dialog-sort">
            <el-dialog title="APP展示排序" :visible.sync="layer_appsort" width="800px">
                <draggable class="list-group" element="ul" v-model="sort_tableData" 
                    :options="dragOptions" 
                    @start="isDragging=true" 
                    @end="isDragging=false"> 
                    <transition-group type="transition" :name="'flip-list'">
                        <li class="list-group-item" v-for="(item,index) in sort_tableData" :key="item.sortNum"> 
                            <i class="el-icon-d-caret" aria-hidden="true"></i>
                            {{item.estateName}}
                        </li> 
                    </transition-group>
                </draggable>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="layer_appsort = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="saveData(sort_tableData,`sort`)" size="small">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import Preview from '@/components/Preview'
import { parseTime, ObjectMap, deepClone } from '@/utils'
import { getCityListApi, getGridApi, saveDataApi } from '@/api/houseManage'
import noPic from '@/assets/noPic.jpg'

export default {
    name: 'promotionDisplay',
    components:{
        draggable,
        Preview
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                '1': 'info',
                '2': 'success',
                '3': ''
            }
            return statusMap[status] || 'info'
        },
        statusStrFilter(status){
            const statusStrData = ['未申请','已展示','申请中'];
            return statusStrData[status - 1] || '未发布'
        }
    },
    data() {
        return {
            formData: {
                cityId: ''
            },
            cityOptions: [],
            colModels:[
                { prop:'showStatus', label: '状态', width: 80, type: 'status'},
                { prop:'province', label: '房源位置'},
                { prop:'estateName', label: '公寓'},
                { prop:'gmtModified', label: '操作时间', width: 180}
            ],
            isShowSortApp: true,
            tableHeight: 300,
            tableData: [],
            total: null,
            pageItems: {
                pageNo: 1,
                pageSize: 20
            },
            searchParams: {},
            temp:{},
            pageSizeList: [10, 20, 30, 50],
            sort_tableData: [],
            listLoading: true,
            layer_showBMap: false,
            layer_showInfo: false,
            layer_appsort: false,
            isDragging: false,
            delayedDragging:false
        }
    },
    created() {
        this.getCityList();
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
        tableStyle () {
            return {
                width: '100%',
                height: this.tableHeight + 'px'
            }
        },
        dragOptions () {
            return  {
                animation: 0,
                group: 'description',
                ghostClass: 'ghost'
            };
        }
    },
    methods: {
        /* 获取城市列表 */
        getCityList(){
            getCityListApi({
                housingType: 1
            }).then(response => {
                this.cityOptions = Object.keys(response.data).map((item) => ({'label':response.data[item],'value':item * 1}))
                this.formData.cityId = this.cityOptions[0].value 
                this.getGridData(this.pageItems);
            });
        },
        /* 立即下架 */
        downImmediate(index,row){
            if (row.showStatus != 2) {
                this.$message.error('请选择【已展示】的房源进行下架');
                return false;
            }
            row.showStatus = 1;
            row.publishStatus = 1;
            this.tableData.splice(index, 1, row);
            this.saveData(this.tableData);
        },
        /* 公寓信息 */
        showEstateInfo(row){
            let deepCloneObj = deepClone(row);
            this.temp.estateName = (deepCloneObj.type == 1 ? '【集中式】' : '【分散式】') + deepCloneObj.estateName;
            this.temp.contactNameInfo = deepCloneObj.contactName ? 
                deepCloneObj.contactName + (deepCloneObj.contactGender == 1 ? ' 先生 ' : ' 女士 ') + deepCloneObj.contactMobile : '';
            this.temp.longitude = deepCloneObj.longitude;
            this.temp.latitude = deepCloneObj.latitude;
            this.temp.bmapData = this.temp.longitude + ',' + this.temp.latitude;
            this.temp.picList = deepCloneObj.estatePictureList.length > 0 ? deepCloneObj.estatePictureList.map((item) => ({'src':item.smallImage})) :
             [{src:noPic,isnoPic:true}];
            this.layer_showInfo = true;
        },
        layerClose(){
            this.temp = {
                longitude:'',
                latitude:'',
                estateName:'',
                contactNameInfo:'',
                bmapData:'',
                picList:[],
                addressName:'',
                zoneName:'',
                introduction:''
            };
        },
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
        /* 列表渲染，数据请求 */
        getGridData(params) {
            this.listLoading = true;
            this.searchParams = deepClone(params);
            this.searchParams.cityId = this.formData.cityId
            getGridApi(ObjectMap(this.searchParams)).then(response => {
                this.tableData = response.data.content;
                this.total = response.data.totalElements;
                this.listLoading = false;
            })
        },
        /* 列表排序 */
        sortApp(){
            getGridApi({
                pageNo:1,
                pageSize:20,
                cityId:this.formData.cityId,
                status:2
            }).then(response => {
                this.sort_tableData = response.data.content.sort((a,b) => a['sortNum'] * 1 - b['sortNum'] * 1);
                if (this.sort_tableData.length == 0) {
                    this.$message.error('没有【已展示】的房源');
                    return false;
                }
                this.layer_appsort = true;
            });
        },
        saveData(params,type){
            let savePatams = deepClone(params);
            if (type == 'sort'){
                savePatams.forEach((item,index) => item.sortNum = index * 1 + 1);
            }
            saveDataApi(savePatams).then(response => {
                this.layer_appsort = false;
                this.getGridData(this.pageItems);
                this.$notify({
                    title: '成功',
                    message: '操作成功',
                    type: 'success',
                    duration: 2000
                })
            });
        },
        /* 百度地图 */
        openBMap(){
            window.setTimeout(() => {
                let map = new BMap.Map("addressMap");
                if(this.temp.bmapData){
                    let point = new BMap.Point(this.temp.longitude * 1 || 0, this.temp.latitude * 1 || 0);
                    map.centerAndZoom(point, 14);
                    map.addOverlay(new BMap.Marker(point));
                }else{
                    map.centerAndZoom('杭州市', 12);
                }
                map.addControl(new BMap.MapTypeControl());
                map.enableScrollWheelZoom(true); 
                map.addEventListener("click",function(e){
                    map.clearOverlays();
                    map.addOverlay(new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat))); 
                });
            },1000);
        }
    },
    watch: {
        isDragging (newValue) {
            if (newValue){
                this.delayedDragging = true
                return
            }
            this.$nextTick(() =>{
               this.delayedDragging = false
            })
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    .dialog-image .el-dialog{
        background: inherit;
        box-shadow: none;
    }
    .model-search .filter-item{
        margin-left: 10px;
    }
</style>


