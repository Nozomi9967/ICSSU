<template>
  <el-form :model="courseInfo" :rules="rules" ref="formRef">
    <el-form-item label="课程编号" prop="course_id">
      <el-input v-model="courseInfo.course_id"></el-input>
    </el-form-item>
    <el-form-item label="课程名称" prop="course_name">
      <el-input v-model="courseInfo.course_name"></el-input>
    </el-form-item>
    <!-- <el-form-item label="课程类别" prop="category">
      <el-select v-model="courseInfo.category" placeholder="请选择">
        <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="课程属性" prop="course_property">
      <el-select v-model="courseInfo.course_property" placeholder="请选择">
        <el-option v-for="item in attributeOptions" :key="item.label" :label="item.label" :value="item.label">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="课程类型" prop="course_type">
      <el-select v-model="courseInfo.course_type" placeholder="请选择">
        <el-option v-for="item in typeOptions" :key="item.label" :label="item.label" :value="item.label">
        </el-option>
      </el-select>
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
    <el-form-item label="开课院系" prop="course_department">
      <el-select v-model="courseInfo.course_department" placeholder="请选择">
        <el-option v-for="item in departmentOptions" :key="item.label" :label="item.label" :value="item.label">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否纯实践环节" prop="pure_practice">
      <el-switch v-model="courseInfo.pure_practice" active-text="是" inactive-text="否">
      </el-switch>
    </el-form-item>
    <el-form-item label="总学时" prop="total_hours">
      <el-input-number v-model="courseInfo.total_hours" :min="0" :max="480" label="总学时"></el-input-number>
    </el-form-item>
    <el-form-item label="理论学时" prop="theory_hours">
      <el-input-number v-model="courseInfo.theory_hours" :min="0" :max="480" label="理论学时"></el-input-number>
    </el-form-item>
    <el-form-item label="实验学时" prop="test_hours">
      <el-input-number v-model="courseInfo.test_hours" :min="0" :max="480" label="实验学时"></el-input-number>
    </el-form-item>
    <el-form-item label="上机学时" prop="computer_hours">
      <el-input-number v-model="courseInfo.computer_hours" :min="0" :max="480" label="上机学时"></el-input-number>
    </el-form-item>
    <el-form-item label="实践学时" prop="practice_hours">
      <el-input-number v-model="courseInfo.practice_hours" :min="0" :max="480" label="实践学时"></el-input-number>
    </el-form-item>
    <el-form-item label="其他学时" prop="other_hours">
      <el-input-number v-model="courseInfo.other_hours" :min="0" :max="480" label="其他学时"></el-input-number>
    </el-form-item>
    <el-form-item label="学分" prop="course_credit">
      <el-input-number v-model="courseInfo.course_credit" :min="0.25" :max="30" :precision="2" :step="0.1"
        label="学分"></el-input-number>
    </el-form-item>
    <el-form-item label="周学时" prop="weekly_hours">
      <el-input-number v-model="courseInfo.weekly_hours" :min="0" :max="30" label="周学时"></el-input-number>
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
        "total_hour": 0,
        "theory_hours": 0,
        "test_hours": 0,
        "computer_hours": 0,
        "practice_hours": 0,
        "other_hours": 0,
        "weekly_hours": 0,
        "pure_practice": true

        // #region
        // id: '',
        // name: '',
        // category: '',
        // attribute: '',
        // type: '',
        // property: '',
        // ename: '',
        // department: '',
        // on: true,
        // totalHours: 0,
        // theoHours: 0,
        // experHours: 0,
        // comOperHours: 0,
        // practicalHours: 0,
        // otherHours: 0,
        // credits: 0,
        // weeklyHours: 0,
        // #endregion
      })
    },
    rules: {
    },
  },
  data() {
    return {
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
      this.$emit('reset')
    }
  }
}
</script>

<style></style>