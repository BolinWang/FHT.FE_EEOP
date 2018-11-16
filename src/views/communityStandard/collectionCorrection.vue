/*
 * @Author: ghost 
 * @Date: 2018-11-12 14:17:21 
 * @Last Modified by: ghost
 * @Last Modified time: 2018-11-16 15:08:07
 */
<template>
  <div class="container" v-loading="loading">
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
         <el-tabs class="tab-box" v-model="statusNow" @tab-click="handleStatusClick">
           <el-tab-pane 
             :key="index"
             v-for="(instatusItem,index) in statusList" 
             :label="instatusItem.label"
             :name="instatusItem.value">
          </el-tab-pane>
         </el-tabs>
         <div class="scroll" :style="scrollHeight">
           <div class="box-none" v-if="communityList.length<=0">暂无小区数据，请先选择城市</div>
           <el-checkbox-group class="scoll-checklist"  v-model="checkList" v-else>
            <div class="scrollItem blue"
              :class="statusNow==='1'?'bule':'orange'"
              v-for='(communityListItem,index) in communityList' 
              :key='index'
              @click="goMapCenter(communityListItem)">
              <div class="checkbox">
                <el-checkbox :disabled="statusNow!=='1'" :label="communityListItem.communityId">
                  <div class="name">
                    <span>{{communityListItem.name}}</span>
                    <span class="text-btn">{{communityListItem.organizationId===0?'':'自'}}</span>
                    <span class="text-btn">{{communityListItem.status|mapStatus}}</span>
                    <span class="text-btn" v-if="communityListItem.status===3" @click="ignoreCommunity(false)">恢复忽略</span>
                  </div>
                  <el-tooltip class="item" effect="dark" :content="communityListItem.address" placement="top-start">
                    <div class="cityName">{{communityListItem.address}}</div>
                  </el-tooltip>
                </el-checkbox>
              </div>
            </div>
           </el-checkbox-group> 
         </div>
         <div class="btn-box">
           <el-button size="mini" type="primary" :disabled="communitySearchForm.status!==1&&checkList.length>0">更正小区</el-button>
           <el-button size="mini" @click='ignoreCommunity(true)' type="primary" :disabled="communitySearchForm.status!==1&&checkList.length>0">忽略小区</el-button>
           <el-button size="mini" @click="removeCheck" plain :disabled="communitySearchForm.status!==1">取消选择</el-button>
         </div>
       </div>
     </div>
    <div class="map"  :style='mapHeight' id='bm-view'></div>
   
  </div>
</template>

<script>
import areaSelect from '@/components/AreaSelect'
import { debounce } from '@/utils'
import { communityPagelistApi, queryUntreatedNumtApi, saveIgnoreApi } from '@/api/communityStandard'
const imageHtp = {
  '1': 'https://fh-mjgy-test.oss-cn-hangzhou.aliyuncs.com/blue.png',
  '2': 'https://fh-mjgy-test.oss-cn-hangzhou.aliyuncs.com/orange.png',
  '3': 'https://fh-mjgy-test.oss-cn-hangzhou.aliyuncs.com/green.png'
}

