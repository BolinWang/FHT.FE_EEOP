/*
 * @Author: ghost
 * @Date: 2018-08-31 14:55:54
 * @Last Modified by: ghost
 * @Last Modified time: 2018-08-31 14:55:54
 */
<template>
 <div class="container">
     <div class="model-search clearfix">
        <el-form size="small" :inline="true" :model="formData" >
          <el-date-picker
            type="date"
            class="filter-item"
            placeholder="选择日期">
          </el-date-picker>
          <el-input v-model="formData.customerKeyword"
           size="small"
           placeholder="房东／房东手机号码"
           style="width:180px;"
           @keydown.native.enter="searchParam"
           class="filter-item">
           </el-input>
           <el-input v-model="formData.customerKeyword"
            size="small"
            placeholder="城市管家／手机号码"
            style="width:180px;"
            @keydown.native.enter="searchParam"
            class="filter-item">
            </el-input>
            <el-select size="small" style="width:180px;" v-model="formData.cityId" placeholder="机构类型" class="filter-item" >
              <el-option v-for="item in organList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam"  class="filter-item">查询</el-button>
            <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
            <el-button type="primary" size="small" icon="el-icon-upload" @click.native="exportExcel">导出</el-button>
        </el-form>
     </div>
     <div class="table-box">
        <el-table
          :data="tableData4"
          style="width: 100%"
          size="small"
          :max-height="tableHeight">
           <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            fixed
            prop="date"
            label="创建时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="机构名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="province"
            label="手机号码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="city"
            label="类型"
            width="70">
          </el-table-column>
          <el-table-column
            prop="name"
            label="费率"
            width="80">
          </el-table-column>
          <el-table-column
            prop="province"
            label="是否绑卡"
            width="80">
          </el-table-column>
          <el-table-column
            prop="city"
            label="自报体量"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="身份证照片"
            width="90">
          </el-table-column>
          <el-table-column
            prop="province"
            label="平台代理收租服务"
            width="120">
          </el-table-column>
          <el-table-column
            prop="city"
            label="房源发布和租客引流服务"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="分散式间数（飞虎队）"
            width="120">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="分散式间数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="飞虎队在住房间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="租客线上交租单数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="租客线下交租单数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="租客线下交租单数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="城市管家"
            width="120">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="手机号码"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editOrgan(scope.$index, tableData4)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  @click.native.prevent="remarkOrgan(scope.$index, tableData4)"
                  type="text"
                  size="small">
                  备注信息
                </el-button>
              </template>
          </el-table-column>
     </el-table>
   </div>
 </div>
</template>
<script>
export default {
  data(){
    return {
      formData:{

      },
      organList:[{
        value:1,
        label:'个人',
      },{
        value:2,
        label:'企业'
      }],
      tableHeight:300,
      tableData4: [{
          date: '2016-05-03 11:10:00',
          name: '王小虎',
          province: '18502710534',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-03 11:10:00',
          name: '王小虎',
          province: '18502710534',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-03 11:10:00',
          name: '王小虎',
          province: '18502710534',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-03 11:10:00',
          name: '王小虎',
          province: '18502710534',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-03 11:10:00',
          name: '王小虎',
          province: '18502710534',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-03 11:10:00',
          name: '王小虎',
          province: '18502710534',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-03 11:10:00',
          name: '王小虎',
          province: '18502710534',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
    }
  },
  mounted(){
     let temp_height = document.body.clientHeight - 170
        this.tableHeight = temp_height > 300 ? temp_height : 300;
        window.onresize = () => {
        return (() => {
            temp_height = document.body.clientHeight - 170;
            this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300;
        })()
      }
  },
  methods: {
    searchParam(){

    },
  }
}
</script>
<style scoped>
 .container {
  padding: 20px;
}
.table-box {
  margin-top: 20px;
  border: 1px solid #e5e5e5;
}
</style>
