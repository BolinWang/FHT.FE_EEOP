/*
 * @Author: ghost 
 * @Date: 2018-11-12 14:17:21 
 * @Last Modified by: ghost
 * @Last Modified time: 2018-11-14 18:34:50
 */
<template>
  <div class="container">
     <div class="label-box">
        <span class='text'>未处理小区 {{count}}</span>
        <span class="circle orange"></span>
        <span class="text">认证小区</span>
        <span class="circle blue"></span>
        <span class="text">未处理小区</span>
        <span class="circle green"></span>
        <span class="text">忽略小区</span>
     </div>
     <div class="left-box">
       <el-form class="community-search-form" ref="communitySearchForm" :inline="true" :model="communitySearchForm" size="small">
         <el-form-item class="house-search-form-group" >
            <area-select style="width:250px" v-model="communitySearchForm.address" :level="1" :changeOnSelect='true' placeholder="请选择城市" :filterable="true" :showAllLevels="true"></area-select>
         </el-form-item>
         <el-form-item class="house-search-form-group" >
            <el-select style="width:120px" size="small" v-model="communitySearchForm.sort" placeholder="请选择">
              <el-option
                v-for="item in sortList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
         </el-form-item>
         <el-form-item class="house-search-form-group" >
           <el-checkbox v-model="communitySearchForm.displayIgnore">显示忽略小区</el-checkbox>
         </el-form-item>
       </el-form>
       <div class="scroll-list">
         <el-tabs class="tab-box" v-model="communitySearchForm.status" @tab-click="handleStatusClick">
           <el-tab-pane 
             :key="index"
             v-for="(instatusItem,index) in statusList" 
             :label="instatusItem.label"
             :name="instatusItem.value">
          </el-tab-pane>
         </el-tabs>
         <div class="scroll" :style="scrollHeight">
           <div class="box-none" v-if="checkList.length<=0">暂无小区数据，请先选择城市</div>
           <el-checkbox-group  v-model="checkList" v-else>
            <div class="scrollItem blue" @click="goMapCenter(item)">
              <div class="checkbox">
                <el-checkbox>
                  <div class="name">翠苑一区</div>
                  <div class="cityName">杭州市/西湖区/学院路213号</div>
                </el-checkbox>
              </div>
            </div>
           </el-checkbox-group> 
         </div>
         <div class="btn-box">
           <el-button size="mini" type="primary" :disabled="communitySearchForm.status!=='1'">更正小区</el-button>
           <el-button size="mini" type="primary" :disabled="communitySearchForm.status!=='1'">忽略小区</el-button>
           <el-button size="mini" plain :disabled="communitySearchForm.status!=='1'">取消选择</el-button>
         </div>
       </div>
     </div>
    <div class="map"  :style='mapHeight' id='bm-view'></div>
   
  </div>
