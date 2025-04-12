<template>
  <div class="content">
    <el-form :model="courseInfo" :rules="rules" ref="formRef">
      <div class="top">
        <span class="top-title">基本信息</span>
        <div class="base-info-section">
          <el-form-item label="课程编号" class="course_id" prop="course_id">
            <el-input
              v-model="courseInfo.course_id"
              style="width: 223px"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程名称" prop="course_name">
            <el-input
              v-model="courseInfo.course_name"
              style="width: 223px"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否纯实践环节" prop="pure_practice">
            <el-switch
              v-model="courseInfo.pure_practice"
              active-text="是"
              inactive-text="否"
            >
            </el-switch>
          </el-form-item>
        </div>
        <!-- <el-form-item label="课程类别" prop="category">
      <el-select v-model="courseInfo.category" placeholder="请选择">
        <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->
        <div class="select-section">
          <el-form-item label="课程属性" prop="course_property">
            <el-select
              v-model="courseInfo.course_property"
              placeholder="请选择"
            >
              <el-option
                v-for="item in attributeOptions"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程类型" prop="course_type">
            <el-select v-model="courseInfo.course_type" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开课院系" prop="course_department">
            <el-select
              v-model="courseInfo.course_department"
              placeholder="请选择"
            >
              <el-option
                v-for="item in departmentOptions"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="middle">
        <span class="middle-title">其它信息</span>
        <div class="study-hours-section1">
          <el-form-item label="总学时" label-width="80px" prop="total_hours">
            <el-input-number
              v-model="courseInfo.total_hours"
              :min="0"
              :max="480"
              label="总学时"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="理论学时" prop="theory_hours">
            <el-input-number
              v-model="courseInfo.theory_hours"
              :min="0"
              :max="480"
              label="理论学时"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="实验学时" prop="test_hours">
            <el-input-number
              v-model="courseInfo.test_hours"
              :min="0"
              :max="480"
              label="实验学时"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="上机学时" prop="computer_hours">
            <el-input-number
              v-model="courseInfo.computer_hours"
              :min="0"
              :max="480"
              label="上机学时"
            ></el-input-number>
          </el-form-item>
        </div>
        <div class="study-hours-section2">
          <el-form-item label="实践学时" prop="practice_hours">
            <el-input-number
              v-model="courseInfo.practice_hours"
              :min="0"
              :max="480"
              label="实践学时"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="其他学时" prop="other_hours">
            <el-input-number
              v-model="courseInfo.other_hours"
              :min="0"
              :max="480"
              label="其他学时"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="学分" label-width="80px" prop="course_credit">
            <el-input-number
              v-model="courseInfo.course_credit"
              :min="0.25"
              :max="30"
              :precision="2"
              :step="0.1"
              label="学分"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="周学时" label-width="80px" prop="weekly_hours">
            <el-input-number
              v-model="courseInfo.weekly_hours"
              :min="0"
              :max="30"
              label="周学时"
            ></el-input-number>
          </el-form-item>
        </div>
      </div>
      <el-form-item>
        <el-button plain type="primary" @click="handleSubmit">提交</el-button>
        <!-- <el-button @click="handleClose">取消</el-button> -->
        <el-button plain @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CourseForm",
  props: {
    // 接收父组件传递的课程信息
    CourseInfo: {
      type: Object,
      default: () => ({
        // course_id: "570101KB0A08-2",
        // course_name: "HTML5+JavaScript程 序设计(任选)",
        // course_type: "B类((理论+实践)课)",
        // course_property: "专业课选修课",
        // course_credit: 3,
        // course_department: "汽车与智能交通学院",
        // total_hours: 40,
        // theory_hours: 0,
        // test_hours: 0,
        // computer_hours: 0,
        // practice_hours: 40,
        // other_hours: 0,
        // weekly_hours: 5,
        // pure_practice: true,
      }),
    },
  },
  data() {
    return {
      courseInfo: this.CourseInfo, // 使用 data 属性存储课程信息
      localIsChange: this.isChange, // 使用 data 属性存储是否改变的状态
      categoryOptions: [
        {
          value: "选项1",
          label: "专业基础课(必修)",
        },
        {
          value: "选项2",
          label: "专业核心课(必修)",
        },
        {
          value: "选项3",
          label: "专业课(选修)",
        },
        {
          value: "选项4",
          label: "公共基础课(必修)",
        },
        {
          value: "选项5",
          label: "公共课(选修)",
        },
        {
          value: "选项6",
          label: "实习实训(必修)",
        },
      ],
      attributeOptions: [
        {
          value: "选项1",
          label: "必修",
        },
        {
          value: "选项2",
          label: "专业核心课",
        },
        {
          value: "选项3",
          label: "专业课选修课",
        },
        {
          value: "选项4",
          label: "专业基础课",
        },
        {
          value: "选项5",
          label: "公共基础课",
        },
        {
          value: "选项6",
          label: "公共选修课",
        },
        {
          value: "选项7",
          label: "其他",
        },
        {
          value: "选项8",
          label: "任选",
        },
        {
          value: "选项9",
          label: "实习实训",
        },
        {
          value: "选项10",
          label: "限选",
        },
      ],
      typeOptions: [
        {
          value: "选项1",
          label: "A类(纯理论课)",
        },
        {
          value: "选项2",
          label: "B类((理论+实践)课)",
        },
        {
          value: "选项3",
          label: "C类(纯实践课)",
        },
      ],
      propertyOptions: [
        {
          value: "选项1",
          label: "必修课",
        },
        {
          value: "选项2",
          label: "公共必修课",
        },
        {
          value: "选项3",
          label: "公共基础课",
        },
        {
          value: "选项4",
          label: "公共选修课",
        },
        {
          value: "选项5",
          label: "实习实训",
        },
        {
          value: "选项6",
          label: "专业拓展课",
        },
        {
          value: "选项7",
          label: "专业选修课",
        },
      ],
      departmentOptions: [
        {
          value: "选项1",
          label: "公共基础学院",
        },
        {
          value: "选项2",
          label: "化学与材料工程学院",
        },
        {
          value: "选项3",
          label: "机械电气工程学院",
        },
        {
          value: "选项4",
          label: "教育艺术学院",
        },
        {
          value: "选项5",
          label: "马克思主义学院",
        },
        {
          value: "选项6",
          label: "汽车与智能交通学院",
        },
        {
          value: "选项7",
          label: "现代农业学院",
        },
        {
          value: "选项8",
          label: "心理教学部",
        },
        {
          value: "选项9",
          label: "信息智能工程学院",
        },
      ],
      rules: {
        course_id: [
          { required: true, message: "请输入课程编号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "课程编号长度应是 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        course_name: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          {
            min: 2,
            max: 25,
            message: "课程名称长度应在 2 到 25 个字符之间",
            trigger: "blur",
          },
        ],
        course_type: [
          { required: true, message: "请选择课程类型", trigger: "blur" },
        ],
        course_property: [
          { required: true, message: "请选择课程属性", trigger: "blur" },
        ],
        course_credit: [
          { required: true, message: "请输入学分", trigger: "blur" },
          { type: "number", message: "学分必须为数字", trigger: "blur" },
        ],
        course_department: [
          { required: true, message: "请选择开课院系", trigger: "blur" },
        ],
        total_hours: [
          { required: true, message: "请输入总学时", trigger: "blur" },
          { type: "number", message: "总学时必须为数字", trigger: "blur" },
        ],
        theory_hours: [
          { required: true, message: "请输入理论学时", trigger: "blur" },
          { type: "number", message: "理论学时必须为数字", trigger: "blur" },
        ],
        test_hours: [
          { required: true, message: "请输入实验学时", trigger: "blur" },
          { type: "number", message: "实验学时必须为数字", trigger: "blur" },
        ],
        computer_hours: [
          { required: true, message: "请输入计算机操作学时", trigger: "blur" },
          {
            type: "number",
            message: "计算机操作学时必须为数字",
            trigger: "blur",
          },
        ],
        practice_hours: [
          { required: true, message: "请输入实践学时", trigger: "blur" },
          { type: "number", message: "实践学时必须为数字", trigger: "blur" },
        ],
        other_hours: [
          { required: true, message: "请输入其他学时", trigger: "blur" },
          { type: "number", message: "其他学时必须为数字", trigger: "blur" },
        ],
        weekly_hours: [
          { required: true, message: "请输入周学时", trigger: "blur" },
          { type: "number", message: "周学时必须为数字", trigger: "blur" },
        ],
        pure_practice: [
          {
            required: true,
            message: "请选择是否为纯实践课程",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // 通知父组件提交表单
          this.$emit("submit", this.courseInfo);
        } else {
          console.log("表单验证失败");
        }
      });
    },
    handleReset() {
      this.courseInfo = {};
    },
    handleCourseInfoChange(newVal) {
      this.courseInfo = newVal;
    },
  },
  mounted() {
    // console.log("mounted")
  },
  destroyed() {
    // console.log("destroyed")
  },
};
</script>

<style scoped>
.base-info-section,
.select-section,
.study-hours-section1,
.study-hours-section2 {
  display: flex;
  flex-wrap: wrap;
  align-items: center; /* 修改为垂直居中对齐 */
  justify-content: center; /* 水平方向也居中对齐 */
}

.top,
.middle {
  margin-bottom: 30px;
  border: 2px solid rgba(128, 128, 128, 0.489);
  border-radius: 8px;
  padding: 12px;
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: 20px; /* 添加底部边距，使两个框之间有间隔 */
}

.top:hover,
.middle:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.top-title,
.middle-title {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: white;
  padding: 0 5px;
  z-index: 1;
  font-weight: bold;
}

.base-info-section .el-form-item,
.select-section .el-form-item,
.study-hours-section1 .el-form-item,
.study-hours-section2 .el-form-item {
  flex: 1;
  min-width: 223px; /* 设置最小宽度，防止元素过窄 */
  margin: 10px; /* 添加外边距，使元素之间有间隔 */
}
</style>