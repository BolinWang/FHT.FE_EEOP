/*
 * @Author: ghost 
 * @Date: 2018-10-20 04:20:02 
 * @Last Modified by: ghost
 * @Last Modified time: 2018-11-02 17:01:33
 */
<template>
  <div class="container">
    <el-tabs tab-position="top" @tab-click="searchBooking">
      <el-tab-pane label="租房预约" >
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
      tabActive: ''
    }
  },
  methods: {
    searchBooking(tab) {
      console.log(tab.index)
      this.tabActive = tab.index === '0'
        ? this.$refs.bookingAnApartment.searchParam() : this.$refs.customersList.searchParam()
    }
  }
}
</script>
<style lang="scss" scoped>
 .container{
    padding:15px;
  }
</style>

