<template>
    <el-form size="small" :model="temp" label-position="left" label-width="70px" style='width: 640px; margin-left:20px;'>
        <div class="clearfix">
            <el-col :span="13">
                <el-form-item label="公寓名称">
                    <el-input :value="temp.addressName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;&nbsp;</el-col>
            <el-col :span="10">
                <el-form-item label="看房电话">
                    <el-input :value="temp.zoneName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </div>
        <div class="clearfix">
            <el-col :span="17">
                <el-form-item label="房源地址">
                    <el-input :value="temp.addressName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;&nbsp;</el-col>
            <el-col :span="6">
                <el-form-item label="所属板块">
                    <el-input :value="temp.zoneName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </div>
        <el-form-item label="公寓简介">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.introduction" :disabled="true">
            </el-input>
        </el-form-item>
        <el-form-item label="配套服务">
            <el-tag type="success" v-for="(item,index) in services" key="index">
                {{item}}
            </el-tag>
        </el-form-item>
        <el-form-item label="门店服务">
            <el-tag type="success" v-for="(item,index) in storeServices" key="index">
                {{item}}
            </el-tag>
        </el-form-item>
        <el-form-item label="周边设施">
            <el-tag type="success" v-for="(item,index) in surroundings" key="index">
                {{item}}
            </el-tag>
        </el-form-item>
        <el-form-item label="房间类型">
            <el-col :span="10">
                <el-input v-model="temp.styleName" :disabled="true">
                </el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="房型照片">
            <Preview :pic-list="temp.picList"></Preview>
        </el-form-item>
        <el-form-item label="关联房间" style="margin-bottom: 0"></el-form-item>
        <div class="model-table">
            <el-table 
                :data="tableData" 
                v-loading.body="listLoading" 
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
                        <span>
                            {{scope.row[item.prop]}}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-form>
</template>
<script>
import Preview from '@/components/Preview'

export default {
    name: 'houseInfo',
    props: {
        type:{
            type: String,
            default: 'audit'
        }
    },
    components:{
        Preview
    },
    data() {
        return {
            temp: {},
            tableData: [],
            listLoading: false,
            services: ["柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin'],
            storeServices: ["柏林",'bolin'],
            surroundings: ["柏林",'bolin'],
            colModels:[
                { prop:'province', label: '房号'},
                { prop:'estateName', label: '室卫厅'},
                { prop:'styleName', label: '朝向'},
                { prop:'roomCount', label: '面积(㎡)'},
                { prop:'styleName', label: '房源编号'},
                { prop:'publishTime', label: '发布时间', width: 170}
            ]
        }
    },
    created(){

    },
    mounted() {
        
    },
    methods: {
    
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
    .el-tag {
        margin: 0 5px 5px 0;
    }
</style>
