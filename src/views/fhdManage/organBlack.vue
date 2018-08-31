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
              <el-input
              size="small"
              placeholder="房东／房东手机号码"
              style="width:180px;"
              @keydown.native.enter="searchParam"
              class="filter-item">
              </el-input>
                <el-button type="primary" size="small" icon="el-icon-search" @click.native="searchParam"  class="filter-item">查询</el-button>
                <el-button plain size="small" icon="el-icon-remove-outline" @click.native="clearForm">清空</el-button>
                <el-button type="primary" class="btn-right" size="small" @click.native="exportExcel">机构解除合作</el-button>
            </el-form>
        </div>
        <div class="table-box" :style="styleHeight">
           <el-table
            :data="tableData3"
            :max-height="tableHeight"
            style="width: 100%">
            <el-table-column
              prop="date"
              label='解除合作时间'
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="机构名称">
            </el-table-column>
            <el-table-column
              prop="address"
              label="手机号码">
            </el-table-column>
             <el-table-column
              prop="address"
              label="类型">
            </el-table-column>
            <el-table-column
              width="220"
              label="操作">
               <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editOrgan(scope.$index, tableData4)"
                  type="text"
                  size="small">
                  备注信息
                </el-button>
                <el-button
                  @click.native.prevent="remarkOrgan(scope.$index, tableData4)"
                  type="text"
                  size="small">
                   恢复合作
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tableHeight:300,
      tableData4: [{
          date: '2016-05-03 11:10:00',
          name: '王小虎',
          province: '18502710534',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
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
  computed: {
    styleHeight () {
      return {
        width: '100%',
        height: this.tableHeight + 'px'
      }
    }
  },
  mounted () {
    let temp_height = document.body.clientHeight - 190
        this.tableHeight = temp_height > 300 ? temp_height : 300;
        window.onresize = () => {
        return (() => {
            temp_height = document.body.clientHeight - 190;
            this.tableHeight = this.tableHeight = temp_height > 300 ? temp_height : 300;
        })()
      }
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
    .btn-right{
      float:right;
    }
</style>

