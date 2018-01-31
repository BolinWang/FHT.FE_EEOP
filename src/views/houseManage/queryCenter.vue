<template>
    <div class="app-container">
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane v-for="(item,index) in tabMapOptions" :label="item" :key='index' :name="item">
                <!-- <keep-alive> -->
                    <query-center-comp v-if='activeName==item' ref="querycenter" :housing-type="index * 1 + 1"></query-center-comp>
                <!-- </keep-alive> -->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import queryCenterComp from './components/queryCenterComp'
export default {
    name: 'queryCenter',
    components: {queryCenterComp},
    data() {
        return {
            tabMapOptions:['集中式','分散式'],
            activeName: '集中式'
        }
    },
    methods: {
        
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