</template>
<script>
import areaSelect from '@/components/AreaSelect'
import { debounce } from '@/utils'
import { communityPagelistApi } from '@/api/communityStandard'
export default {
  data() {
    return {
      map: null,
      nowCenter: [],
      searchListForm: {},
      count: '?',
      tableHeight: '500px',
      statusList: [
        {
          label: '未处理小区',
          value: '1'
        }, {
          label: '认证小区',
          value: '2'
        }
      ],
      checkList: [],
      sortList: [
        {
          label: '按正序显示',
          value: 1
        }, {
          label: '按倒序显示',
          value: 2
        }
      ],
      communitySearchForm: {
        address: ['330000', '330100'],
        sort: 1,
        displayIgnore: false,
        status: '1'
      }
    }
  },
  components: {
    areaSelect
  },
  filters: {
    mapStatus: {
      '1': '',
      '2': '',
      '3': ''
    }
  },
  computed: {
    mapHeight: function() {
      return {
        height: this.tableHeight + 'px'
      }
    },
    scrollHeight: function() {
      return {
        height: this.tableHeight - 240 + 'px'
      }
    }
  },
  watch: {
    communitySearchForm: {
      handler(newValue, oldValue) {
        console.log(newValue.address)
        if (newValue.address.length >= 2) {
          this.searchList()
        }
      },
      deep: true
    }
  },
  mounted() {
    const changeTableSize = debounce(() => {
      this.tableHeight = Math.max(document.body.clientHeight - 100, 250)
    }, 100)

    this.$nextTick(() => {
      changeTableSize()
    })
    window.addEventListener('resize', changeTableSize)
    this.initBMap()
    this.logMapinfo()
    this.searchList()
  },
  methods: {
    goMapCenter() {
      const item = {

      }
      this.map.setZoomAndCenter(14, item.data.location.split(','))
      const markerDia = new AMap.Marker({ // 添加聚合点
        map: this.map,
        icon: new AMap.Icon({
          image: item.status === true ? '//webapi.amap.com/theme/v1.2/m3.png' : '//webapi.amap.com/theme/v1.2/m1.png',
          imageSize: new AMap.Size(24, 24)
        }),
        offset: new AMap.Pixel(-26, -13),
        position: item.data.location.split(',')
      })
      markerDia.info = new AMap.InfoWindow({
        content: `<div class="content-amap">
                       <div class='info'></div>
                       <div class='info'>工作状态：${item === true ? '工作中' : '休息'}</div>
                       <div class='info'>时间:</div>
                      </div>`,
        offset: new AMap.Pixel(0, 0)
      })
      markerDia.info.open(this.map, item.data.location.split(','))
      this.addClickHandler(item, markerDia)
    },
    handleStatusClick() {

    },
    searchList() {
      communityPagelistApi(this.communitySearchForm).then(res => {
        console.log(res)
      })
    },
    initBMap() {
      /* global AMap */
      this.map = new AMap.Map('bm-view', {
        zoom: 16,
        resizeEnable: true }) // 创建地图实例
    },
    logMapinfo() {
    // var zoom = this.map.getZoom() // 获取当前地图级别
      var center = this.map.getCenter() // 获取当前地图级别
      console.log(center)
      this.nowCenter = center.toString().split(',')
      new AMap.Circle({
        map: this.map,
        center: center, // 设置线覆盖物路径
        radius: 600,
        strokeColor: '#3366FF', // 边框线颜色
        strokeOpacity: 0.3, // 边框线透明度
        strokeWeight: 3, // 边框线宽
        fillColor: '#000000', // 填充色
        fillOpacity: 0.35// 填充透明度
      })
      // this.map.setFitView()
    }
  }

}
</script>
<style lang="scss" scoped>
  .container{
    padding: 15px;
    position: relative;
    .map{
      box-shadow: 2px 2px 2px #6d7777;
    }
    .tab-box{
      padding: 0 10px;
      margin-top:15px;
      font-size: 12px;
      background: #fff;
    }
    .scroll-list{
      box-shadow: 2px 2px 2px #6d7777;
      border-radius: 4px;
    }
    .btn-box{
      display: flex;
      background: #fff;
      border-top: 2px solid #e5e5e5;
      padding:6px 4px;
      border-radius: 4px;
    }
    .scroll{
      overflow: hidden;
      background: #fff;
      padding:0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .box-none{
        flex: 1;
        font-size: 14px;
        color: #6d7777;
      }
      .scrollItem{
        display: flex;
        flex: 1;
        padding:4px;
        font-size: 12px;
        margin-bottom:2px;
        .checkbox{
          display: flex;
          align-items: center;
        }
      }
      .blue{
        background: #d2f6ff;
      }
    }
    .community-search-form{
      background: #fff;
      padding:8px;
      border-radius: 4px;
      box-shadow: 2px 2px 2px #6d7777;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      margin-bottom: 4px;
     }
    .left-box{
      width:270px;
      position:absolute;
      left: 20px;
      top:20px;
      z-index: 10;
    }
    .label-box{
      width: 380px;
      height: 36px;
      display: flex;
      line-height: 36px;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      top: 25px;
      font-size: 12px;
      color: #a2a0a0;
      background: #fff;
      right: 44px;
      padding: 0 10px;
      z-index: 10;
      box-shadow: 2px 2px 5px #6d7777;
      .circle{
        height:20px;
        width:20px;
        border-radius: 20px;
      }
      .orange{
        background: rgba(255, 152, 0, 0.82);
      }
      .blue{
        background: rgba(56, 202, 236, 0.87);
      }
      .green{
        background: rgba(101, 178, 101, 0.88);
      }
    }
  }
  .map{
    height:200px;
  }

</style>
<style>
  .tab-box .el-tabs__item{
    font-weight: 400;
    color: #080808;
  }
  .checkbox .el-checkbox {
    display: flex;
    align-items: center;
}
</style>


