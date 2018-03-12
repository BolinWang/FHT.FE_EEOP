<template>
    <div class="app-container">
        <div class="model-search clearfix">
            <el-select size="small" v-model="formData.organizationType" 
                placeholder="联系状态" class="item-select" 
                style="width: 150px;"
                @change="searchParam"
                >
                <el-option
                    v-for="item in selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-input size="small" v-model.trim="formData.searchField" placeholder="组织名称/缩写名" class="filter-item" 
                style="width:180px;"
                @keydown.native.enter="searchParam">    
            </el-input>
            <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
            <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
            <el-button class="right" type="danger" size="small" icon="el-icon-circle-close" @click.native="disableItems">停用</el-button>
            <el-button class="right" type="success" size="small" icon="el-icon-circle-check" @click.native="enableItems">启用</el-button>
            <el-button class="right" type="primary" size="small" icon="el-icon-circle-plus-outline" @click.native="handleApply">新增组织</el-button>
        </div>
        <div class="model-table" :style="tableStyle">
            <el-table 
                :data="tableData" 
                v-loading.body="listLoading" 
                :max-height="tableHeight" 
                @selection-change="handleSelectionChange"
                size="small"
                fit stripe highlight-current-row>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column v-for="(item,index) in colModels"
                    :label="item.label" 
                    :width="item.width"
                    :key="index"
                    fit
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-tag 
                            v-if="item.type === 'status'" 
                            :type="scope.row[item.prop] | statusFilter">
                            {{scope.row[item.prop] | filterStr('status')}}
                        </el-tag>
                        <span v-else-if="item.type === 'dateStr'">
                            {{scope.row[item.prop] | dateFilter}}
                        </span>
                        <span v-else>
                            {{scope.row[item.prop]}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="small" @click.native="editData(scope.$index,scope.row)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="small" @click.native="delData(scope.$index,scope.row)">删除</el-button>
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

        <!-- 新增编辑组织 -->
        <div class="dialog-info">
            <el-dialog 
                :title="overlayTitle" 
                :visible.sync="layer_showInfo" width="800px"
                @close="dialogClose">
                <el-steps :active="active" v-if="!isEdit" finish-status="success" >
                  <el-step title="基本设置"></el-step>
                  <el-step title="权限设置"></el-step>
                  <el-step title="账号设置"></el-step>
                </el-steps>
                <el-form size="small" status-icon v-show="active == 0 ? true : false" :model="stepForm1" :rules="rules" ref="stepForm1" label-width="110px">
                    <div class="clearfix" style="margin-top: 10px">
                        <el-col :span="12">
                            <el-form-item label="企业名称" prop="organizationName">
                                <el-input 
                                v-model.trim="stepForm1.organizationName"
                                :disabled="isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="企业缩写名" prop="displayName">
                                <el-input v-model.trim="stepForm1.displayName"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="24">
                            <el-form-item label="统一社会信用码" prop="orgLicence" label-width="140px">
                                <el-input 
                                    v-model.trim="stepForm1.orgLicence"
                                    :disabled="isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="12">
                            <el-form-item label="企业注册地址">
                                <area-select v-model="areaCode"></area-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="10px">
                                <el-input v-model="stepForm1.orgAddrDetail"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="12">
                            <el-form-item label="法人姓名" prop="orgLegalPersonName">
                                <el-input 
                                    v-model="stepForm1.orgLegalPersonName"
                                    :disabled="isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="法人身份证号" prop="orgLegalPersonCardNo">
                                <el-input 
                                    v-model="stepForm1.orgLegalPersonCardNo"
                                    :disabled="isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="12">
                            <el-form-item label="联系人姓名">
                                <el-input v-model="stepForm1.orgContactName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="联系人号码">
                                <el-input v-model="stepForm1.orgContactMobile"></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </div>
                    <div class="clearfix">
                        <el-form-item label="营业执照">
                            <el-upload
                                :action="`${actionBaseUrl}/util/upload/uploadPicture`"
                                :before-upload="pictureUpload"
                                :on-preview="picturePreview"
                                :on-change="resetFile"
                                :on-error="pictureError"
                                :on-success="pictureSuccess"
                                :file-list="fileList"
                                :on-remove="pictureRemove"
                                :limit="10"
                                multiple
                                :on-exceed="handleExceed"
                                accept="image/jpg,image/jpeg,image/png"
                                list-type="picture-card">
                                <i class="el-icon-plus"></i>
                                <div slot="tip" class="el-upload__tip">单张不超过5M，最多上传10张</div>
                            </el-upload>
                        </el-form-item>
                    </div>
                    <el-switch
                      v-model="financeTrusteeshipType"
                      active-text="磐谷金融托底方"
                        active-value="2"
                        inactive-value="1"
                        :disabled="financeEdit"
                      v-if="isEdit">
                    </el-switch>
                </el-form>
                <div class="clearfix" v-show="active == 1 ? true : false">
                    <div 
                        v-for="(item,index) in permTemplate" 
                        :key="index">
                        <el-row class="mtop">
                          <el-radio 
                              v-model="organizationPermTemplateId" 
                              :label="item.organizationPermTemplateId" >
                              {{item.name}}
                          </el-radio>
                        </el-row>
                        <div class="dashed">{{item.remark}}</div>
                    </div>
                </div>
                <el-form size="small" v-show="active == 2 ? true : false" 
                :rules="rules" :model="stepForm2" ref="stepForm2" label-width="110px">
                    <div class="clearfix" style="margin-top: 10px">
                        <el-col :span="9">
                            <el-form-item label="手机号码" prop="mobile">
                                <el-input v-model="stepForm2.mobile" :disabled="isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item label="姓名" label-width="50px">
                                <el-input v-model="stepForm2.name" :disabled="isEdit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="性别" label-width="50px">
                                <el-select size="small" 
                                    v-model="stepForm2.gender"
                                    :disabled="isEdit"
                                    placeholder="性别" class="item-select">
                                    <el-option
                                        v-for="item in sexOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="12">
                            <el-form-item label="证件类型">
                                <el-select size="small" 
                                    v-model="stepForm2.cardType"
                                    :disabled="isEdit"
                                    placeholder="证件类型" class="item-select">
                                    <el-option
                                        v-for="item in cardOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="证件号码">
                                <el-input :disabled="isEdit" v-model="stepForm2.cardNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                        <el-col :span="12">
                            <el-form-item label="身份证地址">
                                <area-select :disabled="isEdit" v-model="areaCode1"></area-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="10px">
                                <el-input :disabled="isEdit" v-model="stepForm2.cardAddrDetail"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix">
                         <el-col :span="12">
                            <el-form-item label="现居住地址">
                                <area-select :disabled="isEdit" v-model="areaCode2"></area-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label-width="10px">
                                <el-input :disabled="isEdit" v-model="stepForm2.addrDetail"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="clearfix" v-if="!isEdit">
                        温馨提示：默认密码为123456，请提醒用户首次登陆后立即更改密码
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer" v-if="rowType != 3">
                    <div v-if="!isEdit">
                        <el-button type="primary" @click="changeStep(-1)" v-show="active > 0 && active < 3" size="small" >上一步</el-button>
                        <el-button type="primary" @click="changeStep(1)" v-show="active < 2" size="small" >下一步</el-button>
                        <el-button type="primary" @click="completeFn" v-show="active == 2" size="small" >完成</el-button>
                        <el-button @click="dialogClose;layer_showInfo=false" size="small">取 消</el-button>
                    </div>
                    <div v-else>
                        <el-button type="primary" @click="editFn" size="small">确定</el-button>
                         <el-button @click="dialogClose;layer_showInfo=false" size="small">取 消</el-button>
                    </div>
                    
                    
                </div>
            </el-dialog>
        </div>

        <!-- 查看图片 -->
        <div class="dialog-image">
            <el-dialog title="" width="100%" 
                :show-close="false" 
                :visible.sync="layer_showImage"
                style="text-align: center;"
                @click.native="closeDialog"
                @close="showPicUrlClose">
                <img class="image" :src="showPicUrl" />
            </el-dialog>
        </div>
    </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, ObjectMap, deepClone } from '@/utils'
