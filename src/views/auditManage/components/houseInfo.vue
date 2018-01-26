<template>
	<el-form size="small" :model="temp" label-position="left" label-width="70px" style='width: 620px; margin-left:20px;'>
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
        <div class="clearfix">
            <el-col :span="17">
                <el-form-item label="套房信息">
                    <el-input :value="temp.addressName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;&nbsp;</el-col>
            <el-col :span="6">
                <el-form-item label="房源层高">
                    <el-input :value="temp.zoneName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </div>
        <div class="clearfix">
            <el-col :span="8">
                <el-form-item label="户型信息">
                    <el-input :value="temp.addressName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;&nbsp;</el-col>
            <el-col :span="8">
                <el-form-item label="看房电话">
                    <el-input :value="temp.addressName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;&nbsp;</el-col>
            <el-col :span="6">
                <el-form-item label="装修风格">
                    <el-input :value="temp.zoneName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </div>
        <el-form-item label="公共设施">
            <el-tag type="success" v-for="(item,index) in facilityItems" key="index">
                {{item}}
            </el-tag>
        </el-form-item>
        <el-form-item label="房源描述">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.introduction" :disabled="true">
            </el-input>
        </el-form-item>
        <div class="clearfix">
            <el-col :span="8">
                <el-form-item label="房间信息">
                    <el-input :value="temp.estateName" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </div>
        <el-form-item label="房间设施">
            <el-tag type="success" v-for="(item,index) in facilityItems" key="index">
                {{item}}
            </el-tag>
        </el-form-item>
        <el-form-item label="审核结果">
            <el-radio-group v-model="temp.radioValue">
                <el-radio :label="2">通过</el-radio>
                <el-radio :label="1">不通过</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="公寓照片">
            <Preview :pic-list="temp.picList"></Preview>
        </el-form-item>
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
            facilityItems: ["柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin',"柏林",'bolin'],
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
