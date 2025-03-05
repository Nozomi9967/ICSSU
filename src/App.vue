<template>
  <div id="app">
    <Header></Header>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)" v-show="isAuth">
        <el-menu>
          <el-menu-item index="1" @click="toArrange">排课</el-menu-item>
          <el-menu-item index="2" >功能1</el-menu-item>
          <el-menu-item index="3">功能2</el-menu-item>
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
    }
  }
}
</script>

<style>

</style>
