<template>
  <div>
    <el-header style="height: 200px;">

    </el-header>
    <el-main>
      <el-steps :active="2" align-center>
        <el-step title="自动排课" description="根据课程计划和安排进行预先的自动排课处理"></el-step>
        <el-step title="AI优化" description="根据AI算法对排课预案进行优化"></el-step>
        <el-step title="手动排课" description="根据教师的实际情况或其它因素进行排课方案微调"></el-step>
      </el-steps>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'Flow'
}
</script>

<style></style>