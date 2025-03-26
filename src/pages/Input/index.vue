<template>
  <div>
    <el-tabs type="border-card" style="height: 1400px;">
      <el-tab-pane label="课程输入">
        <CourseForm :courseInfo="courseInfo" ref="courseFormRef" :rules="rules" @submit="handleSubmitCourseInput"
          @reset="handleCourseReset"></CourseForm>
        <!-- excel输入 -->
        <el-upload class="upload-demo" :auto-upload="false" drag :action="getCourseFileUploadUrl"
          :before-upload="handleBeforeUpload" ref="uploadRef" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传.xlsx/.xls文件，且不超过500kb</div>
        </el-upload>
        <el-button size="small" type="primary" @click="handleUpload">上传</el-button>
      </el-tab-pane>
      <el-tab-pane label="教师输入">
        <TeacherForm :teacherInfo="teacherInfo" ref="teacherFormRef" :rules="rules" @submit="handleSubmitTeacherInput"
          @reset="handleTeacherReset"></TeacherForm>
        <!-- excel输入 -->
        <el-upload class="upload-demo" :auto-upload="false" drag :action="getTeacherFileUploadUrl"
          :before-upload="handleBeforeUpload" ref="uploadRef" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传.xlsx/.xls文件，且不超过500kb</div>
        </el-upload>
        <el-button size="small" type="primary" @click="handleUpload">上传</el-button>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { SERVER_URL, COURSE_PREFIX } from "../../../config"
import CourseForm from "@/pages/CourseForm"
import TeacherForm from "@/pages/TeacherForm"
import axios from "axios"
export default {
  name: 'Input',
  components: {
    CourseForm,
    TeacherForm
  },
  data() {
    return {
      serverUrl: SERVER_URL,
      coursePrefix: COURSE_PREFIX,
      courseInfo: {
        "course_id": "005",
        "course_name": "机械制造实践",
        "course_type": "实践课",
        "course_property": "专业课",
        "course_credit": 3,
        "course_department": "机械系",
        "total_hours": 40,
        "theory_hours": 0,
        "test_hours": 0,
        "computer_hours": 0,
        "practice_hours": 40,
        "other_hours": 0,
        "weekly_hours": 5,
        "pure_practice": true
      },
      rules: {
        course_id: [
          { required: true, message: '请输入课程编号', trigger: 'blur' },
          { min: 2, max: 20, message: '课程编号长度应是 2 到 20 个字符', trigger: 'blur' }
        ],
        course_name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 2, max: 20, message: '课程名称长度应在 2 到 20 个字符之间', trigger: 'blur' }
        ],
        course_type: [
          { required: true, message: '请选择课程类型', trigger: 'blur' }
        ],
        course_property: [
          { required: true, message: '请选择课程属性', trigger: 'blur' }
        ],
        course_credit: [
          { required: true, message: '请输入学分', trigger: 'blur' },
          { type: 'number', message: '学分必须为数字', trigger: 'blur' }
        ],
        course_department: [
          { required: true, message: '请选择开课院系', trigger: 'blur' }
        ],
        total_hours: [
          { required: true, message: '请输入总学时', trigger: 'blur' },
          { type: 'number', message: '总学时必须为数字', trigger: 'blur' },
        ],
        theory_hours: [
          { required: true, message: '请输入理论学时', trigger: 'blur' },
          { type: 'number', message: '理论学时必须为数字', trigger: 'blur' },
        ],
        test_hours: [
          { required: true, message: '请输入实验学时', trigger: 'blur' },
          { type: 'number', message: '实验学时必须为数字', trigger: 'blur' },
        ],
        computer_hours: [
          { required: true, message: '请输入计算机操作学时', trigger: 'blur' },
          { type: 'number', message: '计算机操作学时必须为数字', trigger: 'blur' },
        ],
        practice_hours: [
          { required: true, message: '请输入实践学时', trigger: 'blur' },
          { type: 'number', message: '实践学时必须为数字', trigger: 'blur' },
        ],
        other_hours: [
          { required: true, message: '请输入其他学时', trigger: 'blur' },
          { type: 'number', message: '其他学时必须为数字', trigger: 'blur' },
        ],
        weekly_hours: [
          { required: true, message: '请输入周学时', trigger: 'blur' },
          { type: 'number', message: '周学时必须为数字', trigger: 'blur' },
        ],
        pure_practice: [
          { required: true, message: '请选择是否为纯实践课程', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    getCourseFileUploadUrl() {
      return `${this.serverUrl}${this.coursePrefix}/create/file`
    },
    getTeacherFileUploadUrl() {
      return `${this.serverUrl}${this.teacherPrefix}/create/file`
    }

  },
  methods: {
    handleCourseReset() {
      this.courseInfo = {}
    },
    handleTeacherReset() {
      this.teacherInfo = {}
    },
    handleSubmitCourseInput() {
      this.$refs.courseFormRef.$refs.formRef.validate((valid) => {
        if (valid) {
          const jsonInfo = JSON.stringify(this.courseInfo)
          console.log(jsonInfo)
          axios.post(`${this.serverUrl}${this.coursePrefix}/create`, jsonInfo, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(
            (response) => {
              // console.log(response)
              if (response.data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
              }
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )

        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    handleSubmitTeacherInput() {
      this.$refs.teacherFormRef.$refs.formRef.validate((valid) => {
        if (valid) {
          const jsonInfo = JSON.stringify(this.teacherInfo)
          console.log(jsonInfo)
          axios.post(`${this.serverUrl}${this.teacherPrefix}/create`, jsonInfo, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(
            (response) => {
              // console.log(response)
              if (response.data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
              }
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    handleBeforeUpload(file) {
      // 检查文件类型和大小
      const isXlsx = ['.xlsx', '.xls'].some(ext => file.name.endsWith(ext));
      const isLt500kb = file.size / 1024 < 500;
      if (!isXlsx) {
        this.$message.error('只能上传.xlsx/.xls文件');
        return false;
      }
      if (!isLt500kb) {
        this.$message.error('文件大小不能超过500kb');
        return false;
      }
      return true;
    },
    handleUpload() {
      const uploadFiles = this.$refs.uploadRef.uploadFiles;
      if (uploadFiles.length === 0) {
        this.$message.error('请选择要上传的文件');
        return;
      }
      const formData = new FormData();
      uploadFiles.forEach(file => {
        formData.append('course_file', file.raw);
      });
      axios.post(this.getCourseFileUploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          if (response.data.status === 200) {
            this.$message({
              type: 'success',
              message: '文件上传成功'
            });
            // 清空已上传的文件列表
            this.$refs.uploadRef.clearFiles();
          } else {
            this.$message.error('文件上传失败');
          }
        })
        .catch(error => {
          console.error('上传出错:', error);
          this.$message.error('上传过程中出现错误');
        });
    }
  },

}
</script>

<style></style>