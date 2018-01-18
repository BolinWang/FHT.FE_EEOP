<template>
    <div class="app-container">
        <div class="model-search clearfix">
            <el-select v-model="selectData.value" clearable size="small" :placeholder="eeopType | placeholderFilter" @change="change">
                <el-option
                    v-for="item in selectData.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button class="filter-item right" size="small"  type="primary" icon="el-icon-plus" @click.native="createRow">新增</el-button>
            <el-button v-if="eeopType != 'advertis'" size="small"  class="filter-item right" type="primary" icon="el-icon-rank" @click.native="sortApp">APP展示排序</el-button>
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
                        <img class="image image-center" width="40" height="40" 
                            v-if="item.type === 'img'"
                            v-lazy="scope.row[item.prop]"
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
                <el-table-column fixed="right" label="操作" width="122">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-tooltip effect="dark" content="编辑" placement="bottom">
                                <el-button type="primary" icon="el-icon-edit" size="small" @click.native="updateRow(scope.$index,scope.row)"></el-button>
                            </el-tooltip>
                            <el-tooltip effect="dark" content="删除" placement="bottom">
                                <el-button type="danger" icon="el-icon-delete" size="small" @click.native="deleteRow(scope.$index,scope.row)"></el-button>
                            </el-tooltip>
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

        <!-- 查看图片 -->
        <div class="dialog-image">
            <el-dialog title="" width="100%" 
                :show-close="false" 
                :visible.sync="layer_showImage"
                style="text-align: center;"
                @click.native="closeDialog">
                <img class="image" :src="showPicUrl" />
            </el-dialog>
        </div>

        <!-- 新增编辑dialog -->
        <div class="dialog-info">
            <el-dialog 
                :title="textMap[dialogStatus] + eeopTypeStr" 
                :visible.sync="layer_showInfo" width="600px"
                @close="dialogClose">
                <el-form size="small" :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 500px; margin-left:20px;'>
                    <el-form-item :label="eeopType == 'interview' ? '麦友昵称' : '标题'" prop="title">
                        <el-input v-model="temp.title" placeholder="请输入内容" :maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item v-if="eeopType == 'interview'" label="公寓" prop="estateName">
                        <el-input v-model="temp.estateName" placeholder="请输入公寓名称" :maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item label="链接" prop="linkUrl">
                        <el-input v-model="temp.linkUrl" placeholder="请输入有效链接"></el-input>
                    </el-form-item>
                    <el-form-item label="上线时间" prop="effectiveTime">
                        <el-date-picker v-model="temp.effectiveTime" type="datetime" placeholder="选择上线时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="eeopType != 'interview'" label="下线时间" prop="ineffectiveTime">
                        <el-date-picker v-model="temp.ineffectiveTime" type="datetime" placeholder="选择下线时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="图片" prop="picUrl">
                        <el-upload
                            action='/api/util/upload/uploadPicture'
                            :before-upload="pictureUpload"
                            :on-preview="picturePreview"
                            :on-remove="(file, fileList)=>{
                                return pictureRemove(file, fileList, `picUrl`)
                            }"
                            :on-success="(response, file, fileList)=>{
                                return pictureSuccess(response, file, fileList, `picUrl`)
                            }"
                            :on-change="resetFile"
                            :on-error="pictureError"
                            :file-list="fileList"
                            accept="image/jpg,image/jpeg,image/png"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">{{uploadTips}}</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item v-if="eeopType == 'banner'" label="缩略图" prop="thumbnail">
                        <el-upload
                            action="/api/util/upload/uploadPicture"
                            :on-preview="picturePreview"
                            :on-remove="(file, fileList)=>{
                                return pictureRemove(file, fileList, `thumbnail`)
                            }"
                            :on-success="(response, file, fileList)=>{
                                return pictureSuccess(response, file, fileList, `thumbnail`)
                            }"
                            :on-change="resetFile"
                            :on-error="pictureError"
                            :file-list="thumFileList"
                            accept="image/jpg,image/jpeg,image/png"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">请上传350 * 350的jpg/png图片，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="简介" prop="introduction">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入简介" v-model="temp.introduction">
                        </el-input>
                    </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="layer_showInfo = false" size="small">取 消</el-button>
                        <el-button type="primary" size="small" @click="createAndUpdateData">确 定</el-button>
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
                            <el-badge :value="item.sortNum">
                            </el-badge>
                            <i class="el-icon-d-caret" aria-hidden="true"></i>
                            {{item.title}}
                        </li> 
                    </transition-group>
                </draggable>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="layer_appsort = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="saveData(sort_tableData)" size="small">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import fetch from '@/utils/fetch';
