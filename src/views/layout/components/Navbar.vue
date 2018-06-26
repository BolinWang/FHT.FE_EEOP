/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:22:27
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-06-25 19:17:11
 */

<template>
  <div class="clearfix">
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <tags-view></tags-view>
      <div class="right-menu">
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <screenfull class="screenfull right-menu-item"></screenfull>
        </el-tooltip>
        <el-tooltip effect="dark" content="换肤" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"></theme-picker>
        </el-tooltip>
        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="avatar">
            <!-- <span class="user-name">{{name}}</span> -->
            <!-- <i class="el-icon-caret-bottom"></i> -->
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <el-dropdown-item>
              <span @click="layer_showUserInfo = true" style="display:block;">个人信息</span>
            </el-dropdown-item>
            <router-link class='inlineBlock' to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" style="line-height: initial">
          <div class="notification right-menu-item animated swing" :class="{hasInfos: messageData.total > 0, infinite: messageData.total > 0}">
            <el-badge :value="messageData.total || '0'" :max="10" class="item">
              <icon-svg icon-class="infos" />
            </el-badge>
          </div>
          <el-dropdown-menu slot="dropdown">
            <div class="routerToItems" v-if="messageData.total > 0">
              <el-dropdown-item class="clearfix flex" @click.native="routerTo(0)" v-if="messageData.distribute > 0">
                <span class="infos__item">您有<i class="red">{{messageData.distribute || '0'}}</i>条[分散式]房源信息待审核</span>
                <el-button type="text">前往审核</el-button>
              </el-dropdown-item>
              <el-dropdown-item class="clearfix flex" @click.native="routerTo(1)" v-if="messageData.concentrate > 0">
                <span class="infos__item">您有<i class="red">{{messageData.concentrate || '0'}}</i>条[集中式]房源信息待审核</span>
                <el-button type="text">前往审核</el-button>
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
    <!-- 个人信息 -->
    <el-dialog title="个人信息" :visible.sync="layer_showUserInfo" width="600px" @close="dialogClose">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="layer_showUserInfo = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="handelSaveUserInfo">确定并重新登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Hamburger from '@/components/Hamburger';
import ThemePicker from '@/components/ThemePicker'
import Screenfull from '@/components/Screenfull'
import { default as TagsView } from './TagsView'
import { saveSelfDetailApi, queryMessageQuantityApi } from '@/api/userManage'
import { ObjectMap } from '@/utils'

export default {
  components: {
    TagsView,
    Hamburger,
    ThemePicker,
    Screenfull
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value && value.length < 6) {
        callback(new Error('密码不能小于6位'));
      } else {
        callback();
      }
    }
    return {
      layer_showUserInfo: false,
      ruleForm: {
        name: this.$store.state.user.name,
        password: ''
      },
      rules: {
        password: [
          { trigger: 'blur', validator: validatePass }
        ],
        name: [
          { required: true, trigger: 'blur', validator: validateName }
        ]
      },
      intervalId: null
    }
  },
  created() {
    clearInterval(this.intervalId)
    this.getMessageInfos()
  },
  destroyed () {
    clearInterval(this.intervalId)
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'messageData'
    ])
  },
  methods: {
    // 一分钟查询一次消息
    getMessageInfos() {
      let _this = this
      _this.intervalId = setInterval(() => {
        _this.getMessageQuantity()
      }, 60000)
      _this.getMessageQuantity()
    },
    getMessageQuantity() {
      queryMessageQuantityApi().then(response => {
        const responseData = response.data
        const stateMessageData = this.$store.state.app.messageData
        if (JSON.stringify(stateMessageData) != JSON.stringify(responseData)) {
          this.$store.dispatch('UpdateMessageData', response.data || {})
        }
      })
    },
    routerTo(type) {
      this.$router.push({
        path: '/auditManage/auditPublishList',
        query: { type: type }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handelSaveUserInfo() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          saveSelfDetailApi(ObjectMap(this.ruleForm)).then(response => {
            this.layer_showUserInfo = false;
            this.$store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    dialogClose() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.infos__item {
  display: inline-block;
  width: 220px;
  .red {
    color: red;
  }
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 54px;
    height: 49px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    position: absolute;
    right: 150px;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 2px;
    }
    .screenfull {
      height: 40px;
      padding: 4px;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      vertical-align: 1px;
    }
    .theme-switch {
      vertical-align: 16px;
    }
    .notification {
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      vertical-align: 10px;
      margin-right: 30px;
      .svg-icon {
        font-size: 30px;
        color: #bababa;
      }
    }
    .hasInfos {
      .svg-icon {
        color: #f56c6c;
      }
    }
    .avatar-container {
      height: 50px;
      // margin-right: 10px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
      }
      .user-name {
        position: relative;
        top: -5px;
        display: inline-block;
        max-width: 80px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 100%;
      }
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 4px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
