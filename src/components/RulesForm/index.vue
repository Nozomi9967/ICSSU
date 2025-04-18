<template>
  <div>
    <el-form
      :model="rules"
      :rules="formRules"
      ref="ruleForm"
      label-width="200px"
    >
      <!-- 每学期的教学周数量 -->
      <el-form-item label="每学期的教学周数量" prop="semester_week">
        <el-select
          v-model="rules.semester_week"
          placeholder="请选择每学期的教学周数量"
        >
          <el-option
            v-for="week in semesterWeeks"
            :key="week"
            :label="`${week} 周`"
            :value="week"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 每天最大节次 -->
      <el-form-item label="每天最大节次" prop="max_periods_per_day">
        <el-input-number
          v-model="rules.max_periods_per_day"
          :min="1"
          placeholder="请输入每天最大节次"
        ></el-input-number>
      </el-form-item>
      <!-- 上午结束节次 -->
      <el-form-item label="上午结束节次" prop="morning_period_end">
        <el-input-number
          v-model="rules.morning_period_end"
          :min="1"
          placeholder="请输入上午结束节次"
        ></el-input-number>
      </el-form-item>
      <!-- 下午开始节次 -->
      <el-form-item label="下午开始节次" prop="afternoon_start_period">
        <el-input-number
          v-model="rules.afternoon_start_period"
          :min="1"
          placeholder="请输入下午开始节次"
        ></el-input-number>
      </el-form-item>
      <!-- 晚上开始节次 -->
      <el-form-item label="晚上开始节次" prop="night_start_period">
        <el-input-number
          v-model="rules.night_start_period"
          :min="1"
          placeholder="请输入晚上开始节次"
        ></el-input-number>
      </el-form-item>
      <!-- 教师每天最大节次 -->
      <el-form-item label="教师每天最大节次" prop="teacher_max_daily_periods">
        <el-input-number
          v-model="rules.teacher_max_daily_periods"
          :min="1"
          placeholder="请输入教师每天最大节次"
        ></el-input-number>
      </el-form-item>
      <!-- 教师每周最大节次 -->
      <el-form-item label="教师每周最大节次" prop="teacher_max_weekly_periods">
        <el-input-number
          v-model="rules.teacher_max_weekly_periods"
          :min="1"
          placeholder="请输入教师每周最大节次"
        ></el-input-number>
      </el-form-item>
      <!-- 教师上午最大节次 -->
      <el-form-item label="教师上午最大节次" prop="teacher_max_morning_periods">
        <el-input-number
          v-model="rules.teacher_max_morning_periods"
          :min="1"
          placeholder="请输入教师上午最大节次"
        ></el-input-number>
      </el-form-item>
      <!-- 教师下午最大节次 -->
      <el-form-item
        label="教师下午最大节次"
        prop="teacher_max_afternoon_periods"
      >
        <el-input-number
          v-model="rules.teacher_max_afternoon_periods"
          :min="1"
          placeholder="请输入教师下午最大节次"
        ></el-input-number>
      </el-form-item>
      <!-- 晚上是否排课 -->
      <el-form-item label="晚上是否排课" prop="night_classes_allowed">
        <el-switch v-model="rules.night_classes_allowed"></el-switch>
      </el-form-item>
      <!-- 多学时类型的课程学时是否连续排 -->
      <el-form-item
        label="多学时类型（理论、实验、上机）的课程学时是否连续排"
        prop="multi_session_consecutive"
      >
        <el-switch v-model="rules.multi_session_consecutive"></el-switch>
      </el-form-item>
      <!-- 体育课是否只在下午 -->
      <el-form-item label="体育课是否只在下午" prop="sports_afternoon_only">
        <el-switch v-model="rules.sports_afternoon_only"></el-switch>
      </el-form-item>
      <!-- 实验课是否只在晚上 -->
      <el-form-item label="实验课是否只在晚上" prop="lab_at_night_only">
        <el-switch v-model="rules.lab_at_night_only"></el-switch>
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SERVER_URL, SCHEDULE_PREFIX } from "@config";
import axios from "axios";
import { List } from "echarts";
export default {
  name: "RulesForm",
  data() {
    return {
      serverUrl: SERVER_URL,
      schedulePrefix: SCHEDULE_PREFIX,
      rules: {
        semester_week: 18,
        max_periods_per_day: 8,
        morning_period_end: 4,
        afternoon_start_period: 4,
        night_start_period: 8,
        sports_afternoon_only: true,
        lab_at_night_only: false,
        night_classes_allowed: true,
        multi_session_consecutive: false,
        teacher_max_daily_periods: 10,
        teacher_max_weekly_periods: 40,
        teacher_max_morning_periods: 5,
        teacher_max_afternoon_periods: 5,
      },
      formRules: {
        semester_week: [
          {
            required: true,
            message: "请选择每学期的教学周数量",
            trigger: "change",
          },
        ],
        max_periods_per_day: [
          {
            required: true,
            message: "请输入每天最大节次",
            trigger: "blur",
          },
        ],
        morning_period_end: [
          {
            required: true,
            message: "请输入上午结束节次",
            trigger: "blur",
          },
        ],
        afternoon_start_period: [
          {
            required: true,
            message: "请输入下午开始节次",
            trigger: "blur",
          },
        ],
        night_start_period: [
          {
            required: true,
            message: "请输入晚上开始节次",
            trigger: "blur",
          },
        ],
        sports_afternoon_only: [
          {
            required: true,
            message: "请选择体育课是否只在下午",
            trigger: "change",
          },
        ],
        lab_at_night_only: [
          {
            required: true,
            message: "请选择实验课是否只在晚上",
            trigger: "change",
          },
        ],
        night_classes_allowed: [
          {
            required: true,
            message: "请选择晚上是否排课",
            trigger: "change",
          },
        ],
        multi_session_consecutive: [
          {
            required: true,
            message: "请选择多学时类型的课程学时是否连续排",
            trigger: "change",
          },
        ],
        teacher_max_daily_periods: [
          {
            required: true,
            message: "请输入教师每天最大节次",
            trigger: "blur",
          },
        ],
        teacher_max_weekly_periods: [
          {
            required: true,
            message: "请输入教师每周最大节次",
            trigger: "blur",
          },
        ],
        teacher_max_morning_periods: [
          {
            required: true,
            message: "请输入教师上午最大节次",
            trigger: "blur",
          },
        ],
        teacher_max_afternoon_periods: [
          {
            required: true,
            message: "请输入教师下午最大节次",
            trigger: "blur",
          },
        ],
      },
      semesterWeeks: Array.from({ length: 18 }, (_, i) => i + 1),
    };
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  computed: {
    getAutoScheduleUrl() {
      return `${this.serverUrl}${this.schedulePrefix}/ga`;
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在自动排课中，请耐心等待",
            spinner: "el-icon-loading",
            background: "rgba(0,0,0,0.7)",
          });
          // 封装请求数据
          const requestData = {
            schedule_ids: this.list,
            rules: this.rules,
          };
          axios
            .post(this.getAutoScheduleUrl, requestData)
            .then((res) => {
              console.log(res);
              this.$store.commit("SetAnalysis", res.data.data.analysis);
              loading.close();
              this.$message.success("自动排课成功");
            })
            .catch((err) => {
              console.log(err);
              loading.close();
              this.$message.error("自动排课失败");
            });
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
/* 移除两列布局的样式 */
</style>