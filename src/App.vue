<template>
  <div id="app">
    <Header></Header>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside
        width="200px"
        style="background-color: rgb(238, 241, 246)"
        v-show="isAuth"
      >
        <el-menu>
          <!-- 管理员功能区 -->
          <el-submenu index="1" v-if="identity == admin">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>排课</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="toManualArrange"
                >手动排课</el-menu-item
              >
              <el-menu-item index="1-2" @click="toAutoArrange"
                >自动排课</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-if="identity == admin" index="2" @click="toCourse">
            <i class="el-icon-date"></i>
            <span>全校课程</span>
          </el-menu-item>
          <el-menu-item v-if="identity == 0" index="6" @click="toTeacher">
            <i class="el-icon-date"></i>
            <span>全校教师</span>
          </el-menu-item>
          <el-menu-item v-if="identity == 0" index="4" @click="toInput">
            <i class="el-icon-upload2"></i>
            <span>信息输入</span>
          </el-menu-item>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>统计分析</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" @click="toUsage"
                >教室利用率</el-menu-item
              >
              <el-menu-item index="5-2" @click="toQuantity"
                >教师排课量</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-if="identity == admin" index="7" @click="toFlow">
            <i class="el-icon-tickets"></i>
            <span>流程审批</span>
          </el-menu-item>
          <el-menu-item v-if="identity == admin" index="8" @click="toClassroom">
            <i class="el-icon-reading"></i>
            <span>教室管理</span>
          </el-menu-item>
          <el-menu-item v-if="identity !== admin" index="9" @click="toSchedule"
            >我的课表</el-menu-item
          >
        </el-menu>
      </el-aside>
      <el-main style="padding: 6px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { IDENTITY_ADMIN, IDENTITY_STUDENT, IDENTITY_TEACHER } from "@config";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      admin: parseInt(IDENTITY_ADMIN),
      student: parseInt(IDENTITY_STUDENT),
      teacher: parseInt(IDENTITY_TEACHER),
    };
  },
  computed: {
    ...mapState(["isAuth", "identity"]),
  },
  methods: {
    toManualArrange() {
      this.$router.push("/manual-arrange").catch((err) => {});
    },
    toAutoArrange() {
      this.$router.push("/auto-arrange").catch((err) => {});
    },
    toSchedule() {
      this.$router.push("/schedule").catch((err) => {});
    },
    toCourse() {
      this.$router.push("/course").catch((err) => {});
    },
    toInput() {
      this.$router.push("/input").catch((err) => {});
    },
    toUsage() {
      this.$router.push("/analysis/usage").catch((err) => {});
    },
    toQuantity() {
      this.$router.push("/analysis/quantity").catch((err) => {});
    },
    toTeacher() {
      this.$router.push("/teacher").catch((err) => {});
    },
    toFlow() {
      this.$router.push("/flow").catch((err) => {});
    },
    toClassroom() {
      this.$router.push("/classroom").catch((err) => {});
    },
  },
};
</script>

<style></style>
