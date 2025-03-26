<template>
  <div>
    <el-table :data="tableData" border style="width: 90%; height: 820px">
      <el-table-column fixed prop="id" label="教室编号" width="150">
      </el-table-column>
      <el-table-column prop="name" label="教室名称" width="120">
      </el-table-column>
      <el-table-column prop="campus" label="校区" width="100">
      </el-table-column>
      <el-table-column prop="building" label="教学楼" width="100">
      </el-table-column>
      <el-table-column prop="floor" label="楼层" width="80"> </el-table-column>
      <el-table-column prop="capacity" label="容量" width="80">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="100"> </el-table-column>
      <el-table-column prop="has_ac" label="是否有空调" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.has_ac ? "是" : "否" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" width="120">
      </el-table-column>
      <el-table-column prop="department" label="所属院系" width="120">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
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
  methods: {
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
  },
  data() {
    return {
      tableData: [],
      serverUrl: SERVER_URL,
      classroomPrefix: CLASSROOM_PREFIX,
      dialogVisible: false,
      isChange: false,
      classroomInfo: {},
      rules: {
        id: [
          { required: true, message: "请输入教室编号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "教室编号长度应在 2 到 20 个字符之间",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入教室名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "教室名称长度应在 2 到 20 个字符之间",
            trigger: "blur",
          },
        ],
      },
      Pagi: {
        pageSize: 10,
        total: 100,
        current: 1,
      },
    };
  },
};
</script>

<style scoped>
.el-dialog .classroom-form .id {
  width: 100px !important;
}
</style>