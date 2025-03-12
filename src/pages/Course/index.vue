<template>
  <div>
    <el-table :data="tableData" border style="width: 100%;height: 720px;">
      <el-table-column fixed prop="id" label="课程编号" width="100">
      </el-table-column>
      <el-table-column prop="name" label="课程名称" width="120">
      </el-table-column>
      <el-table-column prop="category" label="类别" width="100">
      </el-table-column>
      <el-table-column prop="attribute" label="属性" width="100">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="100">
      </el-table-column>
      <el-table-column prop="property" label="性质" width="100">
      </el-table-column>
      <el-table-column prop="ename" label="英文名" width="120">
      </el-table-column>
      <el-table-column prop="department" label="开课院系" width="120">
      </el-table-column>
      <el-table-column prop="on" label="是否启用" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.on ? '启用' : '未启用' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalHours" label="总学时" width="80">
      </el-table-column>
      <el-table-column prop="theoHours" label="理论学时" width="80">
      </el-table-column>
      <el-table-column prop="experHours" label="实验学时" width="80">
      </el-table-column>
      <el-table-column prop="comOperHours" label="上机学时" width="80">
      </el-table-column>
      <el-table-column prop="practicalHours" label="实践学时" width="80">
      </el-table-column>
      <el-table-column prop="otherHours" label="其他学时" width="80">
      </el-table-column>
      <el-table-column prop="credits" label="学分" width="80">
      </el-table-column>
      <el-table-column prop="weeklyHours" label="周学时" width="80">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleDeleteCourse(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleModifyCourse(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <CourseDialog :courseInfo="courseInfo" :dialogVisible="dialogVisible" :rules="rules" @close="handleClose"
      @submit="handleSubmit" @reset="handleReset"></CourseDialog>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total=Pagi.total :page-size=Pagi.pageSize
      :current-page=Pagi.current>
    </el-pagination>
  </div>
</template>

<script>
import CourseDialog from "@/pages/CourseDialog"
export default {
  name: 'Course',
  components: {
    CourseDialog
  },
  methods: {
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
          id: '001',
          name: '高等数学',
          category: '基础课程',
          attribute: '必修',
          type: '理论课',
          property: '公共课',
          ename: 'Advanced Mathematics',
          department: '数学系',
          on: true,
          totalHours: 64,
          theoHours: 64,
          experHours: 0,
          comOperHours: 0,
          practicalHours: 0,
          otherHours: 0,
          credits: 4,
          weeklyHours: 4
        },
        {
          id: '002',
          name: '大学物理实验',
          category: '专业基础课程',
          attribute: '必修',
          type: '实验课',
          property: '专业课',
          ename: 'College Physics Experiment',
          department: '物理系',
          on: true,
          totalHours: 32,
          theoHours: 0,
          experHours: 32,
          comOperHours: 0,
          practicalHours: 0,
          otherHours: 0,
          credits: 2,
          weeklyHours: 2
        }
      ],
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
        startToEndValue: [
          { required: true, message: '请选择时间范围', trigger: 'change' }
        ]
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