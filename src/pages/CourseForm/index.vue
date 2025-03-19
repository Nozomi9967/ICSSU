<template>
  <el-form :model="localCourseInfo" :rules="rules" ref="formRef">
    <div class="base-info-section">
      <el-form-item label="课程编号" class="course_id" prop="course_id" style="max-width: 467px;">
        <el-input v-model="localCourseInfo.course_id" style="width: 180px;"></el-input>
      </el-form-item>
      <el-form-item label="课程名称" prop="course_name">
        <el-input v-model="localCourseInfo.course_name" style="width: 280px;"></el-input>
      </el-form-item>
    </div>
    <!-- <el-form-item label="课程类别" prop="category">
      <el-select v-model="localCourseInfo.category" placeholder="请选择">
        <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->
    <div class="select-section">
      <el-form-item label="课程属性" prop="course_property">
        <el-select v-model="localCourseInfo.course_property" placeholder="请选择">
          <el-option v-for="item in attributeOptions" :key="item.label" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程类型" prop="course_type">
        <el-select v-model="localCourseInfo.course_type" placeholder="请选择">
          <el-option v-for="item in typeOptions" :key="item.label" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开课院系" prop="course_department">
        <el-select v-model="localCourseInfo.course_department" placeholder="请选择">
          <el-option v-for="item in departmentOptions" :key="item.label" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
    </div>
    <!-- <el-form-item label="课程性质" prop="property">
      <el-select v-model="localCourseInfo.property" placeholder="请选择">
        <el-option v-for="item in propertyOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->
    <!-- <el-form-item label="课程英文名" prop="ename">
      <el-input v-model="localCourseInfo.ename"></el-input>
    </el-form-item> -->
    <el-form-item label="是否纯实践环节" prop="pure_practice">
      <el-switch v-model="localCourseInfo.pure_practice" active-text="是" inactive-text="否">
      </el-switch>
    </el-form-item>
    <div class="study-hours-section1">
      <el-form-item label="总学时" label-width="80px" prop="total_hours">
        <el-input-number v-model="localCourseInfo.total_hours" :min="0" :max="480" label="总学时"></el-input-number>
      </el-form-item>
      <el-form-item label="理论学时" prop="theory_hours">
        <el-input-number v-model="localCourseInfo.theory_hours" :min="0" :max="480" label="理论学时"></el-input-number>
      </el-form-item>
      <el-form-item label="实验学时" prop="test_hours">
        <el-input-number v-model="localCourseInfo.test_hours" :min="0" :max="480" label="实验学时"></el-input-number>
      </el-form-item>
      <el-form-item label="上机学时" prop="computer_hours">
        <el-input-number v-model="localCourseInfo.computer_hours" :min="0" :max="480" label="上机学时"></el-input-number>
      </el-form-item>
    </div>
    <div class="study-hours-section2">
      <el-form-item label="实践学时" prop="practice_hours">
        <el-input-number v-model="localCourseInfo.practice_hours" :min="0" :max="480" label="实践学时"></el-input-number>
      </el-form-item>
      <el-form-item label="其他学时" prop="other_hours">
        <el-input-number v-model="localCourseInfo.other_hours" :min="0" :max="480" label="其他学时"></el-input-number>
      </el-form-item>
      <el-form-item label="学分" label-width="80px" prop="course_credit">
        <el-input-number v-model="localCourseInfo.course_credit" :min="0.25" :max="30" :precision="2" :step="0.1"
          label="学分"></el-input-number>
      </el-form-item>
      <el-form-item label="周学时" label-width="80px" prop="weekly_hours">
        <el-input-number v-model="localCourseInfo.weekly_hours" :min="0" :max="30" label="周学时"></el-input-number>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button plain type="primary" @click="handleSubmit">提交</el-button>
      <!-- <el-button @click="handleClose">取消</el-button> -->
      <el-button plain @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CourseForm',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 接收父组件传递的课程信息
    courseInfo: {
      type: Object,
      default: () => ({
        "course_id": "string",
        "course_name": "string",
        "course_type": "string",
        "course_property": "string",
        "course_credit": 0,
        "course_department": "string",
        "total_hours": 0,
        "theory_hours": 0,
        "test_hours": 0,
        "computer_hours": 0,
        "practice_hours": 0,
        "other_hours": 0,
        "weekly_hours": 0,
        "pure_practice": true
      })
    },
  }, data() {
    return {
      isInitializing: true,
      localCourseInfo: this.courseInfo, // 使用 data 属性存储课程信息
      localIsChange: this.isChange, // 使用 data 属性存储是否改变的状态
      categoryOptions: [{
        value: '选项1',
        label: '专业基础课(必修)'
      }, {
        value: '选项2',
        label: '专业核心课(必修)'
      }, {
        value: '选项3',
        label: '专业课(选修)'
      }, {
        value: '选项4',
        label: '公共基础课(必修)'
      }, {
        value: '选项5',
        label: '公共课(选修)'
      }, {
        value: '选项6',
        label: '实习实训(必修)'
      }],
      attributeOptions: [{
        value: '选项1',
        label: '必修'
      }, {
        value: '选项2',
        label: '专业核心课'
      }, {
        value: '选项3',
        label: '专业课选修课'
      }, {
        value: '选项4',
        label: '专业基础课'
      }, {
        value: '选项5',
        label: '公共基础课'
      }, {
        value: '选项6',
        label: '公共选修课'
      }, {
        value: '选项7',
        label: '其他'
      }, {
        value: '选项8',
        label: '任选'
      }, {
        value: '选项9',
        label: '实习实训'
      }, {
        value: '选项10',
        label: '限选'
      }],
      typeOptions: [{
        value: '选项1',
        label: 'A类(纯理论课)'
      }, {
        value: '选项2',
        label: 'B类((理论+实践)课)'
      }, {
        value: '选项3',
        label: 'C类(纯实践课)'
      }],
      propertyOptions: [{
        value: '选项1',
        label: '必修课'
      }, {
        value: '选项2',
        label: '公共必修课'
      }, {
        value: '选项3',
        label: '公共基础课'
      }, {
        value: '选项4',
        label: '公共选修课'
      }, {
        value: '选项5',
        label: '实习实训'
      }, {
        value: '选项6',
        label: '专业拓展课'
      }, {
        value: '选项7',
        label: '专业选修课'
      }],
      departmentOptions: [{
        value: '选项1',
        label: '公共基础学院'
      }, {
        value: '选项2',
        label: '化学与材料工程学院'
      }, {
        value: '选项3',
        label: '机械电气工程学院'
      }, {
        value: '选项4',
        label: '教育艺术学院'
      }, {
        value: '选项5',
        label: '马克思主义学院'
      }, {
        value: '选项6',
        label: '汽车与智能交通学院'
      }, {
        value: '选项7',
        label: '现代农业学院'
      }, {
        value: '选项8',
        label: '心理教学部'
      }, {
        value: '选项9',
        label: '信息智能工程学院'
      }],
      rules: {
        course_id: [
          { required: true, message: '请输入课程编号', trigger: 'blur' },
          { min: 2, max: 20, message: '课程编号长度应是 2 到 20 个字符', trigger: 'blur' }
        ],
        course_name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 2, max: 25, message: '课程名称长度应在 2 到 25 个字符之间', trigger: 'blur' }
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
  }, watch: {
    localCourseInfo: {
      handler(_) {
        if (!this.isInitializing) {
          this.localIsChange = true;
          this.$emit('change', this.localIsChange)
        }
        this.isInitializing = false; // 初始化完成后将标志位设为 false
      },
      deep: true,
    }
  }, methods: {
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // 通知父组件提交表单
          this.$emit('submit', this.localCourseInfo)
        } else {
          console.log('表单验证失败')
        }
      })
    },
    handleReset() {
      this.localCourseInfo = { ...this.courseInfo }; // 重置为初始的 courseInfo
      this.$emit('reset');
    }
  }, mounted() {
    // console.log("mounted")
  }, destroyed() {
    // console.log("destroyed")
  }
}
</script>

<style lang="sass" scoped>
.base-info-section,
.select-section,
.study-hours-section1,
.study-hours-section2 {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; 
  .el-form-item {
    flex: 1;
  }
}
</style>