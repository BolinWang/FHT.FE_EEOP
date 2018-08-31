/*
 * @Author: ghost 
 * @Date: 2018-08-31 11:27:54 
 * @Last Modified by: ghost 
 * @Last Modified time: 2018-08-31 11:27:54 
 */

 <template>
 <div class="container">
     <div class="model-search clearfix">
        <el-form size="small" :inline="true" :model="formData" >
           <el-date-picker
             v-model="dateTime"
             size="small" 
             type="datetimerange" 
             class="filter-item" 
             ange-separator="至" 
             start-placeholder="开始日期" 
             end-placeholder="结束日期" 
             style="width:300px"
             @change="searchParam"
             >
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
 </div>
</template>
