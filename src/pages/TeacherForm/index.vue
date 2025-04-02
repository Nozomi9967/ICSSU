<template>
  <el-form :model="teacherInfo" :rules="rules" ref="formRef" label-width="100px">
    <el-form-item label="教师编号" prop="ID">
      <el-input v-model="teacherInfo.ID" placeholder="请输入教师编号"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="Name">
      <el-input v-model="teacherInfo.Name" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="Gender">
      <el-switch
        v-model="teacherInfo.Gender"
        active-text="男性"
        inactive-text="女性"
        :active-value="'男性'"
        :inactive-value="'女性'">
      </el-switch>
    </el-form-item>
    <el-form-item label="英文名" prop="EnglishName">
      <el-input v-model="teacherInfo.EnglishName" placeholder="请输入英文名"></el-input>
    </el-form-item>
    <el-form-item label="民族" prop="Ethnicity">
      <el-input v-model="teacherInfo.Ethnicity" placeholder="请输入民族"></el-input>
    </el-form-item>
    <el-form-item label="单位" prop="Department">
      <el-select v-model="teacherInfo.Department" placeholder="请选择单位">
        <el-option 
          v-for="item in departmentOptions" 
          :key="item.value" 
          :label="item.label" 
          :value="item.label">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="职称" prop="Title">
      <el-input v-model="teacherInfo.Title" placeholder="请输入职称"></el-input>
    </el-form-item>
    <el-form-item label="是否外聘" prop="IsExternal">
      <el-switch 
        v-model="teacherInfo.IsExternal" 
        active-text="是" 
        inactive-text="否">
      </el-switch>
    </el-form-item>
    <el-form-item label="教职工类别" prop="Category">
      <el-input v-model="teacherInfo.Category" placeholder="请输入教职工类别"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'TeacherForm',
  props: {
    teacherInfo: {
      type: Object,
      default: () => ({
        ID: "",
        Name: "",
        EnglishName: "",
        Gender: "男性",
        Ethnicity: "",
        Department: "",
        Title: "",
        Category: "",
        IsExternal: false
      })
    },
    rules: {
      type: Object,
      default: () => ({
        ID: [
          { required: true, message: '请输入教师编号', trigger: 'blur' },
          { min: 2, max: 10, message: '教师编号长度应是4个字符', trigger: 'blur' }
        ],
        Name: [
          { required: true, message: '请输入教师姓名', trigger: 'blur' }
        ],
        Gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        Department: [
          { required: true, message: '请选择单位', trigger: 'change' }
        ],
        IsExternal: [
          { required: true, message: '请选择是否外聘', trigger: 'change' }
        ]
      })
    }
  },
  data() {
    return {
      departmentOptions: [
        { value: '1', label: '化学与材料工程学院' },
        { value: '2', label: '信息智能工程学院' },
        { value: '3', label: '公共基础学院' },
        { value: '4', label: '教务处' },
        { value: '5', label: '后勤管理服务中心' },
        { value: '6', label: '教育艺术学院' },
        { value: '7', label: '马克思主义学院' },
        { value: '8', label: '汽车与智能交通学院' },
        { value: '9', label: '党委行政办公室' },
        { value: '10', label: '学院领导' }
      ]
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.$emit('submit', this.teacherInfo)
        }
      })
    },
    handleReset() {
      this.$refs.formRef.resetFields()
    }
  }
}
</script>

<style scoped>
.el-form {
  padding: 20px;
}
.el-select {
  width: 100%;
}
</style>