<template>
  <el-form :model="classroomInfo" :rules="rules" ref="formRef">
    <div class="base-info-section">
      <el-form-item
        label="教室编号"
        class="id"
        prop="id"
        style="max-width: 467px"
      >
        <el-input v-model="classroomInfo.id" style="width: 180px"></el-input>
      </el-form-item>
      <el-form-item label="教室名称" prop="name">
        <el-input v-model="classroomInfo.name" style="width: 280px"></el-input>
      </el-form-item>
    </div>
    <div class="select-section">
      <el-form-item label="所属校区" prop="campus">
        <el-select v-model="classroomInfo.campus" placeholder="请选择">
          <el-option
            v-for="item in campusOptions"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教学楼" prop="building" label-width="80px">
        <el-select v-model="classroomInfo.building" placeholder="请选择">
          <el-option
            v-for="item in buildingOptions"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开课院系" prop="department">
        <el-select v-model="classroomInfo.department" placeholder="请选择">
          <el-option
            v-for="item in departmentOptions"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理部门" prop="department">
        <el-select v-model="classroomInfo.department" placeholder="请选择">
          <el-option
            v-for="item in departmentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教室类型" prop="type">
        <el-select v-model="classroomInfo.type" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在楼层" prop="floor">
        <el-select v-model="classroomInfo.floor" placeholder="请选择">
          <el-option
            v-for="item in floorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </div>

    <el-form-item label="考场容纳" label-width="80px" prop="capacity">
      <el-input-number
        v-model="classroomInfo.capacity"
        :min="0"
        :step="10"
        :max="100"
        label="考场容纳"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="是否有空调" prop="has_ac">
      <el-switch
        v-model="classroomInfo.has_ac"
        active-text="是"
        inactive-text="否"
      >
      </el-switch>
    </el-form-item>
    <!-- <el-form-item label="是否启用" prop="status">
      <el-switch
        v-model="classroomInfo.status"
        active-text="是"
        inactive-text="否"
      >
      </el-switch>
    </el-form-item> -->

    <el-form-item label="教室描述" prop="description">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="classroomInfo.description"
        style="width: 280px"
      >
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button plain type="primary" @click="handleSubmit">提交</el-button>
      <el-button plain @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "ClassroomForm",
  props: {
    dialogVisible: {
      building: Boolean,
      default: false,
    },
    // 接收父组件传递的教室信息
    ClassroomInfo: {
      type: Object,
      default: () => ({
        id: "HXGCZX201",
        name: "HXGC2#201-化工分析实验室（一）",
        campus: "铁门关校区",
        building: "化学工程实训中心",
        floor: "2",
        capacity: 50,
        type: "多媒体教室",
        has_ac: false,
        description: "",
        department: "化学与材料工程学院",
        status: "启用",
      }),
    },
  },
  data() {
    return {
      isInitializing: true,
      classroomInfo: this.ClassroomInfo, // 存储教室信息
      localIsChange: this.isChange, // 存储是否改变的状态
      floorOptions: [
        {
          value: "选项1",
          label: "1",
        },
        {
          value: "选项2",
          label: "2",
        },
        {
          value: "选项3",
          label: "3",
        },
        {
          value: "选项4",
          label: "4",
        },
        {
          value: "选项5",
          label: "5",
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
      buildingOptions: [
        {
          value: "1",
          label: "车间",
        },
        {
          value: "2",
          label: "化学工程实训中心",
        },
        {
          value: "3",
          label: "机电工程实训中心",
        },
        {
          value: "4",
          label: "技能训练中心",
        },
        {
          value: "5",
          label: "教育艺术中心",
        },
        {
          value: "6",
          label: "汽车工程实训中心",
        },
        {
          value: "7",
          label: "实训楼",
        },
        {
          value: "8",
          label: "现代农业实训中心",
        },
        {
          value: "9",
          label: "信息技术中心",
        },
        {
          value: "10",
          label: "综合教学楼",
        },
      ],
      typeOptions: [
        {
          value: "选项1",
          label: "普通教室",
        },
        {
          value: "选项2",
          label: "汽修实训室",
        },
        {
          value: "选项3",
          label: "琴房",
        },
        {
          value: "选项4",
          label: "声乐教室",
        },
        {
          value: "选项5",
          label: "实训车间",
        },
        {
          value: "选项6",
          label: "网络实训室",
        },
        {
          value: "选项7",
          label: "网络综合布线室",
        },
        {
          value: "选项8",
          label: "舞蹈教室",
        },
        {
          value: "选项9",
          label: "现代电气控制实训室",
        },
        {
          value: "选项10",
          label: "虚拟仿真实训室",
        },
        {
          value: "选项11",
          label: "液压气动实训室",
        },
        {
          value: "选项12",
          label: "移动一体机",
        },
        {
          value: "选项13",
          label: "幼儿保健室",
        },
        {
          value: "选项14",
          label: "自动化生产线实训室",
        },
        {
          value: "选项15",
          label: "电工实训室",
        },
        {
          value: "选项16",
          label: "多媒体教室",
        },
        {
          value: "选项17",
          label: "公共教室",
        },
        {
          value: "选项18",
          label: "化工仿真实训室",
        },
        {
          value: "选项19",
          label: "活动室",
        },
        {
          value: "选项20",
          label: "机房",
        },
        {
          value: "选项21",
          label: "机械装调实训室",
        },
        {
          value: "选项22",
          label: "美术教室",
        },
        {
          value: "选项23",
          label: "蒙台梭立实训室",
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
        id: [
          { required: true, message: "请输入教室编号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "教室编号长度应是 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入教室名称", trigger: "blur" },
          {
            min: 2,
            max: 25,
            message: "教室名称长度应在 2 到 25 个字符之间",
            trigger: "blur",
          },
        ],
        building: [
          { required: true, message: "请选择教学楼", trigger: "blur" },
        ],
        campus: [
          { required: true, message: "请选择所属校区", trigger: "blur" },
        ],
        capacity: [
          { required: true, message: "请输入考场容纳", trigger: "blur" },
          {
            type: "number",
            message: "考场容纳必须为数字",
            trigger: "blur",
          },
        ],
        floor: [{ required: true, message: "请选择所在楼层", trigger: "blur" }],
        type: [{ required: true, message: "请选择教室类型", trigger: "blur" }],
        department: [
          {
            required: true,
            message: "请选择开课院系或管理部门",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请输入教室描述", trigger: "blur" },
        ],
        // has_ac: [
        //   { required: true, message: "请选择是否有空调", trigger: "change" },
        // ],
        // status: [
        //   { required: true, message: "请输入教室状态", trigger: "blur" },
        // ],
      },
    };
  },
  watch: {
    classroomInfo: {
      handler(_) {
        if (!this.isInitializing) {
          this.localIsChange = true;
          this.$emit("change", this.localIsChange);
        }
        this.isInitializing = false; // 初始化完成后将标志位设为 false
      },
      deep: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // 通知父组件提交表单
          this.$emit("submit", this.classroomInfo);
        } else {
          console.log("表单验证失败");
        }
      });
    },
    handleReset() {
      // this.classroomInfo = { ...this.ClassroomInfo }; // 重置为初始的 ClassroomInfo
      this.classroomInfo = {};
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
.select-section {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 10px;
}
.select-section .el-form-item {
  flex: 0 0 calc(33.33% - 20px);
  margin: 10px;
}

.base-info-section .el-form-item {
  flex: 1;
}
</style>