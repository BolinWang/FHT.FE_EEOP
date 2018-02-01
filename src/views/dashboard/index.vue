<template>
    <div class="dashboard-container">
        <p style="margin-top: 0;">{{roles | rolesFilter}}{{name}}，欢迎进入复恒科技运营平台</p>
        <div class="img-banner"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import bannerPic from '@/assets/banner1.jpg'
    export default {
        name: 'dashboard',
        filters:{
            rolesFilter(value){
                return value == 'admin' ? '【超级管理员】' : '【普通用户】'
            }
        },
        data() {
            return {
                bannerPic: bannerPic
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
        padding: 20px;
        .img-banner{
            height: 50vh;
            border-radius: 10px;
            background-color: #2d3a4b;
            background-image: url(../../assets/banner1.jpg);
            background-size: cover;
            background-position: center center;
        }
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