import areaSelect from '@/components/AreaSelect'
import { initOrgListApi, queryTemplateListApi, updateOrgStatusAndDeleteApi, saveOrgApi, editOrgBasicInfoApi, organizationInfoApi, realNameAuthApi } from '@/api/userManage'
import { validateMobile } from '@/utils/validate'

export default {
    name: 'applyRegister',
    directives: {
        waves
    },
    components:{areaSelect},
    filters: {
        statusFilter(status) {
            const statusMap = {
                '0': 'info',
                '1': 'success',
                '2': 'danger'
            }
            return statusMap[status] || 'info'
        },
        filterStr(status, key) {
            const statusStrData = {
                'status': ['申请中','启用','停用']
            }
            if (!statusStrData[key]) {
                return '';
            } 
            return statusStrData[key][status] 
                    || (key == 'status' ? '申请中' : '');             
        },
        dateFilter(value) {
            return `${parseTime(value)} `;
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
        return {
            rules: {
                organizationName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                displayName: [
                    { required: true, message: '请输入企业缩写名', trigger: 'blur' }
                ],
                orgLicence: [
                    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
                ],
                orgLegalPersonName: [
                    { required: true, message: '请输入法人姓名', trigger: 'blur' }
                ],
                orgLegalPersonCardNo: [
                    { required: true, message: '请输入法人身份证号', trigger: 'blur' }
                ],
                mobile: [
                    { validator: validatePhone, required: true,trigger: 'blur' }
                ]
                
            },
            selectOptions: [
                {label: '系统', value: 1},
                {label: '公司企业', value: 2},
                {label: '个人', value: 3}
            ],
            sexOptions: [
                {label: '男', value: 1},
                {label: '女', value: 2}
            ],
            cardOptions: [
                {label: '身份证', value: 1},
            ],
            listLoading: false,
            financeEdit: false,
            financeTrusteeshipType: "",
            colModels:[
                { prop:'organizationName', label: '组织名称', width: 150},
                { prop:'displayName', label: '缩写名'},
                { prop:'organizationId', label: '组织ID'},
                { prop:'status', label: '状态', type:'status'},
                { prop:'gmtCreate', label: '创建时间', type:'dateStr'},
                { prop:'gmtModified', label: '修改时间', type:'dateStr'}
            ],
            stepForm1: {
                organizationName: '',
                displayName: '',
                orgLicence: '',
                orgAddrDetail: '',
                orgLegalPersonName: '',
                orgLegalPersonCardNo: '',
                orgContactName: '',
                orgContactMobile : '',
                orgAddrProvinceId: '',
                orgAddrCityId: '',
                orgAddrRegionId: '',
                status: 1,
                type:2,
                picList: []
            },
            permTemplate: [],
            organizationPermTemplateId: '',
            stepForm2: {
                name: '',
                gender: '',
                cardType: 1,
                cardNo: '',
                mobile: '',
                cardAddrProvinceId: '',
                cardAddrCityId: '',
                cardAddrRegionId: '',
                cardAddrDetail: '',
                addrProvinceId: '',
                addrCityId: '',
                addrRegionId: '',
                addrDetail: ''
            },
            actionBaseUrl: process.env.BASE_API,
            active: 0,
            areaCode:[],
            areaCode1:[],
            areaCode2:[],
            tableHeight: 300,
            tableData: [],
            total: null,
            btnText: '',
            rowType: '',
            uploadTips: '',
            fileList: [],
            layer_showImage: false,
            isEdit: false,
            overlayTitle: '新增组织',
            showPicUrl:'',
            pageItems: {
                pageNo: 1,
                pageSize: 20
            },
            pageSizeList: [10, 20, 30, 50],
            layer_showInfo: false,
            formData: {
                searchField: '',
                organizationType: 2
            },
            multipleSelection:[]
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
    watch: {
        isEdit(val) {
            this.overlayTitle = val ? '基本资料' : '新增组织';
        },
        'formData.organizationType'(val) {
            if (val == 3) {
                if (this.colModels.length == 5) {
                    this.colModels.splice(2,0,{ prop:'contractMobile', label: '联系电话'});
                }
            } else {
                if (this.colModels.length == 6) {
                    this.colModels.splice(2,1);
                }
            }
        }
    },
    methods: {
        handleApply(){
            this.layer_showInfo = true;
            this.isEdit = false;
            queryTemplateListApi().then(response => {
                this.permTemplate = response.data.result;
            })
        },
        changeStep(num) {
            if (this.active == 0) {
                this.$refs.stepForm1.validate((valid) => {
                  if (valid) {
                    [
                        this.stepForm1.orgAddrProvinceId,
                        this.stepForm1.orgAddrCityId,
                        this.stepForm1.orgAddrRegionId
                    ] = this.areaCode;
                    this.stepForm1.picList.map(val => {
                        val.picUrl = val.url;
                    })
                    let realName = {
                        'name': this.stepForm1.orgLegalPersonName,
                        'cardNo': this.stepForm1.orgLegalPersonCardNo
                    }
                    realNameAuthApi(realName).then(response => {
                        this.active += num;
                    }).catch(response => {
                        
                    })
                  } else {
                    return false;
                  }
                });
            } else if(this.active == 1) {
                if (num > 0 && !this.organizationPermTemplateId) {
                    this.$message.error('请选择权限模板');
                    return false;
                } else {
                    this.active += num;
                }
                
            } else {
                this.active += num;
            }
            
            
        },
        completeFn() {
            this.$refs['stepForm2'].validate((valid) => {
              if (valid) {
                
                [
                    this.stepForm2.cardAddrProvinceId,
                    this.stepForm2.cardAddrCityId,
                    this.stepForm2.cardAddrRegionId
                ] = this.areaCode1;

                [
                    this.stepForm2.addrProvinceId,
                    this.stepForm2.addrCityId,
                    this.stepForm2.addrRegionId
                ] = this.areaCode2;
                
                let search = {
                    organizationStepOneVO: this.stepForm1,
                    organizationNewPermVO: {
                        organizationPermTemplateId: this.organizationPermTemplateId
                    },
                    organizationNewUserVO: this.stepForm2               
                }
                saveOrgApi(JSON.stringify(search)).then(response => {
                    this.layer_showInfo = false;
                    this.getGridData(this.pageItems);
                    this.resetFormData();

                })
              } else {
                return false;
              }
            });
            
        },
        editData(index,row) {

            let search = {
                organizationId: row.organizationId,
                type: row.type
            }
            this.rowType = row.type;
            organizationInfoApi(search).then(response => {
                let result = response.data.result;
                this.layer_showInfo = true;
                this.isEdit = true;
                
                if (this.rowType != 3) {
                    this.financeTrusteeshipType = result.financeTrusteeshipType.toString();
                    this.financeEdit = this.financeTrusteeshipType == '2' ? true : false; 
                    Object.keys(this.stepForm1).map(key => {
                        this.stepForm1[key] = result[key] || '';
                    });
                    this.stepForm1.organizationId = row.organizationId;
                    this.fileList = this.stepForm1.picList.map(key => {
                        return {'name':'图片','url' : key.picUrl}
                    });
                    if (this.stepForm1.picList.length == 10) {
                        this.$nextTick(() =>{
                            document.getElementsByClassName('el-upload--picture-card')[0].style.display = "none";
                        })
                    }
                    this.areaCode = [
                        result.orgAddrProvinceId,
                        result.orgAddrCityId,
                        result.orgAddrRegionId
                    ];
                } else {
                    Object.keys(this.stepForm2).map(key => {
                        this.stepForm2[key] = result[key] || '';
                    });
                    this.stepForm2.organizationId = row.organizationId;
                    this.areaCode1 = [
                        result.cardAddrProvinceId,
                        result.cardAddrCityId,
                        result.cardAddrRegionId
                    ];
                    this.areaCode2 = [
                        result.addrProvinceId,
                        result.addrCityId,
                        result.addrRegionId
                    ];
                    this.active = 2;
                }
                
                
            })
        },
        editFn() {
            
            this.$refs.stepForm1.validateField('displayName',(valid) => {
                if (!valid) {
                    [
                        this.stepForm1.orgAddrProvinceId,
                        this.stepForm1.orgAddrCityId,
                        this.stepForm1.orgAddrRegionId
                    ] = this.areaCode;
                    this.stepForm1.picList.map(val => {
                        val.picUrl = val.picUrl || val.url;
                    })

                    this.stepForm1.financeTrusteeshipType = this.financeTrusteeshipType;
                    editOrgBasicInfoApi(JSON.stringify(this.stepForm1)).then(response => {
                        this.layer_showInfo = false;
                        this.isEdit = false;
                        this.getGridData(this.pageItems);
                        this.$message.success('操作成功');
                    })
                } else {
                    return false;
                }
            })
               
            
            
        },
        resetFormData() {
            this.stepForm1 = {
                organizationName: '',
                displayName: '',
                orgLicence: '',
                orgAddrDetail: '',
                orgLegalPersonName: '',
                orgLegalPersonCardNo: '',
                orgContactName: '',
                orgContactMobile : '',
                orgAddrProvinceId: '',
                orgAddrCityId: '',
                orgAddrRegionId: '',
                status: 1,
                type:2,
                picList: []
            }
            this.organizationPermTemplateId = '';
            this.stepForm2 = {
                name: '',
                gender: '',
                cardType: 1,
                cardNo: '',
                mobile: '',
                cardAddrProvinceId: '',
                cardAddrCityId: '',
                cardAddrRegionId: '',
                cardAddrDetail: '',
                addrProvinceId: '',
                addrCityId: '',
                addrRegionId: '',
                addrDetail: ''
            };
            [
                this.areaCode,
                this.areaCode1,
                this.areaCode2
            ] = [[],[],[]]
            
            this.active = 0;
        },
        enableItems() {//启用
            if (this.multipleSelection.length == 0) {
                this.$message.error('请选择要启用的组织');
                return false;
            }
            let flag = true,
                organizationIds = [];
            this.multipleSelection.map(key => {                
                if(key.status == 1) {
                    flag = false;
                    this.$message.error('已启用的组织不能再启用');
                    return false;
                } else {
                    organizationIds.push(key.organizationId);
                }
            })
            if (flag) {
                this.$confirm('确定启用所选组织吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let search = {
                        type: 1,
                        organizationIds: organizationIds
                    }
                    updateOrgStatusAndDeleteApi(ObjectMap(search)).then(response => {
                        this.$message({
                            type: 'success',
                            message: '启用成功!'
                        });
                        this.getGridData(this.pageItems);
                    })
                })
                
            }
        },
        disableItems() {//禁用
            if (this.multipleSelection.length == 0) {
                this.$message.error('请选择要停用的组织');
                return false;
            }
            let flag = true,
                organizationIds = [];
            this.multipleSelection.map(key => {                
                if(key.status == 2) {
                    flag = false;
                    this.$message.error('已停用的组织不能再停用');
                    return false;
                } else {
                    organizationIds.push(key.organizationId);
                }
            })
            if (flag) {
                this.$confirm('确定停用所选组织吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let search = {
                        type: 2,
                        organizationIds: organizationIds
                    }
                    updateOrgStatusAndDeleteApi(ObjectMap(search)).then(response => {
                        this.$message({
                            type: 'success',
                            message: '停用成功!'
                        });
                        this.getGridData(this.pageItems);
                    })
                });
                
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delData(index,row) {
            this.$confirm('此操作将永久删除该组织, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let search = {
                    type: 3,
                    organizationIds: [row.organizationId]
                }
                updateOrgStatusAndDeleteApi(ObjectMap(search)).then(response => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getGridData(this.pageItems);
                })
                
            }).catch(() => {
                        
            });
        },
        /* 上传图片 */
        pictureUpload(file){
            const isLt5M = file.size / 1024 / 1024 <= 5
            if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) == -1) {
                this.$message.error('请上传jpg/png的图片');
                return false;
            }           
            if(!isLt5M){
                this.$message.error('请上传5Mb大小以内的图片');
                return false;
            }
            
        },
        closeDialog(){
            this.layer_showImage = false;
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制上传 10 张图片，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        pictureRemove(file, fileList) {
            this.showPicUrl = '';
            let imgList = [];

            this.$nextTick(() =>{
                document.getElementsByClassName('el-upload--picture-card')[0].style.display = "inline-block";
            })
            
            fileList.map(key => {
                if (key.response) {
                    key.url = key.response.data[0];
                }
                imgList.push(key);
            })
            this.stepForm1.picList = deepClone(imgList);
            
        },
        picturePreview(file) {
            this.showPicUrl = file.url;
            this.layer_showImage = true;
        },
        pictureSuccess(response, file, fileList){
            if (fileList.length >= 10) {
                this.$nextTick(() =>{
                    document.getElementsByClassName('el-upload--picture-card')[0].style.display = "none";
                })
            }
            this.stepForm1.picList.push({'url':file.response.data[0]})
        },
        pictureError(err,file){
            file = null;
        },
        resetFile(file){
            file = null;
        },
        showPicUrlClose(){
            this.showPicUrl = '';
        },
        /* 弹窗关闭时的回调 */
        dialogClose(){
            this.resetFormData();
            this.active = 0;
            this.fileList = [];
            this.financeEdit = false;
            this.$refs.stepForm1.clearValidate();
            this.$refs.stepForm2.clearValidate();
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
            this.searchParams = Object.assign(deepClone(params), deepClone(this.formData));
            initOrgListApi(ObjectMap(this.searchParams)).then(response => {
                this.listLoading = false;
                this.tableData = response.data.list;
                this.total = response.data.record;
                
            })
        },
        searchParam(){
            this.pageItems = {
                pageNo: 1,
                pageSize: 20
            }
            this.getGridData(this.pageItems);
        },
        clearForm(){
            this.pageItems = {
                pageNo: 1,
                pageSize: 20
            }
            this.formData = {
                searchField: '',
                organizationType: 2
            }
            this.getGridData(this.pageItems);
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    .dashed {
        border:1px dashed #ccc;
        border-radius: 5px;
        padding: 5px;
    }
    .mtop {
        margin-top: 10px;
    }
    ul.el-upload-list > li:first-child:before{
    content: '封面';
    position: absolute;
    right: -20px;
    top: -3px;
    width: 65px;
    height: 30px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 1px 1px #13ce66;
    font-size: 12px;
    line-height: 36px;
    color: #fff;
    z-index: 1;
}
</style>


