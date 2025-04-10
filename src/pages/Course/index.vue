<template>
  <div class="content">
    <el-tabs type="border-card">
      <el-tab-pane label="管理">
        <div style="padding: 5px">
          <el-table :data="tableData" border style="width: 90%">
            <el-table-column
              fixed
              prop="course_id"
              label="课程编号"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="course_name" label="课程名称" width="170">
            </el-table-column>
            <el-table-column prop="course_type" label="类型" width="150">
            </el-table-column>
            <el-table-column prop="course_property" label="属性" width="120">
            </el-table-column>
            <el-table-column
              prop="course_department"
              label="开课院系"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="pure_practice"
              label="是否纯实践环节"
              width="80"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.pure_practice ? "是" : "否" }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="total_hours" label="总学时" width="80">
            </el-table-column>
            <el-table-column prop="theory_hours" label="理论学时" width="80">
            </el-table-column>
            <el-table-column prop="test_hours" label="实验学时" width="80">
            </el-table-column>
            <el-table-column prop="computer_hours" label="上机学时" width="80">
            </el-table-column>
            <el-table-column prop="practice_hours" label="实践学时" width="80">
            </el-table-column>
            <el-table-column prop="other_hours" label="其他学时" width="80">
            </el-table-column>
            <el-table-column prop="course_credit" label="学分" width="80">
            </el-table-column>
            <el-table-column prop="weekly_hours" label="周学时" width="80">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <div class="buttons">
                  <el-button
                    @click="handleDeleteCourse(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                  <el-button
                    @click="handleModifyCourse(scope.row)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
            width="80%"
            title="课程详细"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :before-close="handleClose"
          >
            <template v-if="dialogVisible">
              <CourseForm
                courseFormRef
                :CourseInfo="courseInfo"
                @submit="handleModifySubmit"
              ></CourseForm>
            </template>
          </el-dialog>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="Pagi.total"
            :page-size="Pagi.pageSize"
            :current-page="Pagi.current"
            @current-change="handleGetCourses"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新增">
        <div style="padding: 8px">
          <CourseForm
            :courseInfo="courseInfo"
            ref="courseInsertFormRef"
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
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { SERVER_URL, COURSE_PREFIX } from "@config";
import axios from "axios";
import CourseForm from "@/components/CourseForm";
export default {
  name: "Course",
  components: {
    CourseForm,
  },
  mounted() {
    this.handleGetCourses();
  },
  watch: {
    courseInfo: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (this.$refs.courseFormRef) {
          this.$refs.courseFormRef.handleCourseInfoChange(newValue);
        }
      },
    },
  },
  data() {
    return {
      tableData: [],
      serverUrl: SERVER_URL,
      coursePrefix: COURSE_PREFIX,
      dialogVisible: false,
      isChange: false,
      courseInfo: {},
      rules: {
        id: [
          { required: true, message: "请输入课程编号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "课程编号长度应是11个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "课程名称长度应在 2 到 20 个字符之间",
            trigger: "blur",
          },
        ],
      },
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
  computed: {
    getCourseFileUploadUrl() {
      return `${this.serverUrl}${this.coursePrefix}/create/file`;
    },
    getCourseInsertUrl() {
      return `${this.serverUrl}${this.coursePrefix}/create`;
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
    handleCourseUpload() {
      const uploadFiles = this.$refs.courseUploadRef.uploadFiles;
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
            this.$refs.courseUploadRef.clearFiles();
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
    handleSubmitCourseInput(courseInfo) {
      this.$refs.courseInsertFormRef.$refs.formRef.validate((valid) => {
        if (valid) {
          axios
            .post(this.getCourseInsertUrl, courseInfo, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              if (response.data.status === 200) {
                this.$message({
                  type: "success",
                  message: "新增成功",
                });
                this.handleCourseInputReset();
              } else {
                this.$message.error("新增失败!");
              }
            })
            .catch((err) => {
              const errMsg = err.response.data.message;
              this.$message.error(`新增失败！${errMsg}`);
            });
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },
    handleCourseInputReset() {
      this.$refs.courseInsertFormRef.handleReset();
    },
    handleGetCourses(newPage) {
      if (newPage) {
        this.Pagi.current = newPage;
      }
      const params = new URLSearchParams();
      params.append("page", this.Pagi.current);
      params.append("pagesize", this.Pagi.pageSize);
      axios
        .get(`${this.serverUrl}${this.coursePrefix}/querybypage`, {
          params: params,
        })
        .then((res) => {
          // 请求成功
          if (res.status === 200) {
            this.Pagi.total = res.data.data.total;
            this.tableData = res.data.data.courses;
          } else {
            this.$message({
              type: "error",
              message: "数据请求失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "error",
            message: "数据请求失败",
          });
        });
    },
    handleDeleteCourse(row) {
      const courseId = row.course_id;
      axios
        .delete(`${this.serverUrl}${this.coursePrefix}/delete/${courseId}`)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.handleGetCourses();
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
    handleModifyCourse(row) {
      this.courseInfo = { ...row };
      this.dialogVisible = true;
    },
    handleClose() {
      if (!this.isChange) {
        this.dialogVisible = false;
        return;
      }
      var confirmStr = "之前修改的数据都会丢失，你确定关闭吗？";
      this.$confirm(confirmStr)
        .then((_) => {
          this.handleReset();
          this.dialogVisible = false;
          this.isChange = false;
          if (this.isModify) {
            this.$message("已取消修改");
          }
          this.isModify = false;
        })
        .catch((_) => {
          console.log(error);
        });
    },
    handleReset() {
      this.courseInfo = {};
    },
    handleModifySubmit(newCourseInfo) {
      axios
        .put(`${this.serverUrl}${this.coursePrefix}/update`, newCourseInfo)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.handleGetCourses();
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
  },
};
</script>

<style lang="css" scoped>
.content {
  padding: 10px 10px;
}

.el-dialog .course-form .course_id {
  width: 100px !important;
}

.excel-upload-section {
  text-align: center;
}

.el-button {
  margin: 10px;
}

::v-deep .el-table .el-table__row {
  height: 40px !important;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>