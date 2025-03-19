<template>
  <div>
    <el-table :data="tableData" border style="width: 90%;height: 820px;">
      <el-table-column fixed prop="course_id" label="课程编号" width="150">
      </el-table-column>
      <el-table-column prop="course_name" label="课程名称" width="120">
      </el-table-column>
      <!-- <el-table-column prop="category" label="类别" width="100">
  </el-table-column> -->
      <el-table-column prop="course_type" label="类型" width="100">
      </el-table-column>
      <el-table-column prop="course_property" label="属性" width="100">
      </el-table-column>
      <!-- <el-table-column prop="property" label="性质" width="100">
  </el-table-column> -->
      <!-- <el-table-column prop="ename" label="英文名" width="120">
  </el-table-column> -->
      <el-table-column prop="course_department" label="开课院系" width="120">
      </el-table-column>
      <!-- <el-table-column prop="on" label="是否启用" width="100">
    <template slot-scope="scope">
      <span>{{ scope.row.on? '启用' : '未启用' }}</span>
    </template>
</el-table-column> -->
      <el-table-column prop="pure_practice" label="是否纯实践环节" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.pure_practice ? '是' : '否' }}</span>
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
          <el-button @click="handleDeleteCourse(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleModifyCourse(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="70%" title="课程详细" :visible.sync="dialogVisible" :close-on-click-modal="false"
      :before-close="handleClose">
      <template v-if="dialogVisible">
        <CourseForm :courseInfo="courseInfo" @submit="handleSubmit" @change="handleFormChange"></CourseForm>
      </template>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total=Pagi.total :page-size=Pagi.pageSize
      :current-page=Pagi.current @current-change="handleGetCourses">
    </el-pagination>
  </div>
</template>

<script>
import { SERVER_URL, COURSE_PREFIX } from "@config"
import axios from "axios";
import CourseForm from "@/pages/CourseForm"
export default {
  name: 'Course',
  components: {
    CourseForm
  },
  mounted() {
    this.handleGetCourses()
  },
  watch: {
  },
  methods: {
    handleFormChange(isChange) {
      // console.log('isChange', isChange)
      this.isChange = isChange
    },
    handleGetCourses(newPage) {
      if (newPage) {
        this.Pagi.current = newPage
      }
      const params = new URLSearchParams()
      params.append('page', this.Pagi.current)
      params.append('pagesize', this.Pagi.pageSize)
      axios.get(`${this.serverUrl}${this.coursePrefix}/querybypage`, {
        params: params
      }).then(
        res => {
          // 请求成功
          if (res.status === 200) {
            this.Pagi.total = res.data.data.total
            this.tableData = res.data.data.courses
          } else {
            this.$message({
              type: 'error',
              message: '数据请求失败'
            })
          }
        }
      ).catch(
        err => {
          console.log(err)
          this.$message({
            type: 'error',
            message: '数据请求失败'
          })
        }
      )
    },
    handleDeleteCourse(row) {
      // console.log(row);
      const courseId = row.course_id
      axios.delete(`${this.serverUrl}${this.coursePrefix}/delete/${courseId}`).then(
        res => {
          // console.log(res)
          // Todo:popover确认删除
          if (res.data.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.handleGetCourses()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        }
      ).catch(
        err => {
          console.log(err)
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      )
    },
    handleModifyCourse(row) {
      // console.log(row)
      this.courseInfo = { ...row }
      this.dialogVisible = true
    },
    handleClose() {
      // console.log('$$$$')
      if (!this.isChange) {
        this.dialogVisible = false
        return
      }
      var confirmStr = '之前修改的数据都会丢失，你确定关闭吗？'
      this.$confirm(confirmStr)
        .then(_ => {
          this.handleReset()
          this.dialogVisible = false
          this.isChange = false
          if (this.isModify) {
            this.$message('已取消修改')
          }
          this.isModify = false
        })
        .catch(_ => {
          console.log(error)
        })
    },
    handleReset() {
      // 重置
      this.courseInfo = {}
    },
    handleSubmit(newCourseInfo) { // 提交修改后的数据
      axios.put(`${this.serverUrl}${this.coursePrefix}/update`, newCourseInfo).then(
        res => {
          console.log(res)
          if (res.data.status === 200) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            // 刷新数据
            this.handleGetCourses()
            // 关闭dialog
            this.dialogVisible = false
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }

        }
      ).catch(
        err => {
          console.log(err)
          const errMsg = err.response.data.message
          this.$message({
            type: 'error',
            message: `修改失败,${errMsg}`
          })
        }
      )
    },
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      serverUrl: SERVER_URL,
      coursePrefix: COURSE_PREFIX,
      dialogVisible: false,
      isChange: false,
      courseInfo: {},
      rules: {
        id: [
          { required: true, message: '请输入课程编号', trigger: 'blur' },
          { min: 2, max: 20, message: '课程编号长度应是11个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 2, max: 20, message: '课程名称长度应在 2 到 20 个字符之间', trigger: 'blur' }
        ],
      },
      Pagi: {
        // 每页的条目个数
        pageSize: 10,
        // 总条目数，后端传入
        total: 100,
        // 当前页码
        current: 1
      }
    };
  }
};
</script>

<style lang="sass" scoped>
.el-dialog .course-form .course_id {
  width: 100px !important;
}

</style>