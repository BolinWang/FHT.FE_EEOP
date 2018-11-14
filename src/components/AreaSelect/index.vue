<template>
  <div>
    <el-cascader
      :placeholder="placeholder"
      :disabled="disabled"
      :options="options"
      :size="size"
      :clearable="clearable"
      :filterable="filterable"
      :change-on-select='changeOnelect'
      :show-all-levels="showAllLevels"
      v-model="selectedOptions"
      @change="handleChange"
      style="width:100%">
    </el-cascader>
  </div>
</template>
<script>
import areaData from './cityData'
import { deepClone } from '@/utils'
export default {
  name: 'areaselect',
  props: {
    value: {
      ype: Array,
      default() {
        return []
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    filterable: {
      type: Boolean,
      default: true
    },
    changeOnelect: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 1, // -1->省  0->省/城市/地区 1->省/城市/地区
      validator: (val) => [-1, 0, 1].indexOf(val) > -1
    },
    size: {
      type: String,
      default: 'small'
    },
    showAllLevels: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      options: areaData,
      selectedOptions: []
    }
  },
  methods: {
    handleChange(selected) {
      this.$emit('input', selected)
    }
  },
  created() {
    if (Array.isArray(this.value)) {
      this.selectedOptions = this.value.map(key => { return parseInt(key) })
    }

    if (this.level !== 1) {
      const data = deepClone(areaData)
      data.forEach((item, index) => {
        if (this.level === -1) {
          delete item.children
        } else if (this.level === 0) {
          item.children.forEach((v, i) => {
            delete v.children
          })
        }
      })
      this.options = data
    }
  },
  watch: {
    value(val) {
      this.selectedOptions = val
    }
  }
}
</script>
