<template>
  <div class="estate-device-model">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkedList" class="service-list-container" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="item in checkList" :label="item" :key="item">{{deviceMap[type][item]}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'estateDeviceGroup',
  props: [
    'type',
    'deviceMap',
    'checkedList1',
    'checkList1'
  ],
  data() {
    return {
      checkedList: [],
      checkList: [],
      checkAll: false,
      isIndeterminate: false
    }
  },
  watch: {
    checkedList1(val) {
      this.checkedList = val
    },
    checkList1(val) {
      this.checkList = val
    }
  },
  methods: {
    handleCheckAllChange(status) {
      this.checkedList = status ? this.checkList : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.checkList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkList.length
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


