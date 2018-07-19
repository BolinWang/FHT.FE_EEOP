<template>
  <el-form size="small" :model="temp" label-position="left" label-width="70px">
    <div class="clearfix">
      <el-col :span="13">
        <el-form-item label="企业名称">
         <el-input v-model="temp.companyName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="1">&nbsp;&nbsp;</el-col>
      <el-col :span="10">
        <el-form-item label="企业法人">
          <el-input :value="temp.legalPerson" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </div>
    <div class="clearfix">
      <el-col :span="13">
        <el-form-item label="社会统一信用代码" label-width="130px">
          <el-input :value="temp.unifiedSocialCreditCode" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="1">&nbsp;&nbsp;</el-col>
      <el-col :span="10">
        <el-form-item label="出房费率">
          <el-input :value="`${temp.splitFee}%`" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </div>
    <div class="clearfix">
      <el-col :span="13">
        <el-form-item label="企业联系人" label-width="90px">
         <el-input v-model="temp.name" :disabled="true">
            <template slot="append">{{temp.sex | sexFilter}}</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="1">&nbsp;&nbsp;</el-col>
      <el-col :span="10">
        <el-form-item label="手机号码">
          <el-input :value="temp.mobile | filterNum" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </div>
    <div class="clearfix">
      <el-col :span="13">
        <el-form-item label="联系人身份证" label-width="100px">
          <el-input :value="temp.idNum | filterNum" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="1">&nbsp;&nbsp;</el-col>
      <el-col :span="10">
        <el-form-item label="房源体量">
          <el-input :value="temp.volunm" :disabled="true">
          </el-input>
        </el-form-item>
      </el-col>
    </div>
    <el-form-item label="银行开户名" label-width="90px">
      <el-input :value="temp.accountName" :disabled="true"></el-input>
    </el-form-item>
    <div class="clearfix">
      <el-col :span="12">
        <el-form-item label="开户人身份证" label-width="100px">
          <el-input :value="temp.accountIdNum | filterNum" :disabled="true">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="1">&nbsp;&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item label="银行卡号">
          <el-input :value="temp.bankCardNum | filterNum" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </div>
    <div class="clearfix">
      <el-form-item label="审核结果">
        <el-radio-group v-model="fhdBusinessData.status" v-if="!temp.status || temp.status === 0">
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="2">不通过</el-radio>
        </el-radio-group>
        <el-tag v-else :type="temp.status | statusFilter">
          {{temp.status | statusStrFilter}}
        </el-tag>
        <el-input v-if="temp.status === 2" type="textarea" :rows="2" v-model="temp.reason" :disabled="true">
        </el-input>
        <div v-if="temp.status === 0 && fhdBusinessData.status === 2" style="position: relative;">
          <el-input style="position: relative;" type="textarea" :rows="2" placeholder="请输入审核不通过原因" v-model="fhdBusinessData.reason" :maxlength="30">
          </el-input>
          <span class="textNumber">还可以输入{{textNumber}}字符</span>
        </div>
      </el-form-item>
    </div>
    <el-form-item label="平台代理收租服务" style="margin-bottom: 0;">
      <div class="previewItems">
        <Preview
          :pic-list="temp.attractionFlowImage | picListFilter"
          :delete-icon="``"
          :disabled="``">
        </Preview>
      </div>
    </el-form-item>
    <el-form-item label="房源发布和租客引流服务" style="margin-bottom: 0;">
      <div class="previewItems">
        <Preview
          :pic-list="temp.proxyImage | picListFilter"
          :delete-icon="``"
          :disabled="``">
        </Preview>
      </div>
    </el-form-item>
    <el-form-item label="企业营业执照" style="margin-bottom: 0;">
      <div class="previewItems">
        <Preview
          :pic-list="temp.businessLicenseImage | picListFilter"
          :delete-icon="``"
          :disabled="``">
        </Preview>
      </div>
    </el-form-item>
    <el-form-item label="身份证照片" style="margin-bottom: 0;">
      <div class="previewItems">
        <Preview
          :pic-list="temp.idCardImage | picListFilter"
          :delete-icon="``"
          :disabled="``">
        </Preview>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import Preview from '@/components/Preview/Preview'
import { ObjectMap, deepClone } from '@/utils'
import noPic from '@/assets/noPic.jpg'
import store from '@/store'
export default {
  name: 'fhdBusiness',
  props: {
    tempData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  components: {
    Preview
  },
  computed: {
    textNumber() {
      return (30 - this.fhdBusinessData.reason.length) < 0 ? 0 : (30 - this.fhdBusinessData.reason.length)
    }
  },
  filters: {
    picListFilter(list = []) {
      return list.map((src) => {
        return {src}
      })
    },
    filterNum(val) {
      return val.replace(/\s/g,'').replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,"$1 ")
    },
    sexFilter(type) {
      const sexMap = ['先生', '女士']
      return sexMap[type - 1] || '不详'
    },
    statusFilter(status) {
      const statusMap = {
        '0': 'info',
        '1': 'success',
        '2': 'danger'
      }
      return statusMap[status] || 'info'
    },
    statusStrFilter(status) {
      const statusStrData = ['待审核', '审核通过', '审核不通过']
      return statusStrData[status] || '待审核'
    }
  },
  data() {
    return {
      temp: deepClone(this.tempData),
      fhdBusinessData: {
        status: '',
        reason: ''
      }
    }
  },
  created() {
    this.fhdBusinessData = {
      status: '',
      reason: ''
    }
  },
  watch: {
    tempData: {
      handler(val) {
        this.temp = val
        this.fhdBusinessData = {
          status: '',
          reason: ''
        }
      },
      deep: true
    },
    fhdBusinessData: {
      handler(val) {
        val.reason = val.status === 1 ? '' : val.reason
        if (this.temp.status === 0) {
          store.dispatch('UpdateFhdData', {
            data: val,
            rowData: this.temp
          })
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin: 0 5px 5px 0;
}
.textNumber {
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: #666;
  font-size: 12px;
  line-height: 1.2;
}
</style>
