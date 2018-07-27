<template>
  <div class="guide-icon" @click.prevent.stop="guide">
    <icon-svg icon-class="guide" />
  </div>
</template>

<script>
import * as Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './defineSteps'

export default {
  name: 'guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver({
      doneBtnText: '结束引导',
      closeBtnText: '关闭',
      stageBackground: '#fff',
      nextBtnText: '下一个',
      prevBtnText: '上一个'
    })
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>
<style scoped>
.guide-icon {
  display: inline-block;
  cursor: pointer;
  color: #f56c6c;
  font-size: 40px;
  vertical-align: 5px;
}
</style>