import waves from '@/directive/waves' // 水波纹指令
import draggable from 'vuedraggable'
import { parseTime, ObjectMap } from '@/utils'
import { getGridApi, saveDataApi } from '@/api/eeop';

const defaultOptions = [
    { value: 1, label: '待上线'},
    { value: 2, label: '已上线'},
    { value: 3, label: '已下线'}
];
const eeopTypeMap = {
    'activety' : '精彩活动',
    'interview' : '麦友专访',
    'advertis' : '推广广告页',
    'banner' : '首页焦点图'
};

export default {
    name: 'eeopGlobalPage',
    directives: {
        waves
    },
    components:{
        draggable
    },
    props: {
        eeopType: {
            type: String,
            default: 'activety'
        }
    },
    filters: {
        placeholderFilter(eeopType){
            return eeopTypeMap[eeopType] + '状态'
        },
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
            return statusStrData[status - 1] || '已上线'
        }
    },
    data() {
        return {
            selectData:{
                options: [],
                value:''
            },
            colModels:[
                { prop:'activityStatus', label: '状态', width: 80, type: 'status'},
                { prop:'title', label: '标题'},
                { prop:'picUrl', label: '图片', width: 80, type: 'img'},
                { prop:'linkUrl', label: '链接', type: 'link'},
                { prop:'effectiveTime', label: '上线时间', width: 180},
                { prop:'ineffectiveTime', label: '下线时间', width: 180},
                { prop:'introduction', label: '简介'}
            ],
            showPicUrl: '',
            temp:{
                picUrl: '',
                linkUrl: '',
                effectiveTime: '',
                estateName: '',
                ineffectiveTime: '',
                title: '',
                introduction: ''
            },
            eeopTypeStr: '',
            textMap: {
                update: '编辑',
                create: '新增'
            },
            uploadTips: '',
            isShowSortApp: true,
            dialogStatus: '',
            tableHeight: 300,
            tableData: [],
            total: null,
            pageItems: {
                pageNo: 1,
                pageSize: 20
            },
            pageSizeList: [10, 20, 30, 50],
            sort_tableData: [],
            listLoading: true,
            layer_showImage: false,
            layer_showInfo: false,
            layer_appsort: false,
            fileList: [],
            thumFileList: [],
            rules: {
                title: [
                    { required: true, message: '请输入内容', trigger: 'change' }
                ],
                estateName: [
                    { required: true, message: '请输入公寓名称', trigger: 'change' }
                ],
                linkUrl: [
                    { required: true, message: '请输入链接内容', trigger: 'change' }
                ],
                thumbnail: [
                    { required: true, message: '请上传缩略图', trigger: 'change' }
                ],
                picUrl: [
                    { required: true, message: '请上传图片', trigger: 'change' }
                ],
                effectiveTime: [
                    { type: 'date', required: true, message: '请选择上线时间', trigger: 'change' }
                ],
                ineffectiveTime: [
                    { type: 'date', required: true, message: '请选择下线时间', trigger: 'change' }
                ],
                introduction: [
                    { required: true, message: '请输入简介', trigger: 'change' }
                ]
            },
            isDragging: false,
            delayedDragging:false
        }
    },
    created() {
        /* 判断父组件的eeopType */
        this.selectData.options = [...defaultOptions];
        this.$set(this.colModels[0], 'prop', this.eeopType + 'Status');
        this.eeopTypeStr = eeopTypeMap[this.eeopType];
        switch(this.eeopType) {
            case 'interview':
                let _optionList = [...defaultOptions];
                _optionList.pop();
                this.selectData.options = _optionList;
                this.$set(this.colModels[1], 'label', '麦友昵称');
                this.colModels.splice(5, 1);
                this.colModels.splice(2, 0, {prop:'estateName', label: '公寓', width: 200});
                this.uploadTips = '请上传1024 * 1024的jpg/png图片，且不超过1Mb';
                break;
            case 'advertis':
                this.uploadTips = '请上传1080 * 1920的jpg/png图片，且不超过1Mb';
                this.isShowSortApp = false;
                break;
            case 'activety': 
                this.uploadTips = '请上传480 * 240的jpg/png图片，且不超过500kb';
                break;
            case 'banner':
                this.uploadTips = '请上传1080 * 648的jpg/png图片，且不超过500kb';
                break;
        }
        this.getGridData(this.pageItems);
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
        /* 上传图片 */
        pictureUpload(file){
            //const isLt500k = file.size / 1024 / 1024 / 1024 < 500;
            if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) == -1) {
                this.$message.error('请上传jpg/png的图片');
                return false;
            }
            /*if (!isLt500k) {
                this.$message.error('请上传大小不超过500kb的图片');
                return false;
            }*/
        },
        pictureRemove(file, fileList, picType) {
            console.log(response, file, fileList, picType)
            this.showPicUrl = '';
            if (picType) {
                this[picType] = '';
            }
        },
        picturePreview(file) {
            this.showPicUrl = file.url;
            this.layer_showImage = true;
        },
        pictureSuccess(response, file, fileList, picType){
            console.log(response, file, fileList, picType)
            if (picType) {
                this[picType] = response.data[0];
                this.temp[picType] = response.data[0];
            }
            if (fileList.length > 1) {
                fileList.splice(0,1);
            }
        },
        pictureError(err,file){
            file = null;
        },
        resetFile(file){
            file = null;
        },
        /* 查询列表 */
        change(value) {
            this.getGridData(this.pageItems);
        },
        /* 查看图片 */
        showImage(picUrl){
            this.showPicUrl = picUrl;
            this.layer_showImage = true;
        },
        /* 弹窗关闭时的回调 */
        dialogClose(){
            this.fileList = [];
            this.thumbnail = [];
            this.resetTemp();
        },
        closeDialog(){
            this.layer_showImage = false;
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
            switch(this.eeopType) {
                case 'interview':
                    params.activityStatus = this.selectData.value
                    break;
                case 'advertis':
                    params.activityStatus = this.selectData.value
                    break;
                case 'activety': 
                    params.activityStatus = this.selectData.value
                    break;
                case 'banner':
                    params.activityStatus = this.selectData.value
                    break;
            }
            getGridApi(ObjectMap(params)).then(response => {
                this.tableData = response.data.content;
                this.total = response.data.totalElements;
                this.listLoading = false;
            })
        },
        /* 重置临时数据 */
        resetTemp(){
            this.temp = {
                picUrl: '',
                linkUrl: '',
                effectiveTime: '',
                ineffectiveTime: '',
                title: '',
                introduction: ''
            }
        },
        /* 列表删除 */
        deleteRow(index,row){
            row.isDelete = 1;
            this.tableData.splice(index,0,row);
            this.saveData(this.tableData);
        },
        /* 新增 */
        createRow(){
            this.resetTemp();
            this.layer_showInfo = true;
            this.dialogStatus = 'create';
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            });
        },
        /* 编辑 */
        updateRow(index,row){
            this.layer_showInfo = true;
            this.dialogStatus = 'update';
            this.editRowIndex = index;
            if (row.picUrl) {
                this.fileList.push({name: '图片', url: row.picUrl});
            }
            if (row.thumbnail) {
                this.fileList.push({name: '缩略图', url: row.thumbnail});
            }
            this.temp = Object.assign({}, row);
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            });
        },
        /* 创建、更新活动 */
        createAndUpdateData() {
            if (this.dialogStatus == 'update'){
                this.temp.effectiveTime = new Date(this.temp.effectiveTime);
                this.temp.ineffectiveTime = new Date(this.temp.ineffectiveTime);
            }
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    this.temp.effectiveTime = parseTime(this.temp.effectiveTime);
                    this.temp.ineffectiveTime = parseTime(this.temp.ineffectiveTime);
                    let saveList = [];
                    if (this.dialogStatus == 'update'){
                        this.tableData.splice(this.editRowIndex,1,this.temp);
                        saveList = this.tableData;
                    }else{
                        saveList = [this.temp]
                    }
                    this.saveData(saveList);
                }
            })
        },
        /* 列表排序 */
        sortApp(){
            getGridApi({
                pageNo:1,
                pageSize:9999,
                activityStatus:2
            }).then(response => {
                this.sort_tableData = response.data.content
                this.layer_appsort = true;
            });
        },
        saveData(params){
            saveDataApi(params).then(response => {
                this.layer_appsort = false;
                this.layer_showInfo = false;
                this.getGridData(this.pageItems);
                this.$notify({
                    title: '成功',
                    message: '操作成功',
                    type: 'success',
                    duration: 2000
                })
            });
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


