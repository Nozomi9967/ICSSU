<template>
  <div class="content">
    <el-form :model="scheduleInfo" :rules="rules" ref="formRef">
      <div class="top">
        <span class="top-title">基本信息</span>
        <div class="base-info-section">
          <el-form-item label="学年学期" prop="semester">
            <el-input
              v-model="scheduleInfo.semester"
              style="width: 223px"
              placeholder="例如: 2024-2025-1"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程编号" prop="course_id">
            <el-input
              v-model="scheduleInfo.course_id"
              style="width: 223px"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程名称" prop="course_name">
            <el-input
              v-model="scheduleInfo.course_name"
              style="width: 223px"
            ></el-input>
          </el-form-item>
        </div>
        <div class="select-section">
          <el-form-item label="教师工号" prop="teacher_id">
            <el-input
              v-model="scheduleInfo.teacher_id"
              style="width: 223px"
            ></el-input>
          </el-form-item>
          <el-form-item label="任课教师" prop="teacher_name">
            <el-input
              v-model="scheduleInfo.teacher_name"
              style="width: 223px"
            ></el-input>
          </el-form-item>
          <el-form-item label="教学班组成" prop="teaching_class">
            <el-input
              v-model="scheduleInfo.teaching_class"
              style="width: 223px"
            ></el-input>
          </el-form-item>
        </div>
          <div class="hours-section">
          <el-form-item label="开课学时" prop="opening_hours">
            <el-input-number
              v-model="scheduleInfo.opening_hours"
              :min="0"
              :max="480"
              label="开课学时"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="排课学时" prop="scheduling_hours">
            <el-input-number
              v-model="scheduleInfo.scheduling_hours"
              :min="0"
              :max="480"
              label="排课学时"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="总学时" prop="total_hours">
            <el-input-number
              v-model="scheduleInfo.total_hours"
              :min="0"
              :max="480"
              label="总学时"
            ></el-input-number>
          </el-form-item>
          </div>
          <div class="credit-section">
          <el-form-item label="学时类型" prop="hour_type">
            <el-select v-model="scheduleInfo.hour_type" placeholder="请选择">
              <el-option
                v-for="item in hoursTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程学分" prop="course_credit" style="margin-left: -375px">
            <el-input-number
              v-model="scheduleInfo.course_credit"
              :min="0.25"
              :max="30"
              :precision="2"
              :step="0.1"
              label="学分"
            ></el-input-number>
          </el-form-item>
        </div>
        
      </div>
      
      <div class="middle">
        <span class="middle-title">教学班信息</span>
        <div class="class-info-section">
          <el-form-item label="教学班编号" prop="teaching_class_number">
            <el-input
              v-model="scheduleInfo.teaching_class_number"
              style="width: 223px"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="教学班人数" prop="teaching_class_size">
            <el-input-number
              v-model="scheduleInfo.teaching_class_size"
              :min="1"
              :max="200"
              label="教学班人数"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="教学班名称" prop="teaching_class_name">
            <el-input
              v-model="scheduleInfo.teaching_class_name"
              style="width: 223px"
            ></el-input>
          </el-form-item>
        </div>
        
      </div>
      
      <div class="bottom">
        <span class="bottom-title">排课信息</span>
        <div class="schedule-section1">
          <el-form-item label="排课优先级" prop="scheduling_priority">
            <el-input-number
              v-model="scheduleInfo.scheduling_priority"
              :min="1"
              :max="10"
              label="排课优先级"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="课程归属" prop="course_affiliation">
            <el-input
              v-model="scheduleInfo.course_affiliation"
              style="width: 223px"
            ></el-input>
          </el-form-item>
          <el-form-item label="课程性质" prop="course_nature">
            <el-select v-model="scheduleInfo.course_nature" placeholder="请选择">
              <el-option
                v-for="item in natureOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="schedule-section2">
          <el-form-item label="开课校区" prop="opening_campus">
            <el-select v-model="scheduleInfo.opening_campus" placeholder="请选择">
              <el-option
                v-for="item in opening_campusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否外聘" prop="is_external">
            <el-switch
              v-model="scheduleInfo.is_external"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </el-form-item>
          <el-form-item label="开课院系" prop="department">
            <el-select v-model="scheduleInfo.department" placeholder="请选择">
              <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="schedule-section3">
          <el-form-item label="开课周次学时" prop="opening_week_hours">
            <el-input
              v-model="scheduleInfo.opening_week_hours"
              style="width: 223px"
              placeholder="例如: 10-18:2"
            ></el-input>
          </el-form-item>
          <el-form-item label="连排节次" prop="continuous_periods">
            <el-input-number
              v-model="scheduleInfo.continuous_periods"
              :min="1"
              :max="8"
              label="连排节次"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="指定教室类型" prop="specified_specified_classroom_type">
            <el-select v-model="scheduleInfo.specified_specified_classroom_type" placeholder="请选择">
              <el-option
                v-for="item in specified_classroomTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="schedule-section4">
          <el-form-item label="指定教室" prop="specified_classroom">
            <el-input
              v-model="scheduleInfo.specified_classroom"
              style="width: 223px"
              placeholder="例如: JXL5#517"
            ></el-input>
          </el-form-item>
          <el-form-item label="指定教学楼" prop="specified_building">
            <el-input
              v-model="scheduleInfo.specified_building"
              style="width: 223px"
            ></el-input>
          </el-form-item>
          <el-form-item label="指定时间" prop="specified_time">
            <el-input
              v-model="scheduleInfo.specified_time"
              style="width: 223px"
              placeholder="例如: 周一1-2节"
            ></el-input>
          </el-form-item>
        </div>
      </div>
      
      <el-form-item class="form-actions">
        <el-button plain type="primary" @click="handleSubmit">提交</el-button>
        <el-button plain @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ScheduleForm",
  props: {
    scheduleInfo: {
      type: Object,
      default: () => ({
        semester: "",
        course_id: "",
        course_name: "",
        teacher_id: "",
        teacher_name: "",
        teaching_class: "",
        teaching_class_number: "",
        course_affiliation: "",
        teaching_class_name: "",
        course_credit: 0,
        hour_type: "",
        opening_hours: 0,
        scheduling_hours: 0,
        total_hours: 0,
        scheduling_priority: 1,
        teaching_class_size: 30,
        course_nature: "",
        opening_campus: "",
        is_external: false,
        department: "",
        opening_week_hours: "",
        continuous_periods: 2,
        specified_specified_classroom_type: "",
        specified_classroom: "",
        specified_building: "",
        specified_time: ""
      }),
    },
  },
  data() {
    return {
      hoursTypeOptions: [
        { value: "1", label: "理论" },
        { value: "2", label: "实践" },
        { value: "3", label: "混合" }
      ],
      natureOptions: [
        { value: "1", label: "必修课" },
        { value: "2", label: "选修课" },
        { value: "3", label: "公共课" },
        { value: "4", label: "专业课" }
      ],
      opening_campusOptions: [
        { value: "1", label: "铁门关校区" },
        { value: "2", label: "其他校区" }
      ],
      departmentOptions: [
        { value: "1", label: "教育艺术学院" },
        { value: "2", label: "信息工程学院" },
        { value: "3", label: "经济管理学院" },
        { value: "4", label: "机电工程学院" }
      ],
      specified_classroomTypeOptions: [
        { value: "1", label: "多媒体教室" },
        { value: "2", label: "普通教室" },
        { value: "3", label: "实验室" },
        { value: "4", label: "机房" },
        { value: "5", label: "体育场" }
      ],
      rules: {
        semester: [
          { required: true, message: "请输入学年学期", trigger: "blur" },
          { pattern: /^\d{4}-\d{4}-\d$/, message: "格式应为YYYY-YYYY-N", trigger: "blur" }
        ],
        course_id: [
          { required: true, message: "请输入课程编号", trigger: "blur" },
          { min: 2, max: 20, message: "长度2-20个字符", trigger: "blur" }
        ],
        course_name: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          { min: 2, max: 50, message: "长度2-50个字符", trigger: "blur" }
        ],
        teacher_id: [
          { required: true, message: "请输入教师工号", trigger: "blur" }
        ],
        teacher_name: [
          { required: true, message: "请输入任课教师", trigger: "blur" }
        ],
        teaching_class: [
          { required: true, message: "请输入教学班组成", trigger: "blur" }
        ],
        teaching_class_number: [
          { required: true, message: "请输入教学班编号", trigger: "blur" }
        ],
        teaching_class_name: [
          { required: true, message: "请输入教学班名称", trigger: "blur" }
        ],
        course_credit: [
          { required: true, message: "请输入学分", trigger: "blur" },
          { type: "number", message: "必须为数字", trigger: "blur" }
        ],
        hour_type: [
          { required: true, message: "请选择学时类型", trigger: "change" }
        ],
        opening_hours: [
          { required: true, message: "请输入开课学时", trigger: "blur" },
          { type: "number", message: "必须为数字", trigger: "blur" }
        ],
        scheduling_hours: [
          { required: true, message: "请输入排课学时", trigger: "blur" },
          { type: "number", message: "必须为数字", trigger: "blur" }
        ],
        total_hours: [
          { required: true, message: "请输入总学时", trigger: "blur" },
          { type: "number", message: "必须为数字", trigger: "blur" }
        ],
        course_nature: [
          { required: true, message: "请选择课程性质", trigger: "change" }
        ],
        opening_campus: [
          { required: true, message: "请选择开课校区", trigger: "change" }
        ],
        department: [
          { required: true, message: "请选择开课院系", trigger: "change" }
        ],
        opening_week_hours: [
          { required: true, message: "请输入开课周次学时", trigger: "blur" }
        ],
        specified_specified_classroom_type: [
          { required: true, message: "请选择教室类型", trigger: "change" }
        ],
        specified_classroom: [
          { required: false, message: "请输入教室", trigger: "blur" }
        ],
        specified_time: [
          { required: false, message: "请输入时间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.scheduleInfo);
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },
    handleReset() {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>

<style scoped>
.content {
  padding: 20px;
}

.top,
.middle,
.bottom {
  margin-bottom: 30px;
  border: 2px solid rgba(128, 128, 128, 0.489);
  border-radius: 8px;
  padding: 12px;
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: 20px;
}

.top:hover,
.middle:hover,
.bottom:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.top-title,
.middle-title,
.bottom-title {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: white;
  padding: 0 5px;
  z-index: 1;
  font-weight: bold;
}

.base-info-section,
.select-section,
.class-info-section,
.hours-section,
.credit-section,
.schedule-section1,
.schedule-section2,
.schedule-section3,
.schedule-section4 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.base-info-section .el-form-item,
.select-section .el-form-item,
.class-info-section .el-form-item,
.hours-section .el-form-item,
.credit-section .el-form-item,
.schedule-section1 .el-form-item,
.schedule-section2 .el-form-item,
.schedule-section3 .el-form-item,
.schedule-section4 .el-form-item {
  flex: 1;
  min-width: 223px;
  margin: 10px;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>