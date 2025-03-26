<template>
  <div class="login-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async handleAxios() {
      await axios.post("http://localhost:8080/login", this.loginForm).then(
        (response) => {
          const result = response.data
          console.log(result)
          if (result.code == 200) {
            console.log('请求成功')
            this.$message('登录成功')
            this.$router.push('/home')
          } else {
            console.log('请求错误')
            this.$message('登录失败')

          }
        }).catch(
          (error) => {
            console.log(error.data)
            this.$message('登录失败')

          }
        )
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message('提交成功!登陆中---');
          // this.handleAxios()
          this.$message('登录成功')
          // 设置身份
          this.$store.commit('SetIdentity', 0)
          this.$store.commit('ChangeAuthState')
          this.$router.push('/home')
        } else {
          console.log('验证失败!');
          this.$message('提交失败！')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
}

.box-card {
  width: 300px;
}
</style>