<template>
  <div class="welcome-container">
    <h1>欢迎进入排课系统</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Home',
  computed: {
   ...mapState(['isAuth'])
  }
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* 让容器占满整个视口高度，可根据实际情况调整 */
}
.welcome-container h1 {
  color: #333; /* 文字颜色，可按需修改 */
  font-size: 48px; /* 字体大小，可按需修改 */
}
</style>