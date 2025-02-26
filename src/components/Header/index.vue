<template>
  <div>
    <header class="site-header">
      <div class="container">
        <h1>大学智慧排课系统</h1>
        <nav>
          <ul>
            <li ><router-link to="/login">登录</router-link></li>
            <li ><el-button class="username" type="text" @click="open">{{ username }}</el-button></li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    open() {
      this.$alert('是否退出登录？', {
        confirmButtonText: '退出',
        callback: () => {
          this.$store.commit('Recover')
          this.$message({
            type: 'info',
            message: "退出登录成功"
          });
          this.$router.push('/login')
        }
      });
    }
  }
}
</script>

<style scoped>
.site-header {
  background-color: #333;
  color: white;
  padding: 20px 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.site-header h1 {
  margin: 0;
  font-size: 24px;
}

.site-header nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.site-header nav li {
  margin-left: 20px;
}

.site-header nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.site-header nav a:hover {
  text-decoration: underline;
}

.username {
  font-size: 22px;
}
</style>