<template>
  <div>
    <el-table :data="tableData" border style="width: 90%;height: 720px;">
      <el-table-column fixed prop="ID" label="工号" width="150">
      </el-table-column>
      <el-table-column prop="Name" label="姓名" width="180">
      </el-table-column>
      <!-- <el-table-column prop="category" label="类别" width="100">
  </el-table-column> -->
      <el-table-column prop="Gender" label="性别" width="100">
      </el-table-column>
      <el-table-column prop="EnglishName" label="英文姓名" width="120">
      </el-table-column>
      <!-- <el-table-column prop="property" label="性质" width="100">
  </el-table-column> -->
      <!-- <el-table-column prop="ename" label="英文名" width="120">
  </el-table-column> -->
      <el-table-column prop="Ethnicity" label="民族" width="120">
      </el-table-column>
      <!-- <el-table-column prop="on" label="是否启用" width="100">
    <template slot-scope="scope">
      <span>{{ scope.row.on? '启用' : '未启用' }}</span>
    </template>
</el-table-column> -->
      <el-table-column prop="Title" label="职称" width="120">
      </el-table-column>
      <el-table-column prop="Department" label="单位" width="200">
      </el-table-column>
      <el-table-column prop="IsExternal" label="是否外聘" width="60">
      </el-table-column>
      <el-table-column prop="Category" label="教职工类别" width="120">
      </el-table-column>
      
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleDeleteCourse(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleModifyCourse(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose">
      <TeacherForm :teacherInfo="teacherInfo" :rules="rules" @close="handleClose"></TeacherForm>
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
import TeacherForm from "@/pages/TeacherForm"
export default {
  name: 'Teacher',
  components: {
    TeacherForm
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
      axios.get(`http://127.0.0.1:4523/m1/5962874-5651024-default/teacher/queryall`, {
        params: params
      }).then(
        res => {
          console.log(res)
          // 请求成功
          if (res.status === 200) {
            this.Pagi.total = res.data.data.total
            this.tableData = res.data.data
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
      this.teacherInfo = row
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
      this.teacherInfo = {}
    },
    handleSubmit() { },
  },
  data() {
    return {
      // 表格数据
      tableData: [
        {
          "ID": "0304",
          "Name": "李凤娟",
          "Gender": "女性",
          "EnglishName": "",
          "Ethnicity": "汉族",
          "Title": "",
          "Department": "化学与材料工程学院",
          "IsExternal": "否",
          "Category": ""
        },
        {
          "ID": "0305",
          "Name": "韩紫芸",
          "Gender": "女性",
          "EnglishName": "无",
          "Ethnicity": "回族",
          "Title": "",
          "Department": "信息智能工程学院",
          "IsExternal": "否",
          "Category": ""
        },
        {
          "ID": "0309",
          "Name": "万晓娟",
          "Gender": "女性",
          "EnglishName": "",
          "Ethnicity": "汉族",
          "Title": "",
          "Department": "公共基础学院",
          "IsExternal": "否",
          "Category": ""
        }
      ],
      serverUrl: SERVER_URL,
      coursePrefix: COURSE_PREFIX,
      dialogVisible: false,
      teacherInfo: {},
      rules: {
        ID: [
          { required: true, message: '请输入教师编号', trigger: 'blur' },
          { min: 2, max: 20, message: '教师编号长度应是4个字符', trigger: 'blur' }
        ],
        Name: [
          { required: true, message: '请输入教师姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '教师姓名长度应在 2 到 10 个字符之间', trigger: 'blur' }
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