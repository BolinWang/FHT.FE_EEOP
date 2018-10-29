/*
 * @Author: ghost 
 * @Date: 2018-10-24 21:01:09 
 * @Last Modified by: ghost
 * @Last Modified time: 2018-10-25 10:54:03
 */
<template>
  <el-dialog
    title="客源记录"
    :visible.sync="followUpDialogVisible"
    width="40%">
    <div class="all-text">
           <div class="table-container" v-if="gridData.length">
             <div class="box" v-for="Item in gridData" :key="Item.id">
               <div class="name-box">{{Item.followTime}} {{Item.gmtCreateName}}</div>
                <div class="name-box">
                  <span class="colorType">{{Item.followType | filterCreat}}</span>
                  <div v-if="Item.remark" class="boxRemark">备注： {{Item.remark}}</div> 
                </div>
             </div>
           </div>
           <div class="table-container" v-else>
             <div class="box">
                <div class="text-empty">暂无数据</div>
             </div>
           </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="followUpDialogClose">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getcustomerFollowListApi } from '@/api/renting'
export default {
  data() {
    return {
      followUpDialogVisible: false,

      customerId: '',
      gridData: []
    }
  },
  filters: {
    filterCreat(val) {
      const followTypeList = {
        '1': '创建',
        '2': '接待',
        '3': '电话跟进',
        '4': '网络联系',
        '5': '接单',
        '6': '已放弃，转为公客',
        '7': '已签约',
        '8': '关闭',
        '9': '配房',
        '10': '开始带看',
        '11': '结束带看',
        '12': '离职交接'
      }
      return followTypeList[val]
    }
  },
  methods: {
    followUpDialogClose() {
      this.followUpDialogVisible = false
      this.customerId = ''
      this.gridData = []
    },
    getList() {
      getcustomerFollowListApi({ customerId: this.customerId }).then(res => {
        this.gridData = res.data.result
      })
    },
    showFollowList(id) {
      this.followUpDialogVisible = true
      this.customerId = id
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .box{
    min-height: 68px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  .text-empty{
      line-height: 60px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
  }
  .colorType{
    color: #5BACFB;
  }
</style>
