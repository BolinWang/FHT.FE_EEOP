<template>
  <div class="batch-copy-container">
    <el-row type="flex" justify="center" class="model-head">
        <el-checkbox label="当前房间已是该类型" v-model="options.isSelected" disabled></el-checkbox>
        <el-checkbox label="当前房间尚未选择该类型" v-model="options.noSelected" disabled></el-checkbox>
        <el-checkbox label="当前房间正在选择该类型" v-model="options.activeSelected" @change="options.activeSelected = true"></el-checkbox>
    </el-row>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>请选择要应用该房型的房间</span>
        <div class="check-all">
          <el-form :inline="true" size="mini">
            <el-form-item :label="checkAll ? '取消全选' : '全选'">
              <el-switch v-model="checkAll" @change="handleCheckAllChange"></el-switch>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-row v-for="(val, key, index) in roomList" :key="index">
        <el-col :span="4">
          <el-checkbox :label="key" v-model="checkedFloor[key]" @change="handleCheckFloorChange(key)"></el-checkbox>
        </el-col>
        <el-col :span="20">
          <el-checkbox-group v-model="checkedObj[key]">
            <el-checkbox
              v-for="v in val"
              :key="v.roomCode"
              :label="v.roomCode"
              :disabled="allRoomList[key].isDisabled.includes(v.roomCode)"
              @change="handleRoomChange(key)">
              {{v.roomNo}}
            </el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
export default {
  props: [
    'roomList',
    'roomTypeList',
    'visible',
    'curIndex'
  ],
  data() {
    return {
      checkedObj: {},
      checkedFloor: {},
      allRoomList: {},
      checkAll: false,
      options: {
        isSelected: true,
        noSelected: false,
        activeSelected: true
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler: function (val) {
        if (val) {
          this.checkedList = this.roomTypeList[this.curIndex].roomCodes
          const allRoomList = {}
          const checkedObj = {}
          const checkedFloor = {}
          Object.keys(this.roomList).forEach((key, index) => {
            checkedFloor[key] = false
            allRoomList[key] = {}
            allRoomList[key].allRoom = this.roomList[key].map(v => v.roomCode)
            allRoomList[key].activeRoom = allRoomList[key].allRoom.filter((n) => !this.checkedList.includes(n))
            allRoomList[key].isDisabled = allRoomList[key].allRoom.filter((n) => !allRoomList[key].activeRoom.includes(n))
            checkedObj[key] = allRoomList[key].isDisabled
          })

          this.$set(this, 'allRoomList', allRoomList)
          this.$set(this, 'checkedObj', checkedObj)
          this.$set(this, 'checkedFloor', checkedFloor)
        }

        Object.keys(this.checkedObj).forEach((key, index) => {
          this.handleRoomChange(key)
        })
      }
    }
  },
  methods: {
    handleCheckFloorChange(key) {
      this.$set(this.checkedObj, key, this.checkedFloor[key] ? this.allRoomList[key].allRoom : this.allRoomList[key].isDisabled)
      this.checkAll = Object.keys(this.checkedFloor).length === Object.keys(this.checkedFloor).filter(v => this.checkedFloor[v] === true).length
    },
    handleRoomChange(key) {
      let checkedCount = this.checkedObj[key].length
      this.checkedFloor[key] = checkedCount === this.allRoomList[key].allRoom.length
      this.checkAll = Object.keys(this.checkedFloor).length === Object.keys(this.checkedFloor).filter(v => this.checkedFloor[v] === true).length
    },
    handleCheckAllChange(val) {
      Object.keys(this.checkedObj).forEach((key, index) => {
        this.checkedFloor[key] = val ? true : false
        this.$set(this.checkedObj, key, val ? this.allRoomList[key].allRoom : this.allRoomList[key].isDisabled)
      })
    },
    saveSelectedRoom() {
      let saveRoomList = []
      Object.keys(this.checkedObj).forEach((key, index) => {
        saveRoomList = saveRoomList.concat(this.checkedObj[key])
      })
      let roomTypeList = deepClone(this.roomTypeList)
      roomTypeList[this.curIndex].roomCodes = saveRoomList
      this.$store.commit('UPDATE_ESTATE_DETAIL_DATA', {
        roomTypeList: roomTypeList
      })
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.batch-copy-container {
  .model-head {
    margin-bottom: 20px;
  }
}
.check-all {
  float: right;
  position: relative;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>


