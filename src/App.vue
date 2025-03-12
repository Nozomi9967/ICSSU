<template>
  <div id="app">
    <Header></Header>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)" v-show="isAuth">
        <el-menu>
          <el-submenu index="1" v-if="identity == 0">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>排课</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="toManualArrange">手动排课</el-menu-item>
              <el-menu-item index="1-2" @click="toAutoArrange">自动排课</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-if="identity !== 0" index="2" @click="toSchedule">我的课表</el-menu-item>
          <el-menu-item v-if="identity == 0" index="3" @click="toCourse">
            <i class="el-icon-date"></i>
            <span>全校课程</span>
          </el-menu-item>
          <el-menu-item v-if="identity == 0" index="4" @click="toInput">
            <i class="el-icon-upload2"></i>
            <span>信息输入</span>
          </el-menu-item>
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
  computed: {
    ...mapState(['isAuth', 'identity'])
  },
  methods: {
    toManualArrange() {
      this.$router.push('/manual-arrange').catch(err => { })
    },
    toAutoArrange() {
      this.$router.push('/auto-arrange').catch(err => { })
    },
    toSchedule() {
      this.$router.push('/schedule').catch(err => { })
    },
    toCourse() {
      this.$router.push('/course').catch(err => { })
    },
    toInput() {
      this.$router.push('/input').catch(err => { })
    }
  }
}
</script>

<style></style>
