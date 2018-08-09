<template>
  <el-tabs v-model="deviceActiveTab" class="estate-device-model">
    <el-tab-pane label="配套服务" name="first">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedList.services" class="service-list-container" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in checkList.services" :label="item" :key="item">{{deviceMap['baseSupportMap'][item]}}</el-checkbox>
      </el-checkbox-group>
    </el-tab-pane>
    <el-tab-pane label="门店服务" name="second">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedList.storeServices" class="service-list-container" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in checkList.storeServices" :label="item" :key="item">{{deviceMap['storeMap'][item]}}</el-checkbox>
      </el-checkbox-group>
    </el-tab-pane>
    <el-tab-pane label="周边服务" name="third">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checkedList.surroundings" class="service-list-container" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in checkList.surroundings" :label="item" :key="item">{{deviceMap['surroundingMap'][item]}}</el-checkbox>
      </el-checkbox-group>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { deepClone } from '@/utils'
const activeTabMap = {
  first: 'services',
  second: 'storeServices',
  third: 'surroundings'
}
export default {
  name: 'estateDeviceGroup',
  props: [
    'estateDeviceModelVisible',
    'deviceMap',
    'checkList'
  ],
  data() {
    return {
      deviceActiveTab: 'first',
      checkAll: false,
      isIndeterminate: false,
      checkedList: {}
    }
  },
  computed: {
  },
  watch: {
    deviceActiveTab(val) {
      this.setStatus(this.checkedList[activeTabMap[val]].length, activeTabMap[val])
    },
    estateDeviceModelVisible: {
      immediate: true,
      handler: function (val) {
        if (val) {
          this.deviceActiveTab = 'first'
          this.$set(this, 'checkedList', deepClone(this.$store.getters.estateDeviceCheckedList))
          this.setStatus(this.checkedList[activeTabMap[this.deviceActiveTab]].length, activeTabMap[this.deviceActiveTab])
        } else {
          // this.$set(this, 'checkedList', {})
        }
      }
    }
  },
  methods: {
    handleCheckAllChange(status) {
      let curType = activeTabMap[this.deviceActiveTab]
      this.checkedList[curType] = status ? this.checkList[curType] : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      this.setStatus(value.length, activeTabMap[this.deviceActiveTab])
    },
    saveDeviceData(type) {
      if (type === 'save') {
        const curChecked ={}
        for (const key in this.checkedList) {
          curChecked[key] = this.checkedList[key].join(',')
        }
        this.$store.commit('UPDATE_ESTATE_DETAIL_DATA', curChecked)
      }
    },
    setStatus(checkedCount, curType) {
      this.checkAll = checkedCount === this.checkList[curType].length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkList[curType].length
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.estate-device-model {
  .el-checkbox {
    margin-left: 0;
    margin-bottom: 10px;
  }
  .service-list-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .el-checkbox {
      width: 25%;
    }
  }
}
</style>


