<template>
    <div class="app-container">
        <div class="model-search text-right">
            <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" v-waves @click.native="handleAdd">新增账号</el-button>
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
                        <span v-if="item.type == `formatAdmin`">
                            {{scope.row[item.prop] | formatAdminFilter}}
                        </span>
                        <span v-else>
                            {{scope.row[item.prop]}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-button type="warning" icon="el-icon-refresh" size="small" @click.native="resetUserPsw(scope.$index,scope.row)">密码重置</el-button>
                            <el-button type="danger" icon="el-icon-delete" size="small" 
                                v-if="scope.row.isAdmin != 1"
                                @click.native="deleteUser(scope.$index,scope.row)">删除</el-button>
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

        <!-- 新增账号 -->
        <div class="dialog-info">
            <el-dialog 
                title="新增账号" 
                :visible.sync="layer_showInfo" width="600px"
                @close="dialogClose">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model.number="ruleForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="layer_showInfo = false" size="small">取 消</el-button>
                    <el-button type="primary" size="small" @click="handleSaveData">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, ObjectMap, deepClone } from '@/utils'
import { getGridApi, saveDataApi } from '@/api/userManage'
import { validateMobile } from '@/utils/validate'

export default {
    name: 'userList',
    directives: {
        waves
    },
    filters: {
        formatAdminFilter(val){
            return val == 1 ? `超级管理员` : `普通用户`
        }
    },
    data() {
        const validatePhone = (rule, value, callback) => {
            if (!validateMobile(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (value.length < 6) {
                callback(new Error('密码不能小于6位'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        const validateCheckPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            colModels:[
                { prop:'name', label: '用户名'},
                { prop:'mobile', label: '手机号码', width: 180},
                { prop:'isAdmin', label: '权限角色', type: 'formatAdmin'},
                { prop:'gmtCreate', label: '创建时间', width: 180},
                { prop:'gmtModified', label: '修改时间', width: 180}
            ],
            tableHeight: 300,
            tableData: [],
            total: null,
            pageItems: {
                pageNo: 1,
                pageSize: 20
            },
            pageSizeList: [10, 20, 30, 50],
            pop_visible: false,
            layer_showInfo: false,
            ruleForm: {
                mobile: '',
                password: '',
                checkPass: ''
            },
            rules: {
                password: [
                    { required: true, trigger: 'blur', validator: validatePass }
                ],
                checkPass: [
                   { required: true, trigger: 'blur', validator: validateCheckPass }
                ],
                mobile: [
                   { required: true, trigger: 'blur', validator: validatePhone }
                ]
            }
        }
    },
    created(){
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
        handleAdd(){
            this.layer_showInfo = true;
            if (this.$refs.ruleForm) {
                this.$refs.ruleForm.clearValidate()
            }
        },
        /* 弹窗关闭时的回调 */
        dialogClose(){
            this.$refs.ruleForm.resetFields();
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
            getGridApi(ObjectMap(this.searchParams)).then(response => {
                this.tableData = response.data.content;
                this.total = response.data.totalElements;
                this.listLoading = false;
            })
        },
        /* 密码重置 */
        resetUserPsw(index,row){
            this.$confirm('此操作将重置该账号初始密码：123456, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                row.password = '123456';
                this.tableData.splice(index, 1, row);
                this.saveData(this.tableData, row.isAdmin == 1 ? 'toLogin' : '');
            }).catch(() => {})
        },
        /* 删除 */
        deleteUser(index,row){
            this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.pop_visible = false;
                row.isDelete = 1;
                this.saveData([row]);
            }).catch(() => {})
        },
        /* 保存 */
        saveData(params,type){
            let savePatams = deepClone(params);
            saveDataApi(savePatams).then(response => {
                this.layer_showInfo = false;
                if (type == 'toLogin') {
                    this.$store.dispatch('LogOut').then(() => {
                        location.reload(); // 为了重新实例化vue-router对象 避免bug
                    });
                    return false;
                }
                this.getGridData(this.pageItems);
                this.$notify({
                    title: '成功',
                    message: '操作成功',
                    type: 'success',
                    duration: 2000
                })
            });
        },
        handleSaveData(){
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.saveData([{
                        mobile: this.ruleForm.mobile,
                        password: this.ruleForm.password
                    }]);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
   
</style>


