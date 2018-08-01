<template>
  <div>
    <el-cascader :placeholder="placeholder" :disabled="disabled" :options="options" :size="size" :clearable="clearable" :filterable="filterable" :show-all-levels="showAllLevels" v-model="selectedOptions" @change="handleChange" style="width:100%">
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
      default: []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    filterable: {
      type: Boolean,
      default: false
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
      default: 0, // 0->二联 1->三联
      validator: (val) => [0, 1].indexOf(val) > -1
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
      this.$emit('input', selected);
    }
  },
  created() {
    if (Array.isArray(this.value)) {
      this.selectedOptions = this.value.map(key => { return parseInt(key) });
    }

    if (this.level === 0) {
      let data = deepClone(areaData)
      data.forEach((item, index) => {
        item.children.forEach((v, i) => {
          delete v.children
        })
      })
      this.options = data
    }
  },
  watch: {
    value(val) {
      this.selectedOptions = val;
    }
  }
}
</script>
