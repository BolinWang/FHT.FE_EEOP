<template>
  <div>
    <el-form ref="roomDetailModel" :model="roomDetailModel" :rules="roomDetailModelRules" label-width="100px" size="small">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="公寓" prop="estateName" disabled>
            <el-input v-model="estateInfo.estateName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="楼层" prop="">
            <el-select v-model="roomDetailModel.floorId" placeholder="请选择">
              <el-option v-for="item in floorList" :key="item.floorId" :label="item.floorName" :value="item.floorId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="起始房号" prop="">
            <el-input v-model="roomDetailModel.startNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="末尾房号" prop="">
            <el-input v-model="roomDetailModel.endNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="跳过尾号" prop="">
            <el-select v-model="roomDetailModel.skipNo" multiple placeholder="请选择">
              <el-option v-for="(item, index) in 10" :key="index" :label="index" :value="index">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房间类型" prop="">
            <el-select v-model="roomDetailModel.roomTypeId" placeholder="请选择">
              <el-option v-for="(item, index) in 10" :key="index" :label="index" :value="index">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="室卫厅">
            <el-row :gutter="10">
              <el-col :span="6">
                <el-input v-model="roomDetailModel.chamberCount"></el-input>
              </el-col>
              <el-col :span="2">
                室
              </el-col>
              <el-col :span="6">
                <el-input v-model="roomDetailModel.toiletCount"></el-input>
              </el-col>
              <el-col :span="2">
                卫
              </el-col>
              <el-col :span="6">
                <el-input v-model="roomDetailModel.boardCount"></el-input>
              </el-col>
              <el-col :span="2">
                厅
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
              <el-form-item label="面积" prop="">
                <el-input v-model="roomDetailModel.roomArea">
                  <template slot="append">m<sup>2</template>
                </el-input>
              </el-form-item>
            </el-col> -->
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomDetailModel: {},
      roomDetailModelRules: {},
      estateInfo: {},
      floorList: []
    }
  }
}
</script>

<style>
</style>
