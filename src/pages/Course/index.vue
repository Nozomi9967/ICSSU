<template>
  <div class="content">
    <el-tabs type="border-card" v-model="activeTabIndex">
      <el-tab-pane label="管理" name="1">
        <!-- 管理 -->
        <div class="manage-section">
          <div class="table-tag">
            <div class="table-section">
              <el-table :data="filterTableData()" border style="height: 701px">
                <el-table-column fixed prop="course_id" width="160">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>课程编号</span>
                      <el-popover
                        placement="bottom"
                        property="请输入课程编号"
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
                <el-table-column prop="course_name" width="280">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>课程名称</span>
                      <el-popover
                        placement="bottom"
                        property="请输入课程名称"
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
                <el-table-column prop="course_type" width="180">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="(command) => handleCommand(command, 'type')"
                      >
                        <span class="el-dropdown-link">
                          课程类型<i
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
                <el-table-column prop="course_property" width="140">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'property')
                        "
                      >
                        <span class="el-dropdown-link">
                          课程属性<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.propertyList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="course_department" width="200">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'department')
                        "
                      >
                        <span class="el-dropdown-link">
                          开课院系<i
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
                <el-table-column prop="purePractice" width="140">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'purePractice')
                        "
                      >
                        <span class="el-dropdown-link">
                          是否纯实践<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="0"
                            :disabled="
                              !filter.purePractice.purePracticeExists[0]
                            "
                            >是</el-dropdown-item
                          >
                          <el-dropdown-item
                            :command="1"
                            :disabled="
                              !filter.purePractice.purePracticeExists[1]
                            "
                            >否</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <span>{{ scope.row.pure_practice ? "是" : "否" }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="course_credit" width="100">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="(command) => handleCommand(command, 'credit')"
                      >
                        <span class="el-dropdown-link">
                          学分<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="0">升序</el-dropdown-item>
                          <el-dropdown-item :command="1">降序</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <span>{{ scope.row.course_credit }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="totalHours" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'totalHours')
                        "
                      >
                        <span class="el-dropdown-link">
                          总学时<i
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
                  <template slot-scope="scope">
                    <span>{{ scope.row.total_hours }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="theoryHours" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'theoryHours')
                        "
                      >
                        <span class="el-dropdown-link">
                          理论学时<i
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
                  <template slot-scope="scope">
                    <span>{{ scope.row.theory_hours }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="testHours" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'testHours')
                        "
                      >
                        <span class="el-dropdown-link">
                          测试学时<i
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
                  <template slot-scope="scope">
                    <span>{{ scope.row.test_hours }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="computerHours" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'computerHours')
                        "
                      >
                        <span class="el-dropdown-link">
                          上机学时<i
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
                  <template slot-scope="scope">
                    <span>{{ scope.row.computer_hours }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="practiceHours" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'practiceHours')
                        "
                      >
                        <span class="el-dropdown-link">
                          实践学时<i
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
                  <template slot-scope="scope">
                    <span>{{ scope.row.practice_hours }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="otherHours" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'otherHours')
                        "
                      >
                        <span class="el-dropdown-link">
                          其他学时<i
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
                  <template slot-scope="scope">
                    <span>{{ scope.row.other_hours }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="weeklyHours" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'weeklyHours')
                        "
                      >
                        <span class="el-dropdown-link">
                          周学时<i
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
                  <template slot-scope="scope">
                    <span>{{ scope.row.weekly_hours }}</span>
                  </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <div class="buttons">
                      <el-button
                        @click="handleDeleteCourse(scope.row)"
                        type="text"
                        size="small"
                        >删除</el-button
                      >
                      <el-button
                        @click="handleModifyCourse(scope.row)"
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
            property="课程详细"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
          >
            <template v-if="dialogVisible">
              <CourseForm
                :CourseInfo="courseInfo"
                @submit="handleManageSubmit"
              ></CourseForm>
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
          <CourseForm
            :courseInfo="courseInsertInfo"
            ref="courseInsertFormRef"
            @submit="handleInsertSubmit"
          ></CourseForm>
          <!-- excel输入 -->
          <div class="excel-upload-section">
            <el-upload
              class="upload-child"
              :auto-upload="false"
              drag
              :action="getCourseFileUploadUrl"
              :before-upload="handleBeforeUpload"
              ref="courseUploadRef"
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
              @click="handleCourseUpload"
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
import { SERVER_URL, COURSE_PREFIX, TAGS_NUM } from "@config";
import axios from "axios";
import CourseForm from "@/components/CourseForm";
export default {
  name: "Course",
  components: {
    CourseForm,
  },
  mounted() {
    this.handleGetCourses();
  },
  data() {
    return {
      activeTabIndex: "1", // 控制tab-pane
      tableData: [], // 总数据
      serverUrl: SERVER_URL,
      coursePrefix: COURSE_PREFIX,
      tagsNum: TAGS_NUM,
      dialogVisible: false, // 编辑的dialog
      courseInfo: {}, // 管理用
      courseInsertInfo: {}, // 新增用
      tagType: ["", "success", "info", "warning", "danger"],
      tagsList: [],
      maxTagWidth: 210, // 单个tag的最大宽度，单位为px，可根据需求调整
      startOffset: 2,
      list: {
        typeList: [],
        departmentList: [],
        propertyList: [],
        purePracticeList: ["是", "否"],
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
        type: {
          searchType: [],
          activeTypeItems: [],
          typeTagIdIndex: undefined,
        },
        department: {
          searchDepartment: [],
          activeDepartmentItems: [],
          departmentTagIdIndex: undefined,
        },
        property: {
          searchProperty: [],
          activePropertyItems: [],
          propertyTagIdIndex: undefined,
        },
        purePractice: {
          searchPurePractice: undefined,
          purePracticeExists: [false, false],
          purePracticeTagIdIndex: undefined,
        },
        credit: {
          searchCredit: undefined,
          creditTagIdIndex: undefined,
        },
        totalHours: {
          searchTotalHours: undefined,
          totalHoursTagIdIndex: undefined,
        },
        theoryHours: {
          searchTheoryHours: undefined,
          theoryHoursTagIdIndex: undefined,
        },
        testHours: {
          searchTestHours: undefined,
          testHoursTagIdIndex: undefined,
        },
        computerHours: {
          searchComputerHours: undefined,
          computerHoursTagIdIndex: undefined,
        },
        practiceHours: {
          searchPracticeHours: undefined,
          practiceHoursTagIdIndex: undefined,
        },
        otherHours: {
          searchOtherHours: undefined,
          otherHoursTagIdIndex: undefined,
        },
        weeklyHours: {
          searchWeeklyHours: undefined,
          weeklyHoursTagIdIndex: undefined,
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
    getCourseFileUploadUrl() {
      return `${this.serverUrl}${this.coursePrefix}/create/file`;
    },
    getCourseInsertUrl() {
      return `${this.serverUrl}${this.coursePrefix}/create`;
    },
    getAllCoursesUrl() {
      return `${this.serverUrl}${this.coursePrefix}/queryall`;
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
    handleCourseUpload() {
      const uploadFiles = this.$refs.courseUploadRef.uploadFiles;
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
        formData.append("course_file", file.raw);
      });
      axios
        .post(this.getCourseFileUploadUrl, formData, {
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
            this.$refs.courseUploadRef.clearFiles();
            this.handleGetCourses();
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
      axios
        .post(this.getCourseInsertUrl, info)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.$message.success("新增成功");
            this.handleInsertReset();
            this.handleGetCourses(); // 刷新
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
      this.$refs.courseInsertFormRef.handleReset();
    },
    // 管理
    handleProcessTableData() {
      this.Pagi.total = this.tableData.length;

      // Type
      const typeSet = new Set();
      this.tableData.forEach((item) => {
        if (item.course_type) {
          typeSet.add(item.course_type);
        }
      });
      this.list.typeList = Array.from(typeSet);
      this.filter.type.activeTypeItems = Array(this.list.typeList.length).fill(
        false
      );
      this.filter.type.typeTagIdIndex = this.startOffset;

      // Property
      const propertySet = new Set();
      this.tableData.forEach((item) => {
        if (item.course_property) {
          propertySet.add(item.course_property);
        }
      });
      this.list.propertyList = Array.from(propertySet);
      this.filter.property.activePropertyItems = Array(
        this.list.propertyList.length
      ).fill(false);
      this.filter.property.propertyTagIdIndex =
        this.filter.type.typeTagIdIndex + this.list.typeList.length;

      // Department
      const departmentSet = new Set();
      this.tableData.forEach((item) => {
        if (item.course_department) {
          departmentSet.add(item.course_department);
        }
      });
      this.list.departmentList = Array.from(departmentSet);
      this.filter.department.activeDepartmentItems = Array(
        this.list.departmentList.length
      ).fill(false);
      this.filter.department.departmentTagIdIndex =
        this.filter.property.propertyTagIdIndex + this.list.propertyList.length;

      // PurePractice
      this.filter.purePractice.purePracticeExists = [false, false];
      this.tableData.forEach((item) => {
        if (item.purePractice) {
          this.filter.purePractice.purePracticeExists[0] = true;
        } else {
          this.filter.purePractice.purePracticeExists[1] = true;
        }
      });
      this.filter.purePractice.purePracticeTagIdIndex =
        this.filter.department.departmentTagIdIndex +
        this.list.departmentList.length;

      // Credit
      this.filter.credit.creditTagIdIndex =
        this.filter.purePractice.purePracticeTagIdIndex +
        this.list.sortList.length;

      // TotalHours
      this.filter.totalHours.totalHoursTagIdIndex =
        this.filter.credit.creditTagIdIndex + this.list.sortList.length;

      // TheoryHours
      this.filter.theoryHours.theoryHoursTagIdIndex =
        this.filter.totalHours.totalHoursTagIdIndex + this.list.sortList.length;

      // TestHours
      this.filter.testHours.testHoursTagIdIndex =
        this.filter.theoryHours.theoryHoursTagIdIndex +
        this.list.sortList.length;

      // ComputerHours
      this.filter.computerHours.computerHoursTagIdIndex =
        this.filter.testHours.testHoursTagIdIndex + this.list.sortList.length;

      // PracticeHours
      this.filter.practiceHours.practiceHoursTagIdIndex =
        this.filter.computerHours.computerHoursTagIdIndex +
        this.list.sortList.length;

      // OtherHours
      this.filter.otherHours.otherHoursTagIdIndex =
        this.filter.practiceHours.practiceHoursTagIdIndex +
        this.list.sortList.length;

      // WeeklyHours
      this.filter.weeklyHours.weeklyHoursTagIdIndex =
        this.filter.otherHours.otherHoursTagIdIndex + this.list.sortList.length;
    },
    handleGetCourses() {
      axios
        .get(this.getAllCoursesUrl)
        .then((res) => {
          // 请求成功
          if (res.status === 200) {
            this.tableData = res.data.data.courses;
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
    handleDeleteCourse(row) {
      const courseId = row.course_id;
      axios
        .delete(`${this.serverUrl}${this.coursePrefix}/delete/${courseId}`)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.handleGetCourses();
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
    handleModifyCourse(row) {
      this.courseInfo = {
        ...row,
      };
      this.dialogVisible = true;
    },
    handleManageReset() {
      this.courseInfo = {};
    },
    handleManageSubmit(newCourseInfo) {
      axios
        .put(`${this.serverUrl}${this.coursePrefix}/update`, newCourseInfo)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.handleGetCourses();
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
        case "type":
          activeItems = this.filter.type.activeTypeItems;
          tagIdIndex = 2;
          list = this.list.typeList;
          searchList = this.filter.type.searchType;
          break;
        case "property":
          activeItems = this.filter.property.activePropertyItems;
          tagIdIndex = this.filter.property.propertyTagIdIndex;
          list = this.list.propertyList;
          searchList = this.filter.property.searchProperty;
          break;
        case "department":
          activeItems = this.filter.department.activeDepartmentItems;
          tagIdIndex = this.filter.department.departmentTagIdIndex;
          list = this.list.departmentList;
          searchList = this.filter.department.searchDepartment;
          break;
        case "purePractice":
          handleTagLogic(
            "purePractice",
            "purePracticeList",
            "searchPurePractice",
            "是否纯实践"
          );
          return;
        case "credit":
          handleTagLogic("credit", "sortList", "searchCredit", "学分");
          return;
        case "totalHours":
          handleTagLogic(
            "totalHours",
            "sortList",
            "searchTotalHours",
            "总学时"
          );
          return;
        case "theoryHours":
          handleTagLogic(
            "theoryHours",
            "sortList",
            "searchTheoryHours",
            "理论学时"
          );
          return;
        case "testHours":
          handleTagLogic(
            "testHours",
            "sortList",
            "searchTestHours",
            "测试学时"
          );
          return;
        case "computerHours":
          handleTagLogic(
            "computerHours",
            "sortList",
            "searchComputerHours",
            "上机学时"
          );
          return;
        case "practiceHours":
          handleTagLogic(
            "practiceHours",
            "sortList",
            "searchPracticeHours",
            "实践学时"
          );
          return;
        case "otherHours":
          handleTagLogic(
            "otherHours",
            "sortList",
            "searchOtherHours",
            "其他学时"
          );
          return;
        case "weeklyHours":
          handleTagLogic(
            "weeklyHours",
            "sortList",
            "searchWeeklyHours",
            "周学时"
          );
          return;
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
          type === "type"
            ? "课程类型"
            : type === "property"
            ? "课程属性"
            : type === "department"
            ? "开课院系"
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
              "course_id"
            );
            break;
          case "name":
            filteredData = filterByString(
              filteredData,
              this.filter.name.searchName,
              "course_name"
            );
            break;
          case "type":
            filteredData = filterByArray(
              filteredData,
              this.filter.type.searchType,
              "course_type"
            );
            break;
          case "property":
            filteredData = filterByArray(
              filteredData,
              this.filter.property.searchProperty,
              "course_property"
            );
            break;
          case "purePractice":
            if (this.filter.purePractice.searchPurePractice === undefined)
              break;
            filteredData = [...filteredData].filter(
              (item) =>
                item.pure_practice ===
                this.filter.purePractice.searchPurePractice
            );
            break;
          case "department":
            filteredData = filterByArray(
              filteredData,
              this.filter.department.searchDepartment,
              "course_department"
            );
            break;
          case "credit":
            if (this.filter.credit.searchCredit === undefined) break;
            filteredData = sortByValue(
              filteredData,
              this.filter.credit.searchCredit,
              "course_credit"
            );
            break;
          case "totalHours":
            if (this.filter.totalHours.searchTotalHours === undefined) break;
            filteredData = sortByValue(
              filteredData,
              this.filter.totalHours.searchTotalHours,
              "total_hours"
            );
            break;
          case "theoryHours":
            if (this.filter.theoryHours.searchTheoryHours === undefined) break;
            filteredData = sortByValue(
              filteredData,
              this.filter.theoryHours.searchTheoryHours,
              "theory_hours"
            );
            break;
          case "testHours":
            if (this.filter.testHours.searchTestHours === undefined) break;
            filteredData = sortByValue(
              filteredData,
              this.filter.testHours.searchTestHours,
              "test_hours"
            );
            break;
          case "computerHours":
            if (this.filter.computerHours.searchComputerHours === undefined)
              break;
            filteredData = sortByValue(
              filteredData,
              this.filter.computerHours.searchComputerHours,
              "computer_hours"
            );
            break;
          case "practiceHours":
            if (this.filter.practiceHours.searchPracticeHours === undefined)
              break;
            filteredData = sortByValue(
              filteredData,
              this.filter.practiceHours.searchPracticeHours,
              "practice_hours"
            );
            break;
          case "otherHours":
            if (this.filter.otherHours.searchOtherHours === undefined) break;
            filteredData = sortByValue(
              filteredData,
              this.filter.otherHours.searchOtherHours,
              "other_hours"
            );
            break;
          case "weeklyHours":
            if (this.filter.weeklyHours.searchWeeklyHours === undefined) break;
            filteredData = sortByValue(
              filteredData,
              this.filter.weeklyHours.searchWeeklyHours,
              "weekly_hours"
            );
            break;
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
        targetItem.id >= this.filter.type.typeTagIdIndex &&
        targetItem.id < this.filter.property.propertyTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("type", item);
      } else if (
        targetItem.id >= this.filter.property.propertyTagIdIndex &&
        targetItem.id < this.filter.department.departmentTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("property", item);
      } else if (
        targetItem.id >= this.filter.department.departmentTagIdIndex &&
        targetItem.id < this.filter.purePractice.purePracticeTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("department", item);
      } else if (
        targetItem.id >= this.filter.purePractice.purePracticeTagIdIndex &&
        targetItem.id < this.filter.credit.creditTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("purePractice", item);
      } else if (
        targetItem.id >= this.filter.credit.creditTagIdIndex &&
        targetItem.id < this.filter.totalHours.totalHoursTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("credit", item);
      } else if (
        targetItem.id >= this.filter.totalHours.totalHoursTagIdIndex &&
        targetItem.id < this.filter.theoryHours.theoryHoursTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("totalHours", item);
      } else if (
        targetItem.id >= this.filter.theoryHours.theoryHoursTagIdIndex &&
        targetItem.id < this.filter.testHours.testHoursTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("theoryHours", item);
      } else if (
        targetItem.id >= this.filter.testHours.testHoursTagIdIndex &&
        targetItem.id < this.filter.computerHours.computerHoursTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("testHours", item);
      } else if (
        targetItem.id >= this.filter.computerHours.computerHoursTagIdIndex &&
        targetItem.id < this.filter.practiceHours.practiceHoursTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("computerHours", item);
      } else if (
        targetItem.id >= this.filter.practiceHours.practiceHoursTagIdIndex &&
        targetItem.id < this.filter.otherHours.otherHoursTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("practiceHours", item);
      } else if (
        targetItem.id >= this.filter.otherHours.otherHoursTagIdIndex &&
        targetItem.id < this.filter.weeklyHours.weeklyHoursTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("otherHours", item);
      } else if (
        targetItem.id >= this.filter.weeklyHours.weeklyHoursTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("weeklyHours", item);
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
        case "type":
          searchItems = this.filter.type.searchType;
          activeItems = this.filter.type.activeTypeItems;
          Items = this.list.typeList;
          break;
        case "property":
          searchItems = this.filter.property.searchProperty;
          activeItems = this.filter.property.activePropertyItems;
          Items = this.list.propertyList;
          break;
        case "purePractice":
          this.filter.purePractice.searchPurePractice = undefined;
          isNull = true;
          break;
        case "department":
          searchItems = this.filter.department.searchDepartment;
          activeItems = this.filter.department.activeDepartmentItems;
          Items = this.list.departmentList;
          break;
        case "credit":
          this.filter.credit.searchCredit = undefined;
          isNull = true;
          break;
        case "totalHours":
          this.filter.totalHours.searchTotalHours = undefined;
          isNull = true;
          break;
        case "theoryHours":
          this.filter.theoryHours.searchTheoryHours = undefined;
          isNull = true;
          break;
        case "testHours":
          this.filter.testHours.searchTestHours = undefined;
          isNull = true;
          break;
        case "computerHours":
          this.filter.computerHours.searchComputerHours = undefined;
          isNull = true;
          break;
        case "practiceHours":
          this.filter.practiceHours.searchPracticeHours = undefined;
          isNull = true;
          break;
        case "otherHours":
          this.filter.otherHours.searchOtherHours = undefined;
          isNull = true;
          break;
        case "weeklyHours":
          this.filter.weeklyHours.searchWeeklyHours = undefined;
          isNull = true;
          break;
        // 其他 case 语句...
        default:
          break;
      }

      // 另作处理
      if (
        cate !== "purePractice" &&
        cate !== "credit" &&
        cate !== "totalHours" &&
        cate !== "theoryHours" &&
        cate !== "testHours" &&
        cate !== "computerHours" &&
        cate !== "practiceHours" &&
        cate !== "otherHours" &&
        cate !== "weeklyHours"
      ) {
        // 从筛选数组中去除
        itemIndex = searchItems.findIndex((i) => i == item);
        if (itemIndex == -1) {
          console.log("获取itemIndex出错，item:", item);
          return;
        }
        searchItems.splice(itemIndex, 1);

        // 从active...数组中去除
        activeIndex = Items.findIndex((i) => i == item);
        if (activeIndex == -1) {
          console.log("获取activeIndex出错，item:", item);
          return;
        }
        activeItems[activeIndex] = false;
        isNull = searchItems.length == 0 ? true : false;
      }

      // 如果该类别没有可供筛选的item，不进行筛选
      if (isNull) {
        cateIndex = this.filter.curSearch.findIndex((i) => i == cate);
        if (cateIndex == -1) {
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
  height: 300px;
  position: relative;
}

.upload-child {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.upload-button {
  bottom: 0px;
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