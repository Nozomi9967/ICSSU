<template>
  <div class="login-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-select v-model="loginForm.identity">
            <el-option label="教师" value="teacher"></el-option>
            <el-option label="学生" value="student"></el-option>
            <el-option label="管理员" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        identity: "", // 新增身份属性并初始化
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        identity: [
          { required: true, message: "请选择身份", trigger: "change" },
        ], // 新增身份校验规则
      },
    };
  },
  methods: {
    async handleAxios() {
      await axios
        .post("http://localhost:8080/user/login", this.loginForm)
        .then((response) => {
          const result = response.data;
          console.log(result);
          if (result.status == 200) {
            console.log("请求成功");
            this.$store.commit("ChangeAuthState");
            let iden;
            switch (this.loginForm.identity) {
              case "admin":
                iden = 0;
                break;
              case "teacher":
                iden = 1;
                break;
              case "student":
                iden = 2;
                break;
            }
            this.$store.commit("SetIdentity", iden);
            this.$store.commit("SetUserName", this.loginForm.username);
            this.$message("登录成功");
            this.$router.push("/home");
          } else {
            console.log("请求错误");
            this.$message("登录失败");
          }
        })
        .catch((error) => {
          console.log(error.data);
          this.$message("登录失败");
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message("提交成功!登陆中---");
          this.handleAxios(); // 恢复调用
        } else {
          console.log("验证失败!");
          this.$message("提交失败！");
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