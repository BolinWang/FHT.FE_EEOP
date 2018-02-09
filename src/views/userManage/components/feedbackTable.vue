<template>
	<div class="clearfix">
		<div class="model-table" :style="tableStyle" style="margin-top: 0;">
	        <el-table 
	            :data="tableData" 
	            v-loading.body="listLoading" 
	            :max-height="tableHeight" 
	            size="small"
	            @selection-change="handleSelectionChange"
	            fit stripe highlight-current-row>
	            <el-table-column
			      	type="selection"
			      	width="55">
			    </el-table-column>
	            <el-table-column type="index" width="60" align="center">

	            </el-table-column>
	            <el-table-column v-for="(item,index) in colModels"
	                :label="item.label" 
	                :width="item.width"
	                key="index"
	                fit
	                show-overflow-tooltip>
	                <template slot-scope="scope">
                        <span v-if="item.type === 'img'">
    	                    <img class="image image-center" width="40" height="40"
    	                        v-if="scope.row[item.prop]"
    	                        v-lazy="scope.row[item.prop]"
    	                        @click="showImage(scope.row[item.prop])" /> 
                            <span v-else></span>
                        </span>
	                    <span v-else-if="item.type === 'formatType'">
	                        {{scope.row[item.prop] | formatTypeFilter}}
	                    </span>
	                    <span v-else>
	                        {{scope.row[item.prop]}}
	                    </span>
	                </template>
	            </el-table-column>
	            <el-table-column label="操作" width="100">
	                <template slot-scope="scope">
	                    <el-button-group>
	                        <el-button type="danger" icon="el-icon-delete" size="small" 
	                            @click="handleDelete(scope.$index,scope.row)">删除</el-button>
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
	            @click.native="layer_showImage = false">
	            <img class="image" :src="showPicUrl" />
	        </el-dialog>
	    </div>
	</div>
</template>
<script>
import { ObjectMap, deepClone } from '@/utils'
import { queryFeedbackByPageApi, saveFeedbackApi } from '@/api/userManage'

export default {
    name: 'feedbackTable',
    props: {
	    type: {
	      	type: Number,
	      	default: 0
	    },
	    formData: {
	    	type: Object,
	    	default: function(){
	    		return {
		    		feedbackType: '',
	                startTime: '',
	                endTime: '',
	                keyword: ''
	            }
	    	}
	    },
	    dateTime: {
	    	type: Array,
	    	default: function(){
	    		return []
	    	}
	    }
	},
    filters: {
        formatTypeFilter(val){
            const filterObj = {
                '1' : '建议',
                '2' : 'BUG反馈',
                '3' : '投诉'
            }
            return filterObj[val]
        }
    },
    data() {
        return {
            colModels:[
                { prop:'mobile', label: '手机号码', width: 120},
                { prop:'realName', label: '姓名'},
                { prop:'gmtCreate', label: '时间', width: 180},
                { prop:'feedbackType', label: '类型', width: 100, type: 'formatType'},
                { prop:'content', label: '内容'},
                { prop:'picUrl', label: '照片', width: 0, type: 'img'}
            ],
            tableHeight: 300,
            tableData: [],
            total: null,
            pageItems: {
                pageNo: 1,
                pageSize: 20
            },
            privateFormData: {},
            privateDateTime: [],
            multipleSelection: [],
            searchParams: {},
            pageSizeList: [10, 20, 30, 50],
            showPicUrl: '',
            layer_showImage: false
        }
    },
    created(){
    	this.privateFormData = deepClone(this.formData)
    	this.privateDateTime = deepClone(this.dateTime)
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
        /* 查看图片 */
        showImage(picUrl){
            if (!picUrl) {
                return false;
            }
            this.showPicUrl = picUrl;
            this.layer_showImage = true;
        },
        /* 多选 */
        handleSelectionChange(val){
        	this.multipleSelection = val;
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
        /* 列表渲染，数据请求 */
        getGridData(params) {
            this.listLoading = true;
            this.searchParams = Object.assign(deepClone(params), deepClone(this.privateFormData));
            this.searchParams.sourceType = this.type * 1 + 1;
            queryFeedbackByPageApi(ObjectMap(this.searchParams)).then(response => {
                this.tableData = response.data.content;
                this.total = response.data.totalElements;
                this.listLoading = false;
            })
        },
        searchParam(){
            this.getGridData(this.pageItems);
        },
        /* 删除 */
        handleDelete(index,row,type){
        	let needDeleteList = [], confirmContent = '';
        	if (type == 'multi') {
        		if (this.multipleSelection.length == 0) {
        			this.$message.error('请选择需要删除的数据');
        			return false;
        		}
        		this.multipleSelection.map((item) => {
        			item.isDelete = 1;
        		});
        		needDeleteList = this.multipleSelection;
        		confirmContent = `已选择${this.multipleSelection.length}条数据`;
        	}else{
        		row.isDelete = 1;
                needDeleteList = [row];
                confirmContent = '此操作将永久删除该数据';
        	}
            this.$confirm(`${confirmContent}, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.saveData(needDeleteList);
            }).catch(() => {})
        },
        /* 保存 */
        saveData(params,type){
            let savePatams = deepClone(params);
            saveFeedbackApi(savePatams).then(response => {
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
    watch:{
        formData:{
			handler(val){
	        	this.privateFormData = val;
	        	console.log(val)
	        },
	        deep:true
	    },
        dateTime(val){
        	this.privateDateTime = val;
        	console.log(val)
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
	.dialog-image .el-dialog{
        background: inherit;
        box-shadow: none;
    }
</style>
