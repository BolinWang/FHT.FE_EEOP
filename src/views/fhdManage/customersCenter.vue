/*
 * @Author: ghost 
 * @Date: 2018-10-20 04:20:02 
 * @Last Modified by: ghost
 * @Last Modified time: 2018-10-22 10:01:09
 */
<template>
  <div class="container">
    <el-tabs tab-position="top">
      <el-tab-pane label="房租预约">
        <BookingAnApartment ref="bookingAnApartment"></BookingAnApartment>
      </el-tab-pane>
      <el-tab-pane label="客源列表">
        <CustomersList ref="customersList"></CustomersList>
      </el-tab-pane>
   </el-tabs>
  </div>
</template>
<script>
import BookingAnApartment from './components/bookingAnApartment'
import CustomersList from './components/customersList'
export default {
  components: {
    BookingAnApartment,
    CustomersList
  },
  data() {
    return {

    }
  },
  methods: {
    searchParam() {

    }
  }
}
</script>
<style lang="scss" scoped>
 .container{
    padding:15px;
  }
</style>

