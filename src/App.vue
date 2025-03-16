<template>
  <div id="app">
    <Header></Header>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)" v-show="isAuth">
        <el-menu>
          <el-menu-item index="1" @click="toArrange">排课</el-menu-item>
          
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>统计分析</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="toUsage">教室利用率</el-menu-item>
              <el-menu-item index="2-2" @click="toQuantity">教师排课量</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="3" >功能1</el-menu-item>
          <el-menu-item index="4">功能2</el-menu-item>

        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header"
import { mapState } from "vuex";


export default {
  name: 'App',
  components: {
    Header
  },
  computed:{
    ...mapState(['isAuth'])
  },
  methods:{
    toArrange(){
      this.$router.push('/arrange').catch(err=>{})
    },
    toUsage(){
      this.$router.push('/analysis/usage').catch(err=>{})
    },
    toQuantity(){
      this.$router.push('/analysis/quantity').catch(err=>{})
    }
  }
}
</script>

<style>

</style>
