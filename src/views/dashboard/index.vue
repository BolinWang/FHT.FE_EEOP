<template>
    <div class="dashboard-container">
        {{roles | rolesFilter}}{{name}}，欢迎进入复恒科技运营平台
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'dashboard',
        filters:{
            rolesFilter(value){
                return value == 'admin' ? '【超级管理员】' : '【普通用户】'
            }
        },
        data() {
            return {
                data: []
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
