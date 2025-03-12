<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" :close-on-click-modal="false" width="60%"
    :before-close="handleClose">
    <el-form :model="courseInfo" :rules="rules" ref="formRef">
      <el-form-item label="课程编号" prop="id">
        <el-input v-model="courseInfo.id"></el-input>
      </el-form-item>
      <el-form-item label="课程名称" prop="name">
        <el-input v-model="courseInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="课程类别" prop="category">
        <el-select v-model="courseInfo.category" placeholder="请选择">
          <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程属性" prop="attribute">
        <el-select v-model="courseInfo.attribute" placeholder="请选择">
          <el-option v-for="item in attributeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程类型" prop="type">
        <el-select v-model="courseInfo.type" placeholder="请选择">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程性质" prop="property">
        <el-select v-model="courseInfo.property" placeholder="请选择">
          <el-option v-for="item in propertyOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程英文名" prop="ename">
        <el-input v-model="courseInfo.ename"></el-input>
      </el-form-item>
      <el-form-item label="开课院系" prop="department">
        <el-select v-model="courseInfo.department" placeholder="请选择">
          <el-option v-for="item in departmentOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用" prop="on">
        <el-switch v-model="courseInfo.on" active-text="是" inactive-text="否">
        </el-switch>
      </el-form-item>
      <el-form-item label="总学时" prop="totalHours">
        <el-input-number v-model="courseInfo.totalHours" :min="0" :max="480" label="总学时"></el-input-number>
      </el-form-item>
      <el-form-item label="理论学时" prop="theoHours">
        <el-input-number v-model="courseInfo.theoHours" :min="0" :max="480" label="理论学时"></el-input-number>
      </el-form-item>
      <el-form-item label="实验学时" prop="experHours">
        <el-input-number v-model="courseInfo.experHours" :min="0" :max="480" label="实验学时"></el-input-number>
      </el-form-item>
      <el-form-item label="上机学时" prop="comOperHours">
        <el-input-number v-model="courseInfo.comOperHours" :min="0" :max="480" label="上机学时"></el-input-number>
      </el-form-item>
      <el-form-item label="实践学时" prop="practicalHours">
        <el-input-number v-model="courseInfo.practicalHours" :min="0" :max="480" label="实践学时"></el-input-number>
      </el-form-item>
      <el-form-item label="其他学时" prop="otherHours">
        <el-input-number v-model="courseInfo.otherHours" :min="0" :max="480" label="其他学时"></el-input-number>
      </el-form-item>
      <el-form-item label="学分" prop="credits">
        <el-input-number v-model="courseInfo.credits" :min="0.25" :max="30" :precision="2" :step="0.1"
          label="学分"></el-input-number>
      </el-form-item>
      <el-form-item label="周学时" prop="weeklyHours">
        <el-input-number v-model="courseInfo.weeklyHours" :min="0" :max="30" label="周学时"></el-input-number>
      </el-form-item>
      <el-form-item label="开始时间 - 结束时间" prop="startToEndValue">
        <el-time-picker is-range arrow-control v-model="courseInfo.startToEndValue" range-separator="至"
          start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
        </el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSubmit">提交</el-button>
        <el-button @click="handleClose">取消</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'CourseDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 接收父组件传递的课程信息
    courseInfo: {
      type: Object,
      default: () => ({
        id: '',
        name: '',
        category: '',
        attribute: '',
        type: '',
        property: '',
        ename: '',
        department: '',
        on: true,
        totalHours: 0,
        theoHours: 0,
        experHours: 0,
        comOperHours: 0,
        practicalHours: 0,
        otherHours: 0,
        credits: 0,
        weeklyHours: 0,
        startToEndValue: []
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