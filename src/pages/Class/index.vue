<template>
  <div class="content">
    <el-tabs type="border-card" v-model="activeTabIndex">
      <el-tab-pane label="管理" name="1">
        <!-- 管理 -->
        <div class="manage-section">
          <div class="table-tag">
            <div class="table-section">
              <el-table :data="filterTableData()" border style="height: 701px">
                <el-table-column fixed prop="ID" width="200">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>班级编号</span>
                      <el-popover
                        placement="bottom"
                        title="请输入班级编号"
                        width="200"
                        trigger="click"
                      >
                        <!-- Popover 内容 -->
                        <div>
                          <el-input
                            v-model="filter.id.searchId"
                            placeholder="输入编号过滤"
                            @input="handleIdFilterInput"
                          ></el-input>
                        </div>

                        <!-- 触发按钮放在 reference slot 中 -->
                        <el-button
                          slot="reference"
                          icon="el-icon-search"
                          circle
                          size="mini"
                          class="search-btn"
                        ></el-button>
                      </el-popover>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Name" width="300">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>班级名称</span>
                      <el-popover
                        placement="bottom"
                        title="请输入班级名称"
                        width="200"
                        trigger="click"
                      >
                        <!-- Popover 内容 -->
                        <div>
                          <el-input
                            v-model="filter.name.searchName"
                            placeholder="输入名称过滤"
                            @input="handleNameFilterInput"
                          ></el-input>
                        </div>
                        <!-- 触发按钮放在 reference slot 中 -->
                        <el-button
                          slot="reference"
                          icon="el-icon-search"
                          circle
                          size="mini"
                          class="search-btn"
                        ></el-button>
                      </el-popover>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Academic" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'academic')
                        "
                      >
                        <span class="el-dropdown-link">
                          学制<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.academicList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Cultivation" width="180">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'cultivation')
                        "
                      >
                        <span class="el-dropdown-link">
                          培养层次<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.cultivationList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Type" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="(command) => handleCommand(command, 'type')"
                      >
                        <span class="el-dropdown-link">
                          班级类型<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.typeList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="ExpectedYear"
                  label="预计毕业年度"
                  width="150"
                >
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'expectedYear')
                        "
                      >
                        <span class="el-dropdown-link">
                          预计毕业年度<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.expectedYearList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="IsGraduation"
                  label="是否毕业"
                  width="120"
                >
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'isGraduation')
                        "
                      >
                        <span class="el-dropdown-link">
                          是否毕业<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="0"
                            :disabled="
                              !filter.isGraduation.isGraduationExists[0]
                            "
                            >已毕业</el-dropdown-item
                          >
                          <el-dropdown-item
                            :command="1"
                            :disabled="
                              !filter.isGraduation.isGraduationExists[1]
                            "
                            >未毕业</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="StudentCount"
                  label="学生人数"
                  width="120"
                >
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'studentCount')
                        "
                      >
                        <span class="el-dropdown-link">
                          学生人数<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="0">升序</el-dropdown-item>
                          <el-dropdown-item :command="1">降序</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="MaxCount" label="最大人数" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'maxCount')
                        "
                      >
                        <span class="el-dropdown-link">
                          最大人数<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="0">升序</el-dropdown-item>
                          <el-dropdown-item :command="1">降序</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Year" label="入学年份" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="(command) => handleCommand(command, 'year')"
                      >
                        <span class="el-dropdown-link">
                          入学年份<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.yearList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Department" label="所属部门" width="180">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'department')
                        "
                      >
                        <span class="el-dropdown-link">
                          所属部门<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.departmentList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="MajorID" width="300">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>专业编号</span>
                      <el-popover
                        placement="bottom"
                        title="请输入专业编号"
                        width="200"
                        trigger="click"
                      >
                        <!-- Popover 内容 -->
                        <div>
                          <el-input
                            v-model="filter.majorId.searchMajorId"
                            placeholder="输入名称过滤"
                            @input="handleMajorIdFilterInput"
                          ></el-input>
                        </div>
                        <!-- 触发按钮放在 reference slot 中 -->
                        <el-button
                          slot="reference"
                          icon="el-icon-search"
                          circle
                          size="mini"
                          class="search-btn"
                        ></el-button>
                      </el-popover>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Major" width="300">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>专业名称</span>
                      <el-popover
                        placement="bottom"
                        title="请输入专业名称"
                        width="200"
                        trigger="click"
                      >
                        <!-- Popover 内容 -->
                        <div>
                          <el-input
                            v-model="filter.major.searchMajor"
                            placeholder="输入名称过滤"
                            @input="handleMajorFilterInput"
                          ></el-input>
                        </div>
                        <!-- 触发按钮放在 reference slot 中 -->
                        <el-button
                          slot="reference"
                          icon="el-icon-search"
                          circle
                          size="mini"
                          class="search-btn"
                        ></el-button>
                      </el-popover>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Campus" label="所属校区" width="130">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="(command) => handleCommand(command, 'campus')"
                      >
                        <span class="el-dropdown-link">
                          所属校区<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.campusList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="FixedClassroom"
                  label="固定教室"
                  width="300"
                >
                  <template v-slot:header>
                    <div class="header-font">
                      <span>固定教室</span>
                      <el-popover
                        placement="bottom"
                        title="请输入固定教室"
                        width="200"
                        trigger="click"
                      >
                        <!-- Popover 内容 -->
                        <div>
                          <el-input
                            v-model="filter.fixedClassroom.searchFixedClassroom"
                            placeholder="输入名称过滤"
                            @input="handleFixedClassroomFilterInput"
                          ></el-input>
                        </div>
                        <!-- 触发按钮放在 reference slot 中 -->
                        <el-button
                          slot="reference"
                          icon="el-icon-search"
                          circle
                          size="mini"
                          class="search-btn"
                        ></el-button>
                      </el-popover>
                    </div>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  prop="IsFixed"
                  label="是否固定教室"
                  width="100"
                >
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'isFixed')
                        "
                      >
                        <span class="el-dropdown-link">
                          是否固定教室<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="0"
                            :disabled="!filter.isFixed.isFixedExists[0]"
                            >是</el-dropdown-item
                          >
                          <el-dropdown-item
                            :command="1"
                            :disabled="!filter.isFixed.isFixedExists[1]"
                            >否</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column> -->
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <div class="buttons">
                      <el-button
                        @click="handleDeleteClass(scope.row)"
                        type="text"
                        size="small"
                        >删除</el-button
                      >
                      <el-button
                        @click="handleModifyClass(scope.row)"
                        type="text"
                        size="small"
                        >编辑</el-button
                      >
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="tags-section">
              <div class="tags">
                <el-tag
                  v-for="item in tagsList"
                  ref="tagRefs"
                  :key="item.id"
                  :type="tagType[item.id % tagType.length]"
                  closable
                  @close="handleCloseTag(item)"
                  >{{ item.value }}</el-tag
                >
              </div>
              <div class="tags-reset">
                <el-button type="danger" round @click="handleClearTags"
                  >清空标签</el-button
                >
              </div>
            </div>
          </div>
          <el-dialog
            width="70%"
            title="班级详细"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
          >
            <template v-if="dialogVisible">
              <ClassForm
                ref="classFormRef"
                :ClassInfo="classInfo"
                @submit="handleManageSubmit"
              ></ClassForm>
            </template>
          </el-dialog>
          <!-- 分页 -->
          <div class="pagi-section">
            <el-pagination
              style="margin-top: 5px"
              background
              layout="prev, pager, next"
              :total="Pagi.total"
              :page-size="Pagi.pageSize"
              :current-page="Pagi.current"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新增" name="2">
        <!-- 新增 -->
        <div class="insert-section">
          <ClassForm
            :ClassInfo="classInsertInfo"
            ref="classInsertFormRef"
            @submit="handleInsertSubmit"
          ></ClassForm>
          <!-- excel输入 -->
          <div class="excel-upload-section">
            <el-upload
              class="upload-child"
              :auto-upload="false"
              drag
              :action="getClassFileUploadUrl"
              :before-upload="handleBeforeUpload"
              ref="classUploadRef"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                只能上传.xlsx/.xls文件，且不超过500kb
              </div>
            </el-upload>
            <el-button
              type="primary"
              @click="handleClassUpload"
              class="upload-child upload-button"
            >
              上传<i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ClassForm from "@/components/ClassForm";