export default {
  data() {
    return {
      map: null,
      loading: false,
      nowCenter: [],
      count: '?',
      markers: [],
      tableHeight: '500px',
      communityList: [],
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
      statusNow: '1',
      communitySearchForm: {
        address: ['330000', '330100'],
        sort: 1,
        displayIgnore: false,
        status: 1,
        pageNo: 1,
        pageSize: 30
      }
    }
  },
  components: {
    areaSelect
  },
  filters: {
    mapStatus(val) {
      const statusMap = {
        1: '',
        2: '认证',
        3: '忽略'
      }
      return statusMap[val]
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
    this.searchList()
  },

  methods: {

    removeCheck() { // 取消选择
      this.checkList = []
    },
    ignoreCommunity(beal) { // 忽略小区
      const param = {
        ids: this.checkList,
        ignored: beal
      }
      saveIgnoreApi(param).then(res => {
        this.$message.success('操作成功')
        this.searchList()
      })
    },
    searchUntreatedNum() {
      queryUntreatedNumtApi({ address: this.communitySearchForm.address }).then(res => {
        this.count = res.data || '?'
      })
    },
    goMapCenter(item) {
      item.gaodeLongitude !== null && item.gaodeLatitude !== null ? this.showMapCenter(item) : this.showNoLongLati()
    },
    showMapCenter(item) {
      this.map.setZoomAndCenter(16, [item.gaodeLongitude, item.gaodeLatitude])
      const markerDia = new AMap.Marker({ // 添加聚合点
        map: this.map,
        icon: new AMap.Icon({
          image: imageHtp[item.status],
          imageSize: new AMap.Size(24, 24)
        }),
        offset: new AMap.Pixel(-26, -13),
        position: [item.gaodeLongitude, item.gaodeLatitude]
      })
      markerDia.info = new AMap.InfoWindow({
        content: `<div class="content-amap" >
                    <input onclick="go()" class='editGo' type="button" class="btn" value='编辑小区' />
                    <div class='info'>${item.name}</div>
                    <div class='info' >${item.address}</div>
                  </div>`,
        offset: new AMap.Pixel(0, 0)
      })
      markerDia.info.open(this.map, [item.gaodeLongitude, item.gaodeLatitude])
      this.addClickHandler(item, markerDia)
    },
    showNoLongLati() {
      this.$message.error('数据库告诉我 ，这个小区没坐标！')
    },
    addClickHandler(item, markerDia) { // 聚合点点击事件
      const self = this
      markerDia.on('mouseover', function(e) {
        e.target.info.open(self.map, [item.gaodeLongitude, item.gaodeLatitude])
      })
    },
    handleStatusClick() {
      this.communitySearchForm.status = this.statusNow * 1
    },
    searchList() { // 开始搜索
      this.map.remove(this.markers)
      this.markers = []
      this.loading = true
      this.searchUntreatedNum()
      communityPagelistApi(this.communitySearchForm).then(res => {
        this.communityList = res.data.result
        this.communityList.forEach(item => {
          if (item.gaodeLongitude !== null && item.gaodeLatitude !== null) {
            const markerDia = new AMap.Marker({ // 添加聚合点
              map: this.map,
              icon: new AMap.Icon({
                image: imageHtp[item.status],
                imageSize: new AMap.Size(24, 24)
              }),
              offset: new AMap.Pixel(-26, -13),
              position: [item.gaodeLongitude, item.gaodeLatitude]
            })
            markerDia.info = new AMap.InfoWindow({
              content: `<div class="content-amap">
                       <div class='info'>${item.name}</div>
                       <div class='info'>${item.address}</div>
                      </div>`,
              offset: new AMap.Pixel(0, 0)
            })
            this.markers.push(markerDia)
            this.addClickHandler(item, markerDia)
          }
        })
        this.logMapinfo()
        this.$nextTick(res => {
          this.loading = false
        })
      })
    },
    goEdit() {
      alert('12')
    },
    initBMap() {
      /* global AMap */
      this.map = new AMap.Map('bm-view', {
        zoom: 16,
        resizeEnable: true }) // 创建地图实例
    },
    logMapinfo() {
    // var zoom = this.map.getZoom() // 获取当前地图级别
      const center = this.map.getCenter() // 获取当前地图级别
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
      // this.map.setFitView() //自适应地图
    }
  }

}
</script>
<style>
 .editGo{
    position: absolute;
    top: -3px;
    border: 1px solid #ffd382;
    color: #f9b331;
    right: 3px;
    font-size: 12px;
    height: 20px;
    line-height: 16px;
  }
  .content-amap{
    position: relative;
  }
</style>

<style lang="scss" scoped>
  
  .container{
    padding: 15px;
    position: relative;
    
    .scoll-checklist{
      flex:1;
      overflow: auto;
    }
    .cityName{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      max-width: 230px;
    }
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
      overflow: auto;
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


