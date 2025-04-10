<template>
  <div class="content">
    <el-form :model="teacherInfo" :rules="rules" ref="formRef">
      <div class="vital-info-section">
        <span class="vital-title">关键信息</span>
        <el-form-item label="教师编号" prop="id">
          <el-input
            v-model="teacherInfo.id"
            placeholder="请输入教师编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="teacherInfo.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-switch
            v-model="teacherInfo.gender"
            active-text="男性"
            inactive-text="女性"
            :active-value="'男性'"
            :inactive-value="'女性'"
          >
          </el-switch>
        </el-form-item>
      </div>
      <div class="select-section">
        <span class="base-title">基本信息</span>
        <el-form-item label="英文名" prop="english_name">
          <el-input
            v-model="teacherInfo.english_name"
            placeholder="请输入英文名"
          ></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="ethnicity">
          <el-select
            v-model="teacherInfo.ethnicity"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in ethnicityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位" prop="department">
          <el-select v-model="teacherInfo.department" placeholder="请选择单位">
            <el-option
              v-for="item in departmentOptions"
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
        <el-form-item label="是否外聘" prop="is_external">
          <el-switch
            v-model="teacherInfo.is_external"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>
        <el-form-item label="职称" prop="title">
          <el-input
            v-model="teacherInfo.title"
            placeholder="请输入职称"
          ></el-input>
        </el-form-item>
        <el-form-item label="教职工类别" prop="category">
          <el-input
            v-model="teacherInfo.category"
            placeholder="请输入教职工类别"
          ></el-input>
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
  name: "TeacherForm",
  props: {
    TeacherInfo: {
      type: Object,
      default: () => ({
        id: "0304",
        name: "李凤娟",
        english_name: "",
        gender: "女性",
        ethnicity: "汉族",
        department: "化学与材料工程学院",
        title: "",
        category: "",
        is_external: false,
        status: "",
      }),
    },
  },
  data() {
    return {
      teacherInfo: this.TeacherInfo, // 存储教师信息
      departmentOptions: [
        { value: "1", label: "化学与材料工程学院" },
        { value: "2", label: "信息智能工程学院" },
        { value: "3", label: "公共基础学院" },
        { value: "4", label: "教务处" },
        { value: "5", label: "后勤管理服务中心" },
        { value: "6", label: "教育艺术学院" },
        { value: "7", label: "马克思主义学院" },
        { value: "8", label: "汽车与智能交通学院" },
        { value: "9", label: "党委行政办公室" },
        { value: "10", label: "学院领导" },
      ],
      ethnicityOptions: [
        { value: "1", label: "汉族" },
        { value: "2", label: "壮族" },
        { value: "3", label: "满族" },
        { value: "4", label: "回族" },
        { value: "5", label: "苗族" },
        { value: "6", label: "维吾尔族" },
        { value: "7", label: "土家族" },
        { value: "8", label: "彝族" },
        { value: "9", label: "藏族" },
        { value: "10", label: "蒙古族" },
        { value: "11", label: "侗族" },
        { value: "12", label: "布依族" },
        { value: "13", label: "瑶族" },
        { value: "14", label: "白族" },
        { value: "15", label: "朝鲜族" },
        { value: "16", label: "哈尼族" },
        { value: "17", label: "黎族" },
        { value: "18", label: "哈萨克族" },
        { value: "19", label: "傣族" },
        { value: "20", label: "畲族" },
        { value: "21", label: "傈僳族" },
        { value: "22", label: "东乡族" },
        { value: "23", label: "仡佬族" },
        { value: "24", label: "拉祜族" },
        { value: "25", label: "水族" },
        { value: "26", label: "佤族" },
        { value: "27", label: "纳西族" },
        { value: "28", label: "羌族" },
        { value: "29", label: "土族" },
        { value: "30", label: "锡伯族" },
        { value: "31", label: "仫佬族" },
        { value: "32", label: "柯尔克孜族" },
        { value: "33", label: "达斡尔族" },
        { value: "34", label: "景颇族" },
        { value: "35", label: "毛南族" },
        { value: "36", label: "撒拉族" },
        { value: "37", label: "布朗族" },
        { value: "38", label: "塔吉克族" },
        { value: "39", label: "阿昌族" },
        { value: "40", label: "普米族" },
        { value: "41", label: "鄂温克族" },
        { value: "42", label: "怒族" },
        { value: "43", label: "京族" },
        { value: "44", label: "基诺族" },
        { value: "45", label: "德昂族" },
        { value: "46", label: "保安族" },
        { value: "47", label: "俄罗斯族" },
        { value: "48", label: "裕固族" },
        { value: "49", label: "乌孜别克族" },
        { value: "50", label: "门巴族" },
        { value: "51", label: "鄂伦春族" },
        { value: "52", label: "独龙族" },
        { value: "53", label: "赫哲族" },
        { value: "54", label: "高山族" },
        { value: "55", label: "珞巴族" },
        { value: "56", label: "塔塔尔族" },
      ],
      rules: {
        id: [
          { required: true, message: "请输入ID", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 30,
            message: "长度在 2 到 30 个字符",
            trigger: "blur",
          },
        ],
        english_name: [
          { required: false, message: "请输入英文名", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        ethnicity: [{ required: true, message: "请选择民族", trigger: "blur" }],
        department: [
          { required: true, message: "请输入部门", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        title: [
          { required: false, message: "请输入职位", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        category: [
          { required: false, message: "请输入分类", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
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
          this.$emit("submit", this.teacherInfo);
        } else {
          console.log("表单验证失败");
        }
      });
    },
    handleReset() {
      this.teacherInfo = {}; // 重置为初始的 teacherInfo
    },
    handleTeacherInfoChange(newVal) {
      this.teacherInfo = newVal;
    },
  },
};
</script>

<style scoped>
.content {
  height: 380px;
  width: 1020px;
  padding: 10px 10px;
}

.vital-info-section,
.select-section,
.other-info-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  border: 2px solid rgba(128, 128, 128, 0.489);
  border-radius: 8px;
  padding: 12px;
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: 20px;
}

.vital-info-section .el-input,
.select-section .el-input,
.other-info-section .el-input {
  width: 223px;
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
  min-width: 223px;
  margin: 10px;
}

.other-info-section .el-form-item {
  flex: 1;
  min-width: 223px;
  margin: 10px;
}
</style>