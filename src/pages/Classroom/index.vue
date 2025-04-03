<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleMenuSelect"
    >
      <el-menu-item index="1">管理</el-menu-item>
      <el-menu-item index="2">新增</el-menu-item>
    </el-menu>
    <!-- 新增 -->
    <div style="padding: 8px" v-if="activeIndex == '2'">
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
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传.xlsx/.xls文件，且不超过500kb
          </div>
        </el-upload>
        <el-button type="primary" @click="handleClassroomUpload"
          >上传<i class="el-icon-upload el-icon--right"></i
        ></el-button>
      </div>
    </div>
    <!-- 管理 -->
    <div style="padding: 5px" v-if="activeIndex == '1'">
      <el-table :data="tableData" border style="width: 90%">
        <el-table-column fixed prop="id" label="教室编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="教室名称" width="160">
        </el-table-column>
        <el-table-column prop="campus" label="校区" width="100">
        </el-table-column>
        <el-table-column prop="building" label="教学楼" width="140">
        </el-table-column>
        <el-table-column prop="floor" label="楼层" width="60">
        </el-table-column>
        <el-table-column prop="capacity" label="容量" width="60">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
        </el-table-column>
        <el-table-column prop="has_ac" label="是否有空调" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.has_ac ? "是" : "否" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" width="120">
        </el-table-column>
        <el-table-column prop="department" label="所属院系" width="140">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <div class="buttons">
              <el-button
                @click="handleDeleteClassroom(scope.row)"
                type="text"
                size="small"
                >删除</el-button
              >
              <el-button
                @click="handleModifyClassroom(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        width="70%"
        title="教室详细"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :before-close="handleClose"
      >
        <template v-if="dialogVisible">
          <ClassroomForm
            :classroomInfo="classroomInfo"
            @submit="handleSubmit"
            @change="handleFormChange"
          ></ClassroomForm>
        </template>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="Pagi.total"
        :page-size="Pagi.pageSize"
        :current-page="Pagi.current"
        @current-change="handleGetClassrooms"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { SERVER_URL, CLASSROOM_PREFIX } from "@config";
import axios from "axios";
import ClassroomForm from "@/components/ClassroomForm";
export default {
  name: "Classroom",
  components: {
    ClassroomForm,
  },
  mounted() {
    this.handleGetClassrooms();
  },
  watch: {},
  data() {
    return {
      activeIndex: "1",
      tableData: [],
      serverUrl: SERVER_URL,
      classroomPrefix: CLASSROOM_PREFIX,
      dialogVisible: false,
      isChange: false,
      classroomInfo: {},
      Pagi: {
        pageSize: 8,
        total: 100,
        current: 1,
      },
    };
  },
  computed: {
    getClassroomFileUploadUrl() {
      return `${this.serverUrl}${this.classroomPrefix}/create/file`;
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
    handleClassroomUpload() {
      const uploadFiles = this.$refs.classroomUploadRef.uploadFiles;
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
        formData.append("classroom_file", file.raw);
      });
      axios
        .post(this.getClassroomFileUploadUrl, formData, {
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
            this.$refs.classroomUploadRef.clearFiles();
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
    handleSubmitClassroomInput(info) {
      console.log(info);
      axios
        .post(this.getClassroomInsertUrl, info)
        .then((res) => {
          if (res.data.status == 200) {
            this.$message.success("新增成功");
            this.handleClassroomReset();
          } else {
            this.$message.error("新增失败!");
          }
        })
        .catch((error) => {
          const errMsg = error.response.data.message;
          this.$message.error(`新增失败！${errMsg}`);
        });
    },
    handleClassroomReset() {
      this.$refs.classroomFormRef.handleReset();
    },
    handleFormChange(isChange) {
      this.isChange = isChange;
    },
    handleGetClassrooms(newPage) {
      if (newPage) {
        this.Pagi.current = newPage;
      }
      const params = new URLSearchParams();
      params.append("page", this.Pagi.current);
      params.append("pagesize", this.Pagi.pageSize);
      axios
        .get(`${this.serverUrl}${this.classroomPrefix}/querybypage`, {
          params: params,
        })
        .then((res) => {
          // 请求成功
          if (res.status === 200) {
            this.Pagi.total = res.data.data.total;
            this.tableData = res.data.data.classrooms;
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
    handleDeleteClassroom(row) {
      const classroomId = row.id;
      axios
        .delete(
          `${this.serverUrl}${this.classroomPrefix}/delete/${classroomId}`
        )
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.handleGetClassrooms();
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
    handleModifyClassroom(row) {
      this.classroomInfo = { ...row };
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
      this.classroomInfo = {};
    },
    handleSubmit(newClassroomInfo) {
      axios
        .put(
          `${this.serverUrl}${this.classroomPrefix}/update`,
          newClassroomInfo
        )
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.handleGetClassrooms();
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
    handleMenuSelect(_, keyPath) {
      this.activeIndex = keyPath[0];
    },
  },
};
</script>

<style scoped>
.el-dialog .classroom-form .id {
  width: 100px !important;
}
.excel-upload-section {
  margin-top: 60px;
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