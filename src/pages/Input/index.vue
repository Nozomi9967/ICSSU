<template>
  <div>
    <el-tabs type="border-card" style="height: 750px;">
      <el-tab-pane label="课程输入">
        <CourseDialog :dialogVisible="dialogVisible"></CourseDialog>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CourseDialog from "@/pages/CourseDialog"
export default {
  name: 'Input',
  components: {
    CourseDialog
  },
  data() {
    return {
      dialogVisible: true
    }
  }
}
</script>

<style></style>