import { SERVER_URL, CLASS_PREFIX, TAGS_NUM } from "@config";
import axios from "axios";
export default {
  name: "Class",
  components: {
    ClassForm,
  },
  mounted() {
    this.handleGetClasses();
  },
  data() {
    return {
      activeTabIndex: "1", // 控制 tab-pane
      tableData: [], // 总数据
      serverUrl: SERVER_URL,
      classPrefix: CLASS_PREFIX, // 假设这里是班级相关的前缀
      tagsNum: TAGS_NUM,
      dialogVisible: false, // 编辑的 dialog
      classInfo: {}, // 管理用
      classInsertInfo: {}, // 新增用
      tagType: ["", "success", "info", "warning", "danger"],
      tagsList: [],
      maxTagWidth: 210, // 单个 tag 的最大宽度，单位为 px，可根据需求调整
      startOffset: 2,
      list: {
        academicList: [],
        cultivationList: [],
        typeList: [],
        expectedYearList: [],
        isGraduationList: ["已毕业", "未毕业"],
        yearList: [],
        departmentList: [],
        campusList: [],
        sortList: ["升序", "降序"],
      },
      Pagi: {
        pageSize: 12,
        total: 100,
        current: 1,
      },
      filter: {
        id: {
          searchId: "",
        },
        name: {
          searchName: "",
        },
        academic: {
          searchAcademic: [],
          activeAcademicItems: [],
          academicTagIdIndex: undefined,
        },
        cultivation: {
          searchCultivation: [],
          activeCultivationItems: [],
          cultivationTagIdIndex: undefined,
        },
        type: {
          searchType: [],
          activeTypeItems: [],
          typeTagIdIndex: undefined,
        },
        expectedYear: {
          searchExpectedYear: [],
          activeExpectedYearItems: [],
          expectedYearTagIdIndex: undefined,
        },
        isGraduation: {
          searchIsGraduation: undefined,
          isGraduationExists: [false, false],
          isGraduationTagIdIndex: undefined,
        },
        studentCount: {
          searchStudentCount: undefined,
          studentCountTagIdIndex: undefined,
        },
        maxCount: {
          searchMaxCount: undefined,
          maxCountTagIdIndex: undefined,
        },
        year: {
          searchYear: [],
          activeYearItems: [],
          yearTagIdIndex: undefined,
        },
        department: {
          searchDepartment: [],
          activeDepartmentItems: [],
          departmentTagIdIndex: undefined,
        },
        majorId: {
          searchMajorId: "",
        },
        major: {
          searchMajor: "",
        },
        campus: {
          searchCampus: [],
          activeCampusItems: [],
          campusTagIdIndex: undefined,
        },
        fixedClassroom: {
          searchFixedClassroom: "",
        },
        isFixed: {
          searchIsFixed: undefined,
          isFixedExists: [false, false],
          isFixedTagIdIndex: undefined,
        },
        curSearch: [], // 储存当前搜索的表头名，也就是实际生效的筛选类
      },
    };
  },
  watch: {
    tagsList: {
      immediate: true,
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.checkTagWidths();
        });
      },
    },
  },
  computed: {
    getClassFileUploadUrl() {
      return `${this.serverUrl}${this.classPrefix}/create/file`;
    },
    getClassInsertUrl() {
      return `${this.serverUrl}${this.classPrefix}/create`;
    },
    getAllClassesUrl() {
      return `${this.serverUrl}${this.classPrefix}/queryall`;
    },
  },
  methods: {
    // 新增
    handleBeforeUpload(file) {
      // 检查文件类型和大小
      const isXlsx = [".xlsx", ".xls"].some((ext) => file.name.endsWith(ext));
      const isLt500kb = file.size / 1024 < 500;
      if (!isXlsx) {
        this.$message.error("只能上传.xlsx/.xls文件");
        return false;
      }
      if (!isLt500kb) {
        this.$message.error("文件大小不能超过500kb");
        return false;
      }
      return true;
    },
    handleClassUpload() {
      const uploadFiles = this.$refs.classUploadRef.uploadFiles;
      if (uploadFiles.length === 0) {
        this.$message.error("请选择要上传的文件");
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "文件正在上传中，请耐心等待",
        spinner: "el-icon-loading",
        background: "rgba(0,0,0,0.7)",
      });
      const formData = new FormData();
      uploadFiles.forEach((file) => {
        formData.append("class_file", file.raw);
      });
      axios
        .post(this.getClassFileUploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status === 200) {
            loading.close();
            this.$message({
              type: "success",
              message: "文件上传成功",
            });
            // 清空已上传的文件列表
            this.$refs.classUploadRef.clearFiles();
            this.handleGetClasses();
          } else {
            this.$message.error("文件上传失败");
            loading.close();
          }
        })
        .catch((error) => {
          console.error("上传出错:", error);
          this.$message.error("上传过程中出现错误");
          loading.close();
        });
    },
    handleInsertSubmit(info) {
      console.log(info);
      axios
        .post(this.getClassInsertUrl, info)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.$message.success("新增成功");
            this.handleInsertReset();
            this.handleGetClasses(); // 刷新
          } else {
            this.$message.error("新增失败!");
          }
        })
        .catch((error) => {
          const errMsg = error.response.data.message;
          this.$message.error(`新增失败！${errMsg}`);
        });
    },
    handleInsertReset() {
      this.$refs.classInsertFormRef.handleReset();
    },
    // 管理
    handleProcessTableData() {
      this.Pagi.total = this.tableData.length;

      // Academic
      const academicSet = new Set();
      this.tableData.forEach((item) => {
        if (item.Academic) {
          academicSet.add(item.Academic);
        }
      });
      this.list.academicList = Array.from(academicSet);
      this.filter.academic.activeAcademicItems = Array(
        this.list.academicList.length
      ).fill(false);
      this.filter.academic.academicTagIdIndex = this.startOffset;

      // Cultivation
      const cultivationSet = new Set();
      this.tableData.forEach((item) => {
        if (item.Cultivation) {
          cultivationSet.add(item.Cultivation);
        }
      });
      this.list.cultivationList = Array.from(cultivationSet);
      this.filter.cultivation.activeCultivationItems = Array(
        this.list.cultivationList.length
      ).fill(false);
      this.filter.cultivation.cultivationTagIdIndex =
        this.filter.academic.academicTagIdIndex + this.list.academicList.length;

      // Type
      const typeSet = new Set();
      this.tableData.forEach((item) => {
        if (item.Type) {
          typeSet.add(item.Type);
        }
      });
      this.list.typeList = Array.from(typeSet);
      this.filter.type.activeTypeItems = Array(this.list.typeList.length).fill(
        false
      );
      this.filter.type.typeTagIdIndex =
        this.filter.cultivation.cultivationTagIdIndex +
        this.list.cultivationList.length;

      // ExpectedYear
      const expectedYearSet = new Set();
      this.tableData.forEach((item) => {
        if (item.ExpectedYear) {
          expectedYearSet.add(item.ExpectedYear);
        }
      });
      this.list.expectedYearList = Array.from(expectedYearSet);
      this.filter.expectedYear.activeExpectedYearItems = Array(
        this.list.expectedYearList.length
      ).fill(false);
      this.filter.expectedYear.expectedYearTagIdIndex =
        this.filter.type.typeTagIdIndex + this.list.typeList.length;

      // IsGraduation
      this.filter.isGraduation.isGraduationExists = [false, false];
      this.tableData.forEach((item) => {
        if (item.IsGraduation === "已毕业") {
          this.filter.isGraduation.isGraduationExists[0] = true;
        } else {
          this.filter.isGraduation.isGraduationExists[1] = true;
        }
      });
      this.filter.isGraduation.isGraduationTagIdIndex =
        this.filter.expectedYear.expectedYearTagIdIndex +
        this.list.expectedYearList.length;

      // StudentCount
      this.filter.studentCount.studentCountTagIdIndex =
        this.filter.isGraduation.isGraduationTagIdIndex +
        this.list.sortList.length;

      // MaxCount
      this.filter.maxCount.maxCountTagIdIndex =
        this.filter.studentCount.studentCountTagIdIndex +
        this.list.sortList.length;

      // Year
      const yearSet = new Set();
      this.tableData.forEach((item) => {
        if (item.Year) {
          yearSet.add(item.Year);
        }
      });
      this.list.yearList = Array.from(yearSet);
      this.filter.year.activeYearItems = Array(this.list.yearList.length).fill(
        false
      );
      this.filter.year.yearTagIdIndex =
        this.filter.maxCount.maxCountTagIdIndex + this.list.sortList.length;

      // Department
      const departmentSet = new Set();
      this.tableData.forEach((item) => {
        if (item.Department) {
          departmentSet.add(item.Department);
        }
      });
      this.list.departmentList = Array.from(departmentSet);
      this.filter.department.activeDepartmentItems = Array(
        this.list.departmentList.length
      ).fill(false);
      this.filter.department.departmentTagIdIndex =
        this.filter.year.yearTagIdIndex + this.list.yearList.length;

      // MajorID
      this.filter.majorId.majorIdTagIdIndex =
        this.filter.department.departmentTagIdIndex +
        this.list.departmentList.length;

      // Major
      this.filter.major.majorTagIdIndex =
        this.filter.majorId.majorIdTagIdIndex + 1;

      // Campus
      const campusSet = new Set();
      this.tableData.forEach((item) => {
        if (item.Campus) {
          campusSet.add(item.Campus);
        }
      });
      this.list.campusList = Array.from(campusSet);
      this.filter.campus.activeCampusItems = Array(
        this.list.campusList.length
      ).fill(false);
      this.filter.campus.campusTagIdIndex =
        this.filter.major.majorTagIdIndex + 1;

      // FixedClassroom
      this.filter.fixedClassroom.fixedClassroomTagIdIndex =
        this.filter.campus.campusTagIdIndex + this.list.campusList.length;

      // IsFixed
      // this.filter.isFixed.isFixedExists = [false, false];
      // this.tableData.forEach((item) => {
      //   if (item.IsFixed === "是") {
      //     this.filter.isFixed.isFixedExists[0] = true;
      //   } else {
      //     this.filter.isFixed.isFixedExists[1] = true;
      //   }
      // });
      // this.filter.isFixed.isFixedTagIdIndex =
      //   this.filter.fixedClassroom.fixedClassroomTagIdIndex + 1;
    },
    handleGetClasses() {
      axios
        .get(this.getAllClassesUrl)
        .then((res) => {
          // 请求成功
          if (res.status === 200) {
            this.tableData = res.data.data;
            this.handleProcessTableData();
          } else {
            this.$message({
              type: "error",
              message: "数据请求失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "error",
            message: "数据请求失败",
          });
        });
    },
    handleDeleteClass(row) {
      const classId = row.ID;
      axios
        .delete(`${this.serverUrl}${this.classPrefix}/delete/${classId}`)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.handleGetClasses();
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "error",
            message: "删除失败",
          });
        });
    },
    handleModifyClass(row) {
      this.classInfo = {
        ...row,
      };
      this.dialogVisible = true;
    },
    handleManageReset() {
      this.classInfo = {};
    },
    handleManageSubmit(newClassInfo) {
      console.log(newClassInfo);
      axios
        .put(
          `${this.serverUrl}${this.classPrefix}/update/${newClassInfo.id}`,
          newClassInfo
        )
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.handleGetClasses();
            this.dialogVisible = false;
          } else {
            this.$message({
              type: "error",
              message: "修改失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          const errMsg = err.response.data.message;
          this.$message({
            type: "error",
            message: `修改失败,${errMsg}`,
          });
        });
    },
    handleCurrentChange(newValue) {
      this.Pagi.current = newValue;
    },
    handleCommand(command, type) {
      if (this.tagsList.length >= this.tagsNum) {
        this.$message.warning("添加的筛选数量已达上限，请删除一些再添加");
        return;
      }

      const handleTagLogic = (filterProp, listProp, searchProp, typeName) => {
        const tag = {
          id: this.filter[filterProp][`${filterProp}TagIdIndex`],
          value: `${typeName}：${this.list[listProp][command]}`,
        };
        if (this.filter[filterProp][searchProp] === undefined) {
          if (!this.filter.curSearch.includes(filterProp)) {
            this.filter.curSearch.push(filterProp);
          }
          this.tagsList.push(tag);
          this.filter[filterProp][searchProp] = command === 0 ? true : false;
        } else if (
          (this.filter[filterProp][searchProp] && !command) ||
          (!this.filter[filterProp][searchProp] && command)
        ) {
          this.$message.warning("你已添加过该标签");
          return;
        } else {
          this.filter[filterProp][searchProp] = command === 0 ? true : false;
          for (let index in this.tagsList) {
            if (this.tagsList[index].id === tag.id) {
              this.tagsList[
                index
              ].value = `${typeName}：${this.list[listProp][command]}`;
            }
          }
        }
        return;
      };

      let activeItems, tagIdIndex, list, searchList;
      switch (type) {
        case "academic":
          activeItems = this.filter.academic.activeAcademicItems;
          tagIdIndex = this.filter.academic.academicTagIdIndex;
          list = this.list.academicList;
          searchList = this.filter.academic.searchAcademic;
          break;
        case "cultivation":
          activeItems = this.filter.cultivation.activeCultivationItems;
          tagIdIndex = this.filter.cultivation.cultivationTagIdIndex;
          list = this.list.cultivationList;
          searchList = this.filter.cultivation.searchCultivation;
          break;
        case "type":
          activeItems = this.filter.type.activeTypeItems;
          tagIdIndex = this.filter.type.typeTagIdIndex;
          list = this.list.typeList;
          searchList = this.filter.type.searchType;
          break;
        case "expectedYear":
          activeItems = this.filter.expectedYear.activeExpectedYearItems;
          tagIdIndex = this.filter.expectedYear.expectedYearTagIdIndex;
          list = this.list.expectedYearList;
          searchList = this.filter.expectedYear.searchExpectedYear;
          break;
        case "isGraduation":
          handleTagLogic(
            "isGraduation",
            "isGraduationList",
            "searchIsGraduation",
            "是否毕业"
          );
          return;
        case "studentCount":
          handleTagLogic(
            "studentCount",
            "sortList",
            "searchStudentCount",
            "学生人数"
          );
          return;
        case "maxCount":
          handleTagLogic("maxCount", "sortList", "searchMaxCount", "最大人数");
          return;
        case "year":
          activeItems = this.filter.year.activeYearItems;
          tagIdIndex = this.filter.year.yearTagIdIndex;
          list = this.list.yearList;
          searchList = this.filter.year.searchYear;
          break;
        case "department":
          activeItems = this.filter.department.activeDepartmentItems;
          tagIdIndex = this.filter.department.departmentTagIdIndex;
          list = this.list.departmentList;
          searchList = this.filter.department.searchDepartment;
          break;
        case "majorId":
          handleTagLogic("majorId", "majorIdList", "searchMajorId", "专业编号");
          return;
        case "major":
          handleTagLogic("major", "majorList", "searchMajor", "专业名称");
          return;
        case "campus":
          activeItems = this.filter.campus.activeCampusItems;
          tagIdIndex = this.filter.campus.campusTagIdIndex;
          list = this.list.campusList;
          searchList = this.filter.campus.searchCampus;
          break;
        case "fixedClassroom":
          handleTagLogic(
            "fixedClassroom",
            "fixedClassroomList",
            "searchFixedClassroom",
            "固定教室"
          );
          return;
        // case "isFixed":
        //   handleTagLogic(
        //     "isFixed",
        //     "isFixedList",
        //     "searchIsFixed",
        //     "是否固定教室"
        //   );
        //   return;
        default:
          return;
      }

      if (activeItems[command]) {
        this.$message.warning("你已添加过该标签");
        return;
      }
      activeItems[command] = true;

      const tag = {
        id: command + tagIdIndex,
        value: `${
          type === "academic"
            ? "学制"
            : type === "cultivation"
            ? "培养层次"
            : type === "type"
            ? "班级类型"
            : type === "expectedYear"
            ? "预计毕业年度"
            : type === "year"
            ? "入学年份"
            : type === "department"
            ? "所属部门"
            : type === "campus"
            ? "所属校区"
            : ""
        }：${list[command]}`,
      };
      this.tagsList.push(tag);
      searchList.push(list[command]);

      if (!this.filter.curSearch.includes(type)) {
        this.filter.curSearch.push(type);
      }
    },
    handleIdFilterInput() {
      if (this.tagsList.length >= this.tagsNum) {
        this.$message.warning("添加的筛选数量已达上限，请删除一些再添加");
        return;
      }
      const index = this.filter.curSearch.findIndex((item) => item === "id");
      const tagIndex = this.tagsList.findIndex((item) => item.id === 0);
      if (index != -1 && !this.filter.id.searchId) {
        // 输入框为空时，不筛选
        this.filter.curSearch.splice(index, 1);
        this.tagsList.splice(tagIndex, 1);
        return;
      }
      if (index != -1) {
        // 不再重复添加筛选项，更新标签
        this.tagsList[tagIndex].value = `编号：${this.filter.id.searchId}`;
        return;
      }
      // 添加筛选，添加标签
      this.filter.curSearch.push("id");
      const tag = {
        id: 0,
        value: `编号：${this.filter.id.searchId}`,
      };
      this.tagsList.push(tag);
    },
    handleNameFilterInput() {
      if (this.tagsList.length >= this.tagsNum) {
        this.$message.warning("添加的筛选数量已达上限，请删除一些再添加");
        return;
      }
      const index = this.filter.curSearch.findIndex((item) => item === "name");
      const tagIndex = this.tagsList.findIndex((item) => item.id === 1);
      if (index != -1 && !this.filter.name.searchName) {
        // 输入框为空时，不筛选
        this.filter.curSearch.splice(index, 1);
        this.tagsList.splice(tagIndex, 1);
        return;
      }
      if (index != -1) {
        // 不再重复添加筛选项，更新标签
        this.tagsList[tagIndex].value = `名称：${this.filter.name.searchName}`;
        return;
      }
      // 添加筛选，添加标签
      this.filter.curSearch.push("name");
      const tag = {
        id: 1,
        value: `名称：${this.filter.name.searchName}`,
      };
      this.tagsList.push(tag);
    },
    handleMajorIdFilterInput() {
      if (this.tagsList.length >= this.tagsNum) {
        this.$message.warning("添加的筛选数量已达上限，请删除一些再添加");
        return;
      }
      const index = this.filter.curSearch.findIndex(
        (item) => item === "majorId"
      );
      const tagIndex = this.tagsList.findIndex(
        (item) => item.id === this.filter.majorId.majorIdTagIdIndex
      );
      if (index != -1 && !this.filter.majorId.searchMajorId) {
        // 输入框为空时，不筛选
        this.filter.curSearch.splice(index, 1);
        this.tagsList.splice(tagIndex, 1);
        return;
      }
      if (index != -1) {
        // 不再重复添加筛选项，更新标签
        this.tagsList[
          tagIndex
        ].value = `专业编号：${this.filter.majorId.searchMajorId}`;
        return;
      }
      // 添加筛选，添加标签
      this.filter.curSearch.push("majorId");
      const tag = {
        id: this.filter.majorId.majorIdTagIdIndex,
        value: `专业编号：${this.filter.majorId.searchMajorId}`,
      };
      this.tagsList.push(tag);
    },
    handleMajorFilterInput() {
      if (this.tagsList.length >= this.tagsNum) {
        this.$message.warning("添加的筛选数量已达上限，请删除一些再添加");
        return;
      }
      const index = this.filter.curSearch.findIndex((item) => item === "major");
      const tagIndex = this.tagsList.findIndex(
        (item) => item.id === this.filter.major.majorTagIdIndex
      );
      if (index != -1 && !this.filter.major.searchMajor) {
        // 输入框为空时，不筛选
        this.filter.curSearch.splice(index, 1);
        this.tagsList.splice(tagIndex, 1);
        return;
      }
      if (index != -1) {
        // 不再重复添加筛选项，更新标签
        this.tagsList[
          tagIndex
        ].value = `专业名称：${this.filter.major.searchMajor}`;
        return;
      }
      // 添加筛选，添加标签
      this.filter.curSearch.push("major");
      const tag = {
        id: this.filter.major.majorTagIdIndex,
        value: `专业名称：${this.filter.major.searchMajor}`,
      };
      this.tagsList.push(tag);
    },
    handleFixedClassroomFilterInput() {
      if (this.tagsList.length >= this.tagsNum) {
        this.$message.warning("添加的筛选数量已达上限，请删除一些再添加");
        return;
      }
      const index = this.filter.curSearch.findIndex(
        (item) => item === "fixedClassroom"
      );
      const tagIndex = this.tagsList.findIndex(
        (item) =>
          item.id === this.filter.fixedClassroom.fixedClassroomTagIdIndex
      );
      if (index != -1 && !this.filter.fixedClassroom.searchFixedClassroom) {
        // 输入框为空时，不筛选
        this.filter.curSearch.splice(index, 1);
        this.tagsList.splice(tagIndex, 1);
        return;
      }
      if (index != -1) {
        // 不再重复添加筛选项，更新标签
        this.tagsList[
          tagIndex
        ].value = `固定教室：${this.filter.fixedClassroom.searchFixedClassroom}`;
        return;
      }
      // 添加筛选，添加标签
      this.filter.curSearch.push("fixedClassroom");
      const tag = {
        id: this.filter.fixedClassroom.fixedClassroomTagIdIndex,
        value: `固定教室：${this.filter.fixedClassroom.searchFixedClassroom}`,
      };
      this.tagsList.push(tag);
    },
    filterTableData() {
      let filteredData = this.tableData;
      // 提取字符串筛选逻辑到一个函数
      const filterByString = (data, searchValue, property) => {
        return data.filter((item) =>
          item[property].toLowerCase().includes(searchValue.toLowerCase())
        );
      };
      // 提取数组筛选逻辑到一个函数
      const filterByArray = (data, searchArray, property) => {
        return data.filter((item) =>
          searchArray.some((value) =>
            item[property].toLowerCase().includes(value.toLowerCase())
          )
        );
      };
      // 提取排序逻辑到一个函数
      const sortByValue = (data, searchValue, property) => {
        return [...data].sort((a, b) => {
          const valueA = a[property] || 0;
          const valueB = b[property] || 0;
          return searchValue ? valueA - valueB : valueB - valueA;
        });
      };

      for (let item of this.filter.curSearch) {
        switch (item) {
          case "id":
            filteredData = filterByString(
              filteredData,
              this.filter.id.searchId,
              "ID"
            );
            break;
          case "name":
            filteredData = filterByString(
              filteredData,
              this.filter.name.searchName,
              "Name"
            );
            break;
          case "academic":
            filteredData = filterByArray(
              filteredData,
              this.filter.academic.searchAcademic,
              "Academic"
            );
            break;
          case "cultivation":
            filteredData = filterByArray(
              filteredData,
              this.filter.cultivation.searchCultivation,
              "Cultivation"
            );
            break;
          case "type":
            filteredData = filterByArray(
              filteredData,
              this.filter.type.searchType,
              "Type"
            );
            break;
          case "expectedYear":
            filteredData = filterByArray(
              filteredData,
              this.filter.expectedYear.searchExpectedYear,
              "ExpectedYear"
            );
            break;
          case "isGraduation":
            if (this.filter.isGraduation.searchIsGraduation === undefined)
              break;
            filteredData = [...filteredData].filter(
              (item) =>
                item.IsGraduation ===
                (this.filter.isGraduation.searchIsGraduation
                  ? "已毕业"
                  : "未毕业")
            );
            break;
          case "studentCount":
            if (this.filter.studentCount.searchStudentCount === undefined)
              break;
            filteredData = sortByValue(
              filteredData,
              this.filter.studentCount.searchStudentCount,
              "StudentCount"
            );
            break;
          case "maxCount":
            if (this.filter.maxCount.searchMaxCount === undefined) break;
            filteredData = sortByValue(
              filteredData,
              this.filter.maxCount.searchMaxCount,
              "MaxCount"
            );
            break;
          case "year":
            filteredData = filterByArray(
              filteredData,
              this.filter.year.searchYear,
              "Year"
            );
            break;
          case "department":
            filteredData = filterByArray(
              filteredData,
              this.filter.department.searchDepartment,
              "Department"
            );
            break;
          case "majorId":
            filteredData = filterByString(
              filteredData,
              this.filter.majorId.searchMajorId,
              "MajorID"
            );
            break;
          case "major":
            filteredData = filterByString(
              filteredData,
              this.filter.major.searchMajor,
              "Major"
            );
            break;
          case "campus":
            filteredData = filterByArray(
              filteredData,
              this.filter.campus.searchCampus,
              "Campus"
            );
            break;
          case "fixedClassroom":
            filteredData = filterByString(
              filteredData,
              this.filter.fixedClassroom.searchFixedClassroom,
              "FixedClassroom"
            );
            break;
          // case "isFixed":
          //   if (this.filter.isFixed.searchIsFixed === undefined) break;
          //   filteredData = [...filteredData].filter(
          //     (item) => item.IsFixed === this.filter.isFixed.searchIsFixed
          //   );
          //   break;
          default:
            break;
        }
      }
      this.Pagi.total = filteredData.length;
      return filteredData.slice(
        (this.Pagi.current - 1) * this.Pagi.pageSize,
        this.Pagi.current * this.Pagi.pageSize > this.Pagi.total
          ? this.Pagi.total
          : this.Pagi.current * this.Pagi.pageSize
      );
    },
    handleCloseTag(targetItem) {
      this.tagsList = this.tagsList.filter((item) => item.id !== targetItem.id);
      if (targetItem.id === 0) {
        this.filter.id.searchId = "";
      } else if (targetItem.id === 1) {
        this.filter.name.searchName = "";
      } else if (
        targetItem.id >= this.filter.academic.academicTagIdIndex &&
        targetItem.id < this.filter.cultivation.cultivationTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("academic", item);
      } else if (
        targetItem.id >= this.filter.cultivation.cultivationTagIdIndex &&
        targetItem.id < this.filter.type.typeTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("cultivation", item);
      } else if (
        targetItem.id >= this.filter.type.typeTagIdIndex &&
        targetItem.id < this.filter.expectedYear.expectedYearTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("type", item);
      } else if (
        targetItem.id >= this.filter.expectedYear.expectedYearTagIdIndex &&
        targetItem.id < this.filter.isGraduation.isGraduationTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("expectedYear", item);
      } else if (
        targetItem.id >= this.filter.isGraduation.isGraduationTagIdIndex &&
        targetItem.id < this.filter.studentCount.studentCountTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("isGraduation", item);
      } else if (
        targetItem.id >= this.filter.studentCount.studentCountTagIdIndex &&
        targetItem.id < this.filter.maxCount.maxCountTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("studentCount", item);
      } else if (
        targetItem.id >= this.filter.maxCount.maxCountTagIdIndex &&
        targetItem.id < this.filter.year.yearTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("maxCount", item);
      } else if (
        targetItem.id >= this.filter.year.yearTagIdIndex &&
        targetItem.id < this.filter.department.departmentTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("year", item);
      } else if (
        targetItem.id >= this.filter.department.departmentTagIdIndex &&
        targetItem.id < this.filter.majorId.majorIdTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("department", item);
      } else if (
        targetItem.id >= this.filter.majorId.majorIdTagIdIndex &&
        targetItem.id < this.filter.major.majorTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("majorId", item);
      } else if (
        targetItem.id >= this.filter.major.majorTagIdIndex &&
        targetItem.id < this.filter.campus.campusTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("major", item);
      } else if (
        targetItem.id >= this.filter.campus.campusTagIdIndex &&
        targetItem.id < this.filter.fixedClassroom.fixedClassroomTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("campus", item);
      } else if (
        targetItem.id >= this.filter.fixedClassroom.fixedClassroomTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("fixedClassroom", item);
      }
    },
    handleDeleteMulSelectFilter(cate, item) {
      let itemIndex,
        cateIndex,
        activeIndex,
        isNull,
        searchItems,
        activeItems,
        Items;

      switch (cate) {
        case "academic":
          searchItems = this.filter.academic.searchAcademic;
          activeItems = this.filter.academic.activeAcademicItems;
          Items = this.list.academicList;
          break;
        case "cultivation":
          searchItems = this.filter.cultivation.searchCultivation;
          activeItems = this.filter.cultivation.activeCultivationItems;
          Items = this.list.cultivationList;
          break;
        case "type":
          searchItems = this.filter.type.searchType;
          activeItems = this.filter.type.activeTypeItems;
          Items = this.list.typeList;
          break;
        case "expectedYear":
          searchItems = this.filter.expectedYear.searchExpectedYear;
          activeItems = this.filter.expectedYear.activeExpectedYearItems;
          Items = this.list.expectedYearList;
          break;
        case "isGraduation":
          this.filter.isGraduation.searchIsGraduation = undefined;
          isNull = true;
          break;
        case "studentCount":
          this.filter.studentCount.searchStudentCount = undefined;
          isNull = true;
          break;
        case "maxCount":
          this.filter.maxCount.searchMaxCount = undefined;
          isNull = true;
          break;
        case "year":
          searchItems = this.filter.year.searchYear;
          activeItems = this.filter.year.activeYearItems;
          Items = this.list.yearList;
          break;
        case "department":
          searchItems = this.filter.department.searchDepartment;
          activeItems = this.filter.department.activeDepartmentItems;
          Items = this.list.departmentList;
          break;
        case "majorId":
          this.filter.majorId.searchMajorId = undefined;
          isNull = true;
          break;
        case "major":
          this.filter.major.searchMajor = undefined;
          isNull = true;
          break;
        case "campus":
          searchItems = this.filter.campus.searchCampus;
          activeItems = this.filter.campus.activeCampusItems;
          Items = this.list.campusList;
          break;
        case "fixedClassroom":
          this.filter.fixedClassroom.searchFixedClassroom = undefined;
          isNull = true;
          break;
        // case "isFixed":
        //   this.filter.isFixed.searchIsFixed = undefined;
        //   isNull = true;
        //   break;
        default:
          break;
      }

      // 另作处理
      if (
        cate !== "isGraduation" &&
        cate !== "studentCount" &&
        cate !== "maxCount" &&
        cate !== "majorId" &&
        cate !== "major" &&
        cate !== "fixedClassroom"
      ) {
        // 从筛选数组中去除
        itemIndex = searchItems.findIndex((i) => i == item);
        if (itemIndex === -1) {
          console.log("获取itemIndex出错，item:", item);
          return;
        }
        searchItems.splice(itemIndex, 1);

        // 从active...数组中去除
        activeIndex = Items.findIndex((i) => i == item);
        if (activeIndex === -1) {
          console.log("获取activeIndex出错，item:", item);
          return;
        }
        activeItems[activeIndex] = false;
        isNull = searchItems.length === 0 ? true : false;
      }

      // 如果该类别没有可供筛选的item，不进行筛选
      if (isNull) {
        cateIndex = this.filter.curSearch.findIndex((i) => i == cate);
        if (cateIndex === -1) {
          console.log("获取cateIndex出错，cate:", cate);
          return;
        }
        this.filter.curSearch.splice(cateIndex, 1);
      }
    },
    checkTagWidths() {
      if (this.$refs.tagRefs) {
        const tagRefs = Array.isArray(this.$refs.tagRefs)
          ? this.$refs.tagRefs
          : [this.$refs.tagRefs];
        tagRefs.forEach((tag, index) => {
          const rect = tag.$el.getBoundingClientRect();
          if (rect.width > this.maxTagWidth) {
            this.$message.error("添加的筛选标签过长，请重新输入", 3);
            this.handleCloseTag(this.tagsList[index]);
            // TODO：input输入过快时会失效
          }
        });
      }
    },
    handleClearTags() {
      this.tagsList.forEach((tag) => {
        this.handleCloseTag(tag);
      });
      if (this.tagsList.length === 0) {
        this.$message.success("清空标签成功");
      } else {
        this.$message.error("清空标签失败");
      }
    },
  },
};
</script>

<style scoped>
.content {
  padding: 4px;
}

.excel-upload-section {
  margin-top: -30px;
  height: 250px;
  position: relative;
}

.upload-child {
  margin-top: -20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.upload-button {
  bottom: 10px;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.manage-section {
  width: 100%;
  height: 720px;
  display: flex;
  flex-direction: column;
}

.pagi-section {
  margin-top: -6px;
}

.insert-section {
  padding: 0 100px;
  height: 720px;
}

.table-tag {
  display: flex;
  flex: 1;
}

.table-section {
  width: 85%;
  padding-right: 10px;
}

.tags {
  width: 214px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-height: 630px;
}

.tags-reset {
  display: flex;
  justify-content: center;
  width: 214px;
}

/* ::v-deep .el-dropdown-menu__item.active-item {
  background-color: #409eff !important;
  color: white;
} */

::v-deep.el-table td,
::v-deep.el-table th {
  padding: 10px;
}

.header-font {
  font-size: 16px;
}
</style>