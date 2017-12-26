<template>
    <div class="app-container">
        <div class="model-search clearfix">
           <el-form size="small" :inline="true" :model="formData">
                <el-button-group>
                    <el-button 
                        :type="btnType[0]"
                        :plain="btnPlain[0]"
                        size="small" 
                        icon="el-icon-star-on" 
                        @click.native="housingType = 1">集中式</el-button>
                    <el-button 
                        :type="btnType[1]"
                        :plain="btnPlain[1]"
                        size="small" 
                        icon="el-icon-star-off" 
                        @click.native="housingType = 2">分散式</el-button>
                </el-button-group>
                <el-select size="small" v-model="formData.cityId" placeholder="城市" class="filter-item item-select">   
                </el-select>
                <el-select size="small" v-model="formData.regionId" placeholder="地区" class="filter-item item-select">   
                </el-select>
                <el-select size="small" v-model="formData.subdistrictId" placeholder="公寓/小区" class="filter-item item-select">   
                </el-select>
                <el-input size="small" v-model="formData.roomCode" placeholder="输入房源编码查询" class="filter-item" 
                    style="width:180px;"
                    @keydown.native.enter="searchParam">    
                </el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
                <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
            </el-form>
        </div>
        <query-center-comp :housing-type="housingType"  @housingTypeChange="housingTypeChange"></query-center-comp>
    </div>
</template>
<script>
import fetch from '@/utils/fetch';
import waves from '@/directive/waves' // 水波纹指令
import queryCenterComp from './components/queryCenterComp'

export default {
    name: 'queryCenter',
    directives: {
        waves
    },
    components: {queryCenterComp},
    data() {
        return {
            selectData:{
                options: [],
                value:''
            },
            formData:{
                cityId: null,
                regionId: null,
                subdistrictId: null,
                roomCode: ''
            },
            housingType: 1,
            btnType: ['primary',''],
            btnPlain: [false, true]
        }
    },
    methods: {
        /* 查询 */
        searchParam(){
            console.log(this.formData);
        },
        /* 查询列表 */
        change(value) {
           
        },
        clearForm(){
            this.formData = {
                cityId: null,
                regionId: null,
                subdistrictId: null,
                roomCode: ''
            }
        },
        housingTypeChange(val){
            this.$nextTick(() => {
                this.clearForm();
                this.btnType = [...this.btnType.reverse()]
                this.btnPlain = [...this.btnPlain.reverse()]
            })
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    .model-search .filter-item{
        margin-left: 10px;
    }
    .item-select{
        width: 150px;
    }
</style>


