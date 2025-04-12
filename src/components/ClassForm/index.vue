<template>
  <div class="content">
    <el-form :model="classInfo" ref="formRef">
      <div class="vital-info-section">
        <span class="vital-title">关键信息</span>
        <el-form-item
          label="班级编号"
          class="id"
          prop="ID"
          style="max-width: 467px"
        >
          <el-input v-model="classInfo.ID" style="width: 223px"></el-input>
        </el-form-item>
        <el-form-item label="固定教室" prop="FixedClassroom">
          <el-input
            v-model="classInfo.FixedClassroom"
            style="width: 223px"
          ></el-input>
        </el-form-item>

        <el-form-item label="专业编号" prop="MajorID">
          <el-input v-model="classInfo.MajorID" style="width: 223px"></el-input>
        </el-form-item>
      </div>
      <div class="select-section">
        <span class="base-title">基本信息</span>

        <el-form-item label="班级类型" prop="Type">
          <el-select v-model="classInfo.Type" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="Department">
          <el-select v-model="classInfo.Department" placeholder="请选择">
            <el-option
              v-for="item in departmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属校区" prop="Campus">
          <el-select v-model="classInfo.Campus" placeholder="请选择">
            <el-option
              v-for="item in campusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" prop="Name">
          <el-input v-model="classInfo.Name" style="width: 223px"></el-input>
        </el-form-item>
        <el-form-item label="专业名称" prop="Major">
          <el-input v-model="classInfo.Major" style="width: 223px"></el-input>
        </el-form-item>
        <el-form-item label="培养层次" prop="Cultivation">
          <el-select v-model="classInfo.Cultivation" placeholder="请选择">
            <el-option
              v-for="item in cultivationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入学年份" prop="Year">
          <el-date-picker
            v-model="classInfo.Year"
            type="year"
            placeholder="选择年"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预计毕业年度" prop="ExpectedYear">
          <el-date-picker
            v-model="classInfo.ExpectedYear"
            type="year"
            placeholder="选择年"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学制" prop="Academic" label-width="80px">
          <el-select v-model="classInfo.Academic" placeholder="请选择">
            <el-option
              v-for="item in academicOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="other-info-section">
        <span class="other-title">其它信息</span>

        <el-form-item label="是否毕业" prop="IsGraduation">
          <el-switch
            v-model="classInfo.IsGraduation"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </el-form-item>
        <!-- <el-form-item label="是否固定" prop="IsFixed">
          <el-switch
            v-model="classInfo.IsFixed"
            active-text="是"
            inactive-text="否"
          >
          </el-switch>
        </el-form-item> -->
        <el-form-item label="学生人数" label-width="80px" prop="StudentCount">
          <el-input-number
            v-model="classInfo.StudentCount"
            :min="0"
            :step="10"
            label="学生人数"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="最大人数" label-width="80px" prop="MaxCount">
          <el-input-number
            v-model="classInfo.MaxCount"
            :min="1"
            :step="10"
            label="最大人数"
          ></el-input-number>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button plain type="primary" @click="handleSubmit">提交</el-button>
        <el-button plain @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ClassForm",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    ClassInfo: {
      type: Object,
      default: () => ({
        ID: "18hg",
        Name: "18化工班",
        Academic: "3年",
        Cultivation: "中职",
        Type: "普通班级",
        ExpectedYear: "2021",
        IsGraduation: "已毕业",
        StudentCount: 20,
        MaxCount: 50,
        Year: "2018",
        Department: "化学与材料工程学院",
        MajorID: "670201",
        Major: "化学工艺(中职)",
        Campus: "库尔勒校区",
        FixedClassroom: "JXL2#204",
        // IsFixed: "是",
      }),
    },
  },
  data() {
    return {
      classInfo: {}, // 先初始化为空对象
      academicOptions: [
        {
          value: "1",
          label: "3年",
        },
        {
          value: "2",
          label: "5年",
        },
      ],
      typeOptions: [
        {
          value: "1",
          label: "普通班级",
        },
        {
          value: "2",
          label: "扩招班级",
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
      campusOptions: [
        {
          value: "选项1",
          label: "库尔勒校区",
        },
        {
          value: "选项2",
          label: "铁门关校区",
        },
      ],
      cultivationOptions: [
        {
          value: "1",
          label: "中职",
        },
        {
          value: "2",
          label: "专科",
        },
      ],
      rules: {
        ID: [
          { required: true, message: "请输入班级编号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "班级编号长度应是 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        Name: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
          {
            min: 2,
            max: 25,
            message: "班级名称长度应在 2 到 25 个字符之间",
            trigger: "blur",
          },
        ],
        Academic: [{ required: true, message: "请输入学制", trigger: "blur" }],
        Cultivation: [
          { required: true, message: "请输入培养层次", trigger: "blur" },
        ],
        Type: [{ required: true, message: "请输入班级类型", trigger: "blur" }],
        ExpectedYear: [
          { required: true, message: "请输入预计毕业年度", trigger: "blur" },
        ],
        IsGraduation: [
          { required: true, message: "请输入是否毕业", trigger: "blur" },
        ],
        StudentCount: [
          { required: true, message: "请输入学生人数", trigger: "blur" },
          {
            type: "number",
            message: "学生人数必须为数字",
            trigger: "blur",
          },
        ],
        MaxCount: [
          { required: true, message: "请输入最大人数", trigger: "blur" },
          {
            type: "number",
            message: "最大人数必须为数字",
            trigger: "blur",
          },
        ],
        Year: [{ required: true, message: "请输入入学年份", trigger: "blur" }],
        Department: [
          { required: true, message: "请输入所属部门", trigger: "blur" },
        ],
        MajorID: [
          { required: true, message: "请输入专业编号", trigger: "blur" },
        ],
        Major: [{ required: true, message: "请输入专业名称", trigger: "blur" }],
        Campus: [
          { required: true, message: "请输入所属校区", trigger: "blur" },
        ],
        FixedClassroom: [
          { required: true, message: "请输入固定教室", trigger: "blur" },
        ],
        // IsFixed: [
        //   { required: true, message: "请输入是否固定", trigger: "blur" },
        // ],
      },
    };
  },
  created() {
    const { Year, ExpectedYear, ...rest } = this.ClassInfo;
    const year = Year ? new Date(parseInt(Year), 0, 1) : null;
    const expectedYear = ExpectedYear
      ? new Date(parseInt(ExpectedYear), 0, 1)
      : null;
    this.classInfo = {
      ...rest,
      Year: year,
      ExpectedYear: expectedYear,
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // 通知父组件提交表单
          this.classInfo.Year = this.classInfo.Year.getFullYear().toString();
          this.classInfo.ExpectedYear =
            this.classInfo.ExpectedYear.getFullYear().toString();

          // 进行数据格式转换
          const convertedData = {
            id: this.classInfo.ID,
            name: this.classInfo.Name,
            academic: this.classInfo.Academic,
            cultivation: this.classInfo.Cultivation,
            type: this.classInfo.Type,
            expected_year: this.classInfo.ExpectedYear,
            is_graduation: this.classInfo.IsGraduation ? "true" : "false",
            student_count: this.classInfo.StudentCount.toString(),
            max_count: this.classInfo.MaxCount.toString(),
            year: this.classInfo.Year,
            department: this.classInfo.Department,
            major_id: this.classInfo.MajorID,
            major: this.classInfo.Major,
            campus: this.classInfo.Campus,
            fixed_classroom: this.classInfo.FixedClassroom,
          };

          this.$emit("submit", convertedData);
        } else {
          console.log("表单验证失败");
        }
      });
    },
    handleReset() {
      this.classInfo = {};
    },
    handleClassInfoChange(newVal) {
      this.classInfo = newVal;
    },
  },
};
</script>

<style scoped>
.content {
  padding: 10px 160px;
}

.vital-info-section,
.select-section,
.other-info-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center; /* 修改为垂直居中对齐 */
  justify-content: center; /* 水平方向也居中对齐 */
  margin-bottom: 30px;
  border: 2px solid rgba(128, 128, 128, 0.489);
  border-radius: 8px;
  padding: 12px;
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: 20px; /* 添加底部边距，使两个框之间有间隔 */
}

.vital-info-section:hover,
.select-section:hover,
.other-info-section:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.vital-title,
.base-title,
.other-title {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: white;
  padding: 0 5px;
  z-index: 1;
  font-weight: bold;
}

.select-section .el-form-item {
  flex: 0 0 calc(33.33% - 20px);
  margin: 10px;
}

.vital-info-section .el-form-item {
  flex: 1;
  min-width: 223px; /* 设置最小宽度，防止元素过窄 */
  margin: 10px; /* 添加外边距，使元素之间有间隔 */
}

.other-info-section .el-form-item {
  flex: 0 0 calc(33.33% - 20px);
  margin: 10px;
}
</style>