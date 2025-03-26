<template>
  <div>
    <el-tabs type="border-card" style="height: 1400px">
      <el-tab-pane label="课程输入">
        <CourseForm
          :courseInfo="courseInfo"
          ref="courseFormRef"
          @submit="handleSubmitCourseInput"
        ></CourseForm>
        <!-- excel输入 -->
        <div class="excel-upload-section">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            drag
            :action="getCourseFileUploadUrl"
            :before-upload="handleBeforeUpload"
            ref="courseUploadRef"
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
          <el-button type="primary" @click="handleCourseUpload"
            >上传<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="教室输入">
        <ClassroomForm
          :classroomInfo="classroomInfo"
          ref="classroomFormRef"
          @submit="handleSubmitClassroomInput"
        ></ClassroomForm>
        <!-- excel输入 -->
        <div class="excel-upload-section">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            drag
            :action="getClassroomFileUploadUrl"
            :before-upload="handleBeforeUpload"
            ref="classroomUploadRef"
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
          <el-button type="primary" @click="handleClassroomUpload"
            >上传<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { SERVER_URL, COURSE_PREFIX, CLASSROOM_PREFIX } from "@config";
import CourseForm from "@/components/CourseForm";
import ClassroomForm from "@/components/ClassroomForm";
import axios from "axios";
export default {
  name: "Input",
  components: {
    CourseForm,
    ClassroomForm,
  },
  mounted() {},
  data() {
    return {
      serverUrl: SERVER_URL,
      // 课程
      coursePrefix: COURSE_PREFIX,
      courseInfo: {},
      // 教室
      classroomPrefix: CLASSROOM_PREFIX,
      classroomInfo: {},
    };
  },
  computed: {
    getCourseFileUploadUrl() {
      return `${this.serverUrl}${this.coursePrefix}/create/file`;
    },
    getClassroomFileUploadUrl() {
      return "";
    },
    getClassroomInsertUrl() {
      return `${this.serverUrl}${this.classroomPrefix}/create`;
    },
  },
  methods: {
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
    //课程
    handleCourseUpload() {
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
        formData.append("course_file", file.raw);
      });
      axios
        .post(this.getCourseFileUploadUrl, formData, {
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
            // 清空已上传的文件列表
            this.$refs.uploadRef.clearFiles();
          } else {
            this.$message.error("文件上传失败");
          }
        })
        .catch((error) => {
          console.error("上传出错:", error);
          this.$message.error("上传过程中出现错误");
        });
    },
    handleCourseReset() {
      this.$refs.courseFormRef.handleReset();
    },
    handleSubmitCourseInput() {
      axios
        .post(`${this.serverUrl}${this.coursePrefix}/create`, jsonInfo, {
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
            this.handleCourseReset();
          } else {
            this.$message.error("新增失败!");
          }
        })
        .catch((error) => {
          const errMsg = error.response.data.message;
          this.$message.error(`新增失败！${errMsg}`);
        });
    },
    //教室
    handleSubmitClassroomInput(info) {
      console.log(info);
      axios
        .post(this.getClassroomInsertUrl, info)
        .then((res) => {
          // console.log(res);
          if (res.data.status == 200) {
            this.$message.success("新增成功");
            this.handleClassroomReset();
          } else {
            this.$message.error("新增失败!");
          }
        })
        .catch((error) => {
          // console.log(error);
          const errMsg = error.response.data.message;
          this.$message.error(`新增失败！${errMsg}`);
        });
    },
    handleClassroomReset() {
      this.$refs.classroomFormRef.handleReset();
    },
    handleClassroomUpload() {},
  },
};
</script>

<style scoped>
.excel-upload-section {
  margin-top: 60px;
  text-align: center;
}

.el-button {
  margin: 10px;
}
</style>