<template>
  <div>
    <el-table :data="tableData" border style="width: 90%;height: 720px;">
      <el-table-column fixed prop="course_id" label="课程编号" width="100">
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
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose">
      <CourseForm :courseInfo="courseInfo" :rules="rules" @close="handleClose"></CourseForm>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total=Pagi.total :page-size=Pagi.pageSize
      :current-page=Pagi.current>
    </el-pagination>
  </div>
</template>

<script>
import { SERVER_URL, COURSE_PREFIX } from "../../../config"
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
  methods: {
    handleGetCourses() {
      // TODO:分页获取客户数据
      const params = new URLSearchParams()
      params.append('page', this.Pagi.current)
      params.append('pagesize', this.Pagi.pageSize)
      axios.get(`${this.serverUrl}${this.coursePrefix}/querybypage`, {
        params: params
      }).then(
        res => {
          console.log(res)
          // 请求成功
          if (res.status === 200) {
            this.Pagi.total = res.data.data.total
            this.tableData = res.data.data.courses
          } else {
            this.$message({
              type: error,
              message: '数据请求失败'
            })
          }
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    handleDeleteCourse(row) {
      // console.log(row);
    },
    handleModifyCourse(row) {
      // console.log(row)
      this.courseInfo = row
      this.dialogVisible = true
    },
    handleClose() {
      var confirmStr = '之前修改的数据都会丢失，你确定关闭吗？'
      this.$confirm(confirmStr)
        .then(_ => {
          this.handleReset()
          this.dialogVisible = false
          if (this.isModify) {
            this.$message('已取消修改')
          }
          this.isModify = false
        })
        .catch(_ => {
          // console.log("###", error)
        })
    },
    handleReset() {
      // 重置
      this.courseInfo = {}
    },
    handleSubmit() { },
  },
  data() {
    return {
      // 表格数据
      tableData: [
        {
          "course_id": "003",
          "course_name": "大学英语",
          "course_type": "理论课",
          "course_property": "公共课",
          "course_credit": 3,
          "course_department": "外语系",
          "total_hours": 48,
          "theory_hours": 40,
          "test_hours": 0,
          "computer_hours": 4,
          "practice_hours": 4,
          "other_hours": 0,
          "weekly_hours": 3,
          "pure_practice": false
        },
        {
          "course_id": "004",
          "course_name": "数据结构与算法",
          "course_type": "理论课",
          "course_property": "专业课",
          "course_credit": 4,
          "course_department": "计算机系",
          "total_hours": 64,
          "theory_hours": 48,
          "test_hours": 8,
          "computer_hours": 8,
          "practice_hours": 0,
          "other_hours": 0,
          "weekly_hours": 4,
          "pure_practice": false
        },
        {
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
        }
      ],
      serverUrl: SERVER_URL,
      coursePrefix: COURSE_PREFIX,
      dialogVisible: false,
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