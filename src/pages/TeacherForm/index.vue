<template>
  <el-form :model="teacherInfo" :rules="rules" ref="formRef">
    <el-form-item label="教师编号" prop="ID">
      <el-input v-model="teacherInfo.ID"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="Name">
      <el-input v-model="teacherInfo.Name"></el-input>
    </el-form-item>
    <!-- <el-form-item label="课程类别" prop="category">
      <el-select v-model="courseInfo.category" placeholder="请选择">
        <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="性别" prop="Gender">
      <el-switch
        v-model="teacherInfo.Gender"
        :active-value="'男性'"
        :inactive-value="'女性'"
        active-text="男性"
        inactive-text="女性">
      </el-switch>
    </el-form-item>
    <el-form-item label="英文名" prop="EnglishName">
      <el-input v-model="teacherInfo.EnglishName"></el-input>
    </el-form-item>
    <!-- <el-form-item label="课程性质" prop="property">
      <el-select v-model="courseInfo.property" placeholder="请选择">
        <el-option v-for="item in propertyOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->
    <!-- <el-form-item label="课程英文名" prop="ename">
      <el-input v-model="courseInfo.ename"></el-input>
    </el-form-item> -->
    <el-form-item label="民族" prop="Ethnicity">
      <el-input v-model="teacherInfo.Ethnicity"></el-input>
    </el-form-item>
    <el-form-item label="单位" prop="Department">
      <el-select v-model="teacherInfo.Department" placeholder="请选择">
        <el-option v-for="item in attributeOptions" :key="item.label" :label="item.label" :value="item.label">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="职称" prop="Title">
      <el-input v-model="teacherInfo.Title"></el-input>
    </el-form-item>
    <el-form-item label="是否外聘" prop="IsExternal">
      <el-switch v-model="teacherInfo.IsExternal" active-text="是" inactive-text="否">
      </el-switch>
    </el-form-item>
    <el-form-item label="教职工类别" prop="Category">
      <el-input v-model="teacherInfo.Category"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleSubmit">提交</el-button>
      <!-- <el-button @click="handleClose">取消</el-button> -->
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'TeacherForm',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 接收父组件传递的课程信息
    teacherInfo: {
      type: Object,
      default: () => ({

        "ID": "string1",
        "Name": "string",
        "EnglishName": "",
        "Gender": "string",
        "Ethnicity": "",
        "Department": "string",
        "Title": "",
        "Category": "",
        "IsExternal": true

      })
    },
    rules: {
      type: Object,
      default: () => ({
      ID: [
          { required: true, message: '请输入教师编号', trigger: 'blur' },
          { min: 2, max: 10, message: '教师编号长度应是4个字符', trigger: 'blur' }
        ],
      Name:[
        { required: true, message: '请输入教师姓名', trigger: 'blur' }
      ],
      EnglishName:[

      ],
      Gender:[
        { required: true,message: '请选择性别', trigger: 'blur'}
      ],
      Ethnicity:[

      ],
      Department:[
        { required: true, message: '请输入教师单位', trigger: 'blur' }
      ],
      Title:[

      ],
      Category:[

      ],
      IsExternal:[
        { required: true, message: '请选择是否外聘', trigger: 'blur' }
      ],
      })
    },
  },
  data() {
    return {
      attributeOptions: [{
        value: '选项1',
        label: '化学与材料工程学院'
      }, {
        value: '选项2',
        label: '信息智能工程学院'
      }, {
        value: '选项3',
        label: '公共基础学院'
      }, {
        value: '选项4',
        label: '教务处'
      }, {
        value: '选项5',
        label: '后勤管理服务中心'
      }, {
        value: '选项6',
        label: '教育艺术学院'
      }, {
        value: '选项7',
        label: '马克思主义学院'
      }, {
        value: '选项8',
        label: '汽车与智能交通学院'
      }, {
        value: '选项9',
        label: '党委行政办公室'
      }, {
        value: '选项10',
        label: '学院领导'
      }]

    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleSubmit() {
      this.$emit('submit')
    },
    handleReset() {
      
      this.teacherInfo = {}
    }
  }
}
</script>

<style></style>