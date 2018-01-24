<template>
    <div class="app-container">
        <div class="model-search clearfix">
           <el-form size="small" :inline="true" :model="formData">
                <el-select size="small" v-model="formData.feedbackType" 
                    placeholder="意见反馈类型" class="item-select" style="width: 150px;"
                    clearable>
                    <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker
                    v-model="dateTime"
                    size="small"
                    class="filter-item" 
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-input size="small" v-model="formData.keyword" placeholder="手机号码/姓名" class="filter-item" 
                    style="width:180px;"
                    @keydown.native.enter="searchParam">    
                </el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam" v-waves class="filter-item">查询</el-button>
                <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
                <el-button class="right" type="danger" size="small" icon="el-icon-remove" @click.native="multiDelete">批量删除</el-button>
            </el-form>
        </div>
        <el-tabs style='margin-top:10px;' v-model="activeName" type="border-card">
            <el-tab-pane v-for="(item,index) in tabMapOptions" :label="item" :key='index' :name="item">
                <!-- <keep-alive> -->
                    <feedback-table v-if='activeName==item' ref="feedbacktable"
                        :type='index'
                        :form-data='formData'
                        :date-time='dateTime'></feedback-table>
                <!-- </keep-alive> -->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import feedbackTable from './components/feedbackTable'
import { parseTime } from '@/utils'

export default {
    name: 'feedback',
    directives: {
        waves
    },
    components:{feedbackTable},
    data() {
        return {
            tabMapOptions:['租房APP','管家APP'],
            activeName: '租房APP',
            typeOptions: [
                {value: 1, label: '建议'},
                {value: 2, label: 'BUG反馈'},
                {value: 3, label: '投诉'}
            ],
            dateTime: [],
            formData:{
                feedbackType: '',
                startTime: '',
                endTime: '',
                keyword: ''
            }
        }
    },
    methods: {
        clearForm(){
            this.dateTime = [];
            this.formData = {
                feedbackType: '',
                startTime: '',
                endTime: '',
                keyword: ''
            }
            this.$refs.feedbacktable[0].searchParam();
        },
        searchParam(){
            this.$refs.feedbacktable[0].searchParam();
        },
        multiDelete(){
            this.$refs.feedbacktable[0].handleDelete(undefined, undefined, 'multi');
        }
    },
    watch:{
        dateTime(val){
            val = val || [];
            this.formData.startTime = val[0] ? parseTime(val[0]) : '';
            this.formData.endTime = val[1] ? parseTime(val[1]) : '';
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    .model-search .filter-item{
        margin-left: 10px;
    }
</style>


