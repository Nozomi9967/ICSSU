<template>
  <div class="content">
    <el-tabs type="border-card">
      <el-tab-pane label="管理">
        <el-table :data="tableData" border style="width: 85%">
          <el-table-column fixed prop="id" label="工号" width="120">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="100">
          </el-table-column>
          <el-table-column prop="english_name" label="英文姓名" width="120">
          </el-table-column>
          <el-table-column prop="ethnicity" label="民族" width="120">
          </el-table-column>
          <el-table-column prop="title" label="职称" width="120">
          </el-table-column>
          <el-table-column prop="department" label="单位" width="200">
          </el-table-column>
          <el-table-column prop="is_external" label="是否外聘" width="100">
          </el-table-column>
          <el-table-column prop="category" label="教职工类别" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <div class="buttons">
                <el-button
                  @click="handleDeleteTeacher(scope.row)"
                  type="text"
                  size="small"
                  >删除</el-button
                >
                <el-button
                  @click="handleModifyTeacher(scope.row)"
                  type="text"
                  size="small"
                  >编辑</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          :visible.sync="dialogVisible"
          width="63%"
          :height="dialogHeight"
          title="编辑页面"
        >
          <!-- 最终上线时可加 -->
          <!-- :before-close="handleClose" -->
          <TeacherForm
            ref="teacherFormRef"
            :TeacherInfo="teacherInfo"
            @submit="handleModifySubmit"
          ></TeacherForm>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="Pagi.total"
          :page-size="Pagi.pageSize"
          :current-page="Pagi.current"
          @current-change="handleGetTeachers"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="新增">
        <div class="insert-section">
          <TeacherForm
            ref="teacherInsertFormRef"
            @submit="handleSubmitTeacherInput"
            @reset="handleTeacherInsertReset"
          ></TeacherForm>
          <!-- excel输入 -->
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            drag
            :action="getTeacherFileUploadUrl"
            :before-upload="handleBeforeUpload"
            ref="uploadRef"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传.xlsx/.xls文件，且不超过500kb
            </div>
          </el-upload>
          <el-button size="small" type="primary" @click="handleUpload"
            >上传</el-button
          >
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { SERVER_URL, TEACHER_PREFIX } from "@config";
import axios from "axios";
import TeacherForm from "@/components/TeacherForm";
export default {
  name: "Teacher",
  components: {
    TeacherForm,
  },
  computed: {
    getTeacherInsertUrl() {
      return `${this.serverUrl}${this.teacherPrefix}/create`;
    },
    getTeacherFileUploadUrl() {
      return `${this.serverUrl}${this.teacherPrefix}/create/file`;
    },
    getTeachersUrl() {
      return `${this.serverUrl}${this.teacherPrefix}/querybypage`;
    },
  },
  mounted() {
    this.handleGetTeachers();
  },
  data() {
    return {
      // 表格数据
      tableData: [
        {
          ID: "0304",
          Name: "李凤娟",
          Gender: "女性",
          EnglishName: "",
          Ethnicity: "汉族",
          Title: "",
          Department: "化学与材料工程学院",
          IsExternal: "否",
          Category: "",
        },
        {
          ID: "0305",
          Name: "韩紫芸",
          Gender: "女性",
          EnglishName: "无",
          Ethnicity: "回族",
          Title: "",
          Department: "信息智能工程学院",
          IsExternal: "否",
          Category: "",
        },
        {
          ID: "0309",
          Name: "万晓娟",
          Gender: "女性",
          EnglishName: "",
          Ethnicity: "汉族",
          Title: "",
          Department: "公共基础学院",
          IsExternal: "否",
          Category: "",
        },
      ],
      serverUrl: SERVER_URL,
      teacherPrefix: TEACHER_PREFIX,
      dialogVisible: false,
      dialogHeight: "500px",
      teacherInfo: {},
      Pagi: {
        // 每页的条目个数
        pageSize: 8,
        // 总条目数，后端传入
        total: 100,
        // 当前页码
        current: 1,
      },
    };
  },
  methods: {
    // 管理
    handleGetTeachers(newPage) {
      if (newPage) {
        this.Pagi.current = newPage;
      }
      const params = new URLSearchParams();
      params.append("page", this.Pagi.current);
      params.append("pagesize", this.Pagi.pageSize);
      axios
        .get(this.getTeachersUrl, {
          params: params,
        })
        .then((res) => {
          // console.log(res);
          // 请求成功
          if (res.status === 200) {
            this.Pagi.total = res.data.data.total;
            this.tableData = res.data.data.teachers;
          } else {
            this.$message({
              type: "error",
              message: "数据请求失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteTeacher(row) {
      const teacherId = row.id;
      axios
        .delete(`${this.serverUrl}${this.teacherPrefix}/delete/${teacherId}`)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.handleGetTeachers();
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "error",
            message: "删除失败",
          });
        });
    },
    // 点击编辑按钮触发
    handleModifyTeacher(row) {
      this.teacherInfo = { ...row };
      this.dialogVisible = true;
    },
    handleModifySubmit(newTeacherInfo) {
      axios
        .put(
          `${this.serverUrl}${this.teacherPrefix}/update/${newTeacherInfo.id}`,
          newTeacherInfo
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.handleGetTeachers();
            this.dialogVisible = false;
          } else {
            this.$message({
              type: "error",
              message: "修改失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          const errMsg = err.response.data.message;
          this.$message({
            type: "error",
            message: `修改失败,${errMsg}`,
          });
        });
    },
    //dialog关闭后的确认回调
    handleClose() {
      var confirmStr = "之前修改的数据都会丢失，你确定关闭吗？";
      this.$confirm(confirmStr)
        .then((_) => {
          this.handleReset();
          this.dialogVisible = false;
          if (this.isModify) {
            this.$message("已取消修改");
          }
          this.isModify = false;
        })
        .catch((_) => {
          // console.log("###", error)
        });
    },
    handleReset() {
      // 重置
      this.teacherInfo = {};
    },
    handleTeacherInsertReset() {
      this.$refs.teacherInsertFormRef.handleReset();
    },
    handleSubmitTeacherInput(teacherInfo) {
      this.$refs.teacherInsertFormRef.$refs.formRef.validate((valid) => {
        if (valid) {
          axios
            .post(this.getTeacherInsertUrl, teacherInfo, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              // console.log(response)
              if (response.data.status === 200) {
                this.$message({
                  type: "success",
                  message: "新增成功",
                });
                this.handleTeacherInsertReset();
              } else {
                this.$message.error("新增失败");
              }
            })
            .catch((err) => {
              // console.log(err);
              this.$message.error(`新增失败，${err.response.data.message}`);
            });
        } else {
          // console.log("表单验证失败");
          return false;
        }
      });
    },
    handleBeforeUpload(file) {
      // 检查文件类型和大小
      const isXlsx = [".xlsx", ".xls"].some((ext) => file.name.endsWith(ext));
      const isLt500kb = file.size / 1024 < 500;
      if (!isXlsx) {
        this.$message.error("只能上传.xlsx/.xls文件");
        return false;
      }
      if (!isLt500kb) {
        this.$message.error("文件大小不能超过500kb");
        return false;
      }
      return true;
    },
    handleUpload() {
      const uploadFiles = this.$refs.uploadRef.uploadFiles;
      if (uploadFiles.length === 0) {
        this.$message.error("请选择要上传的文件");
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "文件正在上传中，请耐心等待",
        spinner: "el-icon-loading",
        background: "rgba(0,0,0,0.7)",
      });
      const formData = new FormData();
      uploadFiles.forEach((file) => {
        formData.append("teacher_file", file.raw);
      });
      axios
        .post(this.getTeacherFileUploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status === 200) {
            loading.close();
            this.$message({
              type: "success",
              message: "文件上传成功",
            });
            this.handleGetTeachers();
            // 清空已上传的文件列表
            this.$refs.uploadRef.clearFiles();
          } else {
            this.$message.error("文件上传失败");
            loading.close();
          }
        })
        .catch((error) => {
          console.error("上传出错:", error);
          this.$message.error("上传过程中出现错误");
          loading.close();
        });
    },
  },
};
</script>

<style scoped>
.content {
  padding: 10px;
}

.excel-upload-section {
  text-align: center;
}

.el-button {
  margin: 10px;
}

.insert-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 675px;
  padding-top: 30px;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>