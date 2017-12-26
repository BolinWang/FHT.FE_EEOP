<template>
    <div class="dashboard-container">
        <el-carousel>
            <el-carousel-item v-for="item in Math.ceil(data.length/3)" :key="item">
                <div class="" v-for='test in data.slice((item - 1) * 3,(item * 3 > data.length ? data.length : item * 3))' :key="test">
                    <h3>{{ item }}-{{ test }}</h3>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'dashboard',
        data() {
            return {
                data:[1,2,3,4,5,6,7,8,9,10]
            }
        },
        computed: {
            ...mapGetters([
              'name',
              'roles'
            ])
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
