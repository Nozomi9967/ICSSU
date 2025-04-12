<template>
  <div class="content">
    <el-tabs type="border-card" v-model="activeTabIndex">
      <el-tab-pane label="管理" name="1">
        <!-- 管理 -->
        <div class="manage-section">
          <div class="table-tag">
            <div class="table-section">
              <el-table :data="filterTableData()" border style="height: 701px">
                <el-table-column fixed prop="ID" width="160">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>教师编号</span>
                      <el-popover
                        placement="bottom"
                        title="请输入教师编号"
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
                <el-table-column prop="Name" width="200">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>教师名称</span>
                      <el-popover
                        placement="bottom"
                        title="请输入教师名称"
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
                <el-table-column prop="EnglishName" width="160">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>教师英文名</span>
                      <el-popover
                        placement="bottom"
                        title="请输入教师英文名"
                        width="200"
                        trigger="click"
                      >
                        <!-- Popover 内容 -->
                        <div>
                          <el-input
                            v-model="filter.englishName.searchEnglishName"
                            placeholder="输入名称过滤"
                            @input="handleEnglishNameFilterInput"
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
                <el-table-column prop="Gender" label="性别" width="100">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="(command) => handleCommand(command, 'gender')"
                      >
                        <span class="el-dropdown-link">
                          性别<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="0"
                            :disabled="!filter.gender.genderExists[0]"
                            >男性</el-dropdown-item
                          >
                          <el-dropdown-item
                            :command="1"
                            :disabled="!filter.gender.genderExists[1]"
                            >女性</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <span>{{ scope.row.Gender }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Ethnicity" width="100">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'ethnicity')
                        "
                      >
                        <span class="el-dropdown-link">
                          民族<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.ethnicityList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Department" width="200">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'department')
                        "
                      >
                        <span class="el-dropdown-link">
                          单位<i class="el-icon-arrow-down el-icon--right"></i>
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
                <el-table-column prop="Title" width="140">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="(command) => handleCommand(command, 'title')"
                      >
                        <span class="el-dropdown-link">
                          职称<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.titleList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Category" width="160">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'category')
                        "
                      >
                        <span class="el-dropdown-link">
                          教职工类别<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.categoryList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="IsExternal" width="140">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'is_external')
                        "
                      >
                        <span class="el-dropdown-link">
                          是否外聘<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="0"
                            :disabled="!filter.isExternal.isExternalExists[0]"
                            >是</el-dropdown-item
                          >
                          <el-dropdown-item
                            :command="1"
                            :disabled="!filter.isExternal.isExternalExists[1]"
                            >否</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <span>{{ scope.row.IsExternal ? "是" : "否" }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Status" label="状态" width="100">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="(command) => handleCommand(command, 'status')"
                      >
                        <span class="el-dropdown-link">
                          状态<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="0"
                            :disabled="!filter.status.statusExists[0]"
                            >启用</el-dropdown-item
                          >
                          <el-dropdown-item
                            :command="1"
                            :disabled="!filter.status.statusExists[1]"
                            >不启用</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <div class="buttons">
                      <el-button
                        @click="handleDeleteTeacher(scope.row)"
                        type="text"
                        size="small"
                        >删除</el-button
                      >
                      <el-button
                        @click="handleModifyTeacher(scope.row)"
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
            title="教师详细"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
          >
            <template v-if="dialogVisible">
              <TeacherForm
                ref="teacherFormRef"
                :TeacherInfo="teacherInfo"
                @submit="handleManageSubmit"
              ></TeacherForm>
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
          <TeacherForm
            :teacherInfo="teacherInsertInfo"
            ref="teacherInsertFormRef"
            @submit="handleInsertSubmit"
          ></TeacherForm>
          <!-- excel输入 -->
          <div class="excel-upload-section">
            <el-upload
              class="upload-child"
              :auto-upload="false"
              drag
              :action="getTeacherFileUploadUrl"
              :before-upload="handleBeforeUpload"
              ref="teacherUploadRef"
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
              @click="handleTeacherUpload"
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
import { SERVER_URL, TEACHER_PREFIX, TAGS_NUM } from "@config";
import axios from "axios";
import TeacherForm from "@/components/TeacherForm";
export default {
  name: "Teacher",
  components: {
    TeacherForm,
  },
  mounted() {
    this.handleGetTeachers();
  },
  data() {
    return {
      activeTabIndex: "1", // 控制tab-pane
      tableData: [], // 总数据
      serverUrl: SERVER_URL,
      teacherPrefix: TEACHER_PREFIX,
      tagsNum: TAGS_NUM,
      dialogVisible: false, // 编辑的dialog
      teacherInfo: {}, // 管理用
      teacherInsertInfo: {}, // 新增用
      tagType: ["", "success", "info", "warning", "danger"],
      tagsList: [],
      maxTagWidth: 210, // 单个tag的最大宽度，单位为px，可根据需求调整
      startOffset: 3,
      list: {
        ethnicityList: [],
        departmentList: [],
        titleList: [],
        categoryList: [],
        genderList: ["男性", "女性"],
        isExternalList: ["是", "否"],
        statusList: ["启用", "不启用"],
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
        englishName: {
          searchEnglishName: "",
        },
        gender: {
          searchGender: undefined,
          genderExists: [false, false],
          genderTagIdIndex: undefined,
        },
        ethnicity: {
          searchEthnicity: [],
          activeEthnicityItems: [],
          ethnicityTagIdIndex: undefined,
        },
        department: {
          searchDepartment: [],
          activeDepartmentItems: [],
          departmentTagIdIndex: undefined,
        },
        title: {
          searchTitle: [],
          activeTitleItems: [],
          titleTagIdIndex: undefined,
        },
        category: {
          searchCategory: [],
          activeCategoryItems: [],
          categoryTagIdIndex: undefined,
        },
        isExternal: {
          searchIsExternal: undefined,
          isExternalExists: [false, false],
          isExternalTagIdIndex: undefined,
        },
        status: {
          searchStatus: undefined,
          statusExists: [false, false],
          statusTagIdIndex: undefined,
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
    getTeacherFileUploadUrl() {
      return `${this.serverUrl}${this.teacherPrefix}/create/file`;
    },
    getTeacherInsertUrl() {
      return `${this.serverUrl}${this.teacherPrefix}/create`;
    },
    getAllTeachersUrl() {
      return `${this.serverUrl}${this.teacherPrefix}/queryall`;
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
    handleTeacherUpload() {
      const uploadFiles = this.$refs.teacherUploadRef.uploadFiles;
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
        formData.append("teacher_file", file.raw);
      });
      axios
        .post(this.getTeacherFileUploadUrl, formData, {
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
            this.$refs.teacherUploadRef.clearFiles();
            this.handleGetTeachers();
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
        .post(this.getTeacherInsertUrl, info)
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.$message.success("新增成功");
            this.handleInsertReset();
            this.handleGetTeachers(); // 刷新
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
      this.$refs.teacherInsertFormRef.handleReset();
    },
    // 管理
    handleProcessTableData() {
      this.Pagi.total = this.tableData.length;

      // 性别
      this.filter.gender.genderExists = [false, false];
      this.tableData.forEach((item) => {
        if (item.Gender === "男性") {
          this.filter.gender.genderExists[0] = true;
        } else if (item.Gender === "女性") {
          this.filter.gender.genderExists[1] = true;
        }
      });
      this.filter.gender.genderTagIdIndex = this.startOffset;

      // Ethnicity
      const ethnicitySet = new Set();
      this.tableData.forEach((item) => {
        if (item.Ethnicity) {
          ethnicitySet.add(item.Ethnicity);
        }
      });
      this.list.ethnicityList = Array.from(ethnicitySet);
      this.filter.ethnicity.activeEthnicityItems = Array(
        this.list.ethnicityList.length
      ).fill(false);
      this.filter.ethnicity.ethnicityTagIdIndex =
        this.filter.gender.genderTagIdIndex + this.list.genderList.length;

      // 提取所有 Department 的种类
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
        this.filter.ethnicity.ethnicityTagIdIndex +
        this.list.ethnicityList.length;

      // 提取所有 Title 的种类
      const titleSet = new Set();
      this.tableData.forEach((item) => {
        if (item.Title) {
          titleSet.add(item.Title);
        }
      });
      this.list.titleList = Array.from(titleSet);
      this.filter.title.activeTitleItems = Array(
        this.list.titleList.length
      ).fill(false);
      this.filter.title.titleTagIdIndex =
        this.filter.department.departmentTagIdIndex +
        this.list.departmentList.length;

      // 提取所有 Category 的种类
      const categorySet = new Set();
      this.tableData.forEach((item) => {
        if (item.Category) {
          categorySet.add(item.Category);
        }
      });
      this.list.categoryList = Array.from(categorySet);
      this.filter.category.activeCategoryItems = Array(
        this.list.categoryList.length
      ).fill(false);
      this.filter.category.categoryTagIdIndex =
        this.filter.title.titleTagIdIndex + this.list.titleList.length;

      // 检查是否外聘的数据
      this.filter.isExternal.isExternalExists = [false, false];
      this.tableData.forEach((item) => {
        if (item.IsExternal) {
          this.filter.isExternal.isExternalExists[0] = true;
        } else {
          this.filter.isExternal.isExternalExists[1] = true;
        }
      });
      this.filter.isExternal.isExternalTagIdIndex =
        this.filter.category.categoryTagIdIndex + this.list.categoryList.length;

      // 检查状态的数据
      this.filter.status.statusExists = [false, false];
      this.tableData.forEach((item) => {
        if (item.Status === "启用") {
          this.filter.status.statusExists[0] = true;
        } else if (item.Status === "不启用") {
          this.filter.status.statusExists[1] = true;
        }
      });
      this.activeStatusItems = Array(this.list.statusList.length).fill(false);
      this.filter.status.statusTagIdIndex =
        this.filter.isExternal.isExternalTagIdIndex +
        this.filter.isExternal.isExternalExists.length;
    },
    handleGetTeachers() {
      axios
        .get(this.getAllTeachersUrl)
        .then((res) => {
          // 请求成功
          if (res.data.status === 200) {
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
    handleDeleteTeacher(row) {
      const teacherId = row.ID;
      axios
        .delete(`${this.serverUrl}${this.teacherPrefix}/delete/${teacherId}`)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.handleGetTeachers();
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
    handleModifyTeacher(row) {
      this.teacherInfo = {
        id: row.ID,
        name: row.Name,
        english_name: row.EnglishName,
        gender: row.Gender,
        ethnicity: row.Ethnicity,
        department: row.Department,
        title: row.Title,
        category: row.Category,
        is_external: row.IsExternal,
        status: row.Status,
      };
      this.dialogVisible = true;
    },
    handleManageReset() {
      this.teacherInfo = {};
    },
    handleManageSubmit(newTeacherInfo) {
      axios
        .put(
          `${this.serverUrl}${this.teacherPrefix}/update/${newTeacherInfo.id}`,
          newTeacherInfo
        )
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.handleGetTeachers();
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

      let activeItems, tagIdIndex, list, searchList;
      switch (type) {
        case "ethnicity":
          activeItems = this.filter.ethnicity.activeEthnicityItems;
          tagIdIndex = 2;
          list = this.list.ethnicityList;
          searchList = this.filter.ethnicity.searchEthnicity;
          break;
        case "title":
          activeItems = this.filter.title.activeTitleItems;
          tagIdIndex = this.filter.title.titleTagIdIndex;
          list = this.list.titleList;
          searchList = this.filter.title.searchTitle;
          break;
        case "category":
          activeItems = this.filter.category.activeCategoryItems;
          tagIdIndex = this.filter.category.categoryTagIdIndex;
          list = this.list.categoryList;
          searchList = this.filter.category.searchCategory;
          break;
        case "department":
          activeItems = this.filter.department.activeDepartmentItems;
          tagIdIndex = this.filter.department.departmentTagIdIndex;
          list = this.list.departmentList;
          searchList = this.filter.department.searchDepartment;
          break;
        case "is_external":
          const isExternalTag = {
            id: this.filter.isExternal.isExternalTagIdIndex,
            value: `是否外聘：${this.list.isExternalList[command]}`,
          };
          if (this.filter.isExternal.searchIsExternal === undefined) {
            if (!this.filter.curSearch.includes("is_external")) {
              this.filter.curSearch.push("is_external");
            }
            this.tagsList.push(isExternalTag);
            this.filter.isExternal.searchIsExternal =
              command === 0 ? true : false;
          } else if (
            (this.filter.isExternal.searchIsExternal && !command) ||
            (!this.filter.isExternal.searchIsExternal && command)
          ) {
            this.$message.warning("你已添加过该标签");
            return;
          } else {
            this.filter.isExternal.searchIsExternal =
              command === 0 ? true : false;
            for (let index in this.tagsList) {
              if (this.tagsList[index].id === isExternalTag.id) {
                this.tagsList[
                  index
                ].value = `是否外聘：${this.list.isExternalList[command]}`;
              }
            }
          }
          return;
        case "status":
          const statusTag = {
            id: this.filter.status.statusTagIdIndex,
            value: `状态：${this.list.statusList[command]}`,
          };
          if (this.filter.status.searchStatus === undefined) {
            if (!this.filter.curSearch.includes("status")) {
              this.filter.curSearch.push("status");
            }
            this.tagsList.push(statusTag);
            this.filter.status.searchStatus = command === 0 ? true : false;
          } else if (
            (this.filter.status.searchStatus && !command) ||
            (!this.filter.status.searchStatus && command)
          ) {
            this.$message.warning("你已添加过该标签");
            return;
          } else {
            this.filter.status.searchStatus = command === 0 ? true : false;
            for (let index in this.tagsList) {
              if (this.tagsList[index].id === statusTag.id) {
                this.tagsList[
                  index
                ].value = `状态：${this.list.statusList[command]}`;
              }
            }
          }
          return;
        case "gender":
          const genderTag = {
            id: this.filter.gender.genderTagIdIndex,
            value: `性别：${this.list.genderList[command]}`,
          };
          if (this.filter.gender.searchGender === undefined) {
            if (!this.filter.curSearch.includes("gender")) {
              this.filter.curSearch.push("gender");
            }
            this.tagsList.push(genderTag);
            this.filter.gender.searchGender = command === 0 ? true : false;
          } else if (
            (this.filter.gender.searchGender && command === 1) ||
            (!this.filter.gender.searchGender && command === 0)
          ) {
            this.$message.warning("你已添加过该标签");
            return;
          } else {
            this.filter.gender.searchGender = command === 0 ? true : false;
            for (let index in this.tagsList) {
              if (this.tagsList[index].id === genderTag.id) {
                this.tagsList[
                  index
                ].value = `性别：${this.list.genderList[command]}`;
              }
            }
          }
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
          type === "ethnicity"
            ? "民族"
            : type === "title"
            ? "职称"
            : type === "category"
            ? "教职工类别"
            : type === "department"
            ? "单位"
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
    handleEnglishNameFilterInput() {
      if (this.tagsList.length >= this.tagsNum) {
        this.$message.warning("添加的筛选数量已达上限，请删除一些再添加");
        return;
      }
      const index = this.filter.curSearch.findIndex(
        (item) => item === "english_name"
      );
      const tagIndex = this.tagsList.findIndex((item) => item.id === 2);
      if (index != -1 && !this.filter.englishName.searchEnglishName) {
        // 输入框为空时，不筛选
        this.filter.curSearch.splice(index, 1);
        this.tagsList.splice(tagIndex, 1);
        return;
      }
      if (index != -1) {
        // 不再重复添加筛选项，更新标签
        this.tagsList[
          tagIndex
        ].value = `英文名：${this.filter.englishName.searchEnglishName}`;
        return;
      }
      // 添加筛选，添加标签
      this.filter.curSearch.push("english_name");
      const tag = {
        id: 1,
        value: `英文名：${this.filter.englishName.searchEnglishName}`,
      };
      this.tagsList.push(tag);
    },
    filterTableData() {
      let filteredData = this.tableData;
      for (let item of this.filter.curSearch) {
        switch (item) {
          case "id":
            filteredData = filteredData.filter((item) =>
              item.ID.toLowerCase().includes(
                this.filter.id.searchId.toLowerCase()
              )
            );
            break;
          case "name":
            filteredData = filteredData.filter((item) =>
              item.Name.toLowerCase().includes(
                this.filter.name.searchName.toLowerCase()
              )
            );
            break;
          case "english_name":
            filteredData = filteredData.filter((item) =>
              item.EnglishName.toLowerCase().includes(
                this.filter.englishName.searchEnglishName.toLowerCase()
              )
            );
            break;
          case "ethnicity":
            filteredData = filteredData.filter((item) => {
              return this.filter.ethnicity.searchEthnicity.some((ethnicity) =>
                item.Ethnicity.toLowerCase().includes(ethnicity.toLowerCase())
              );
            });
            break;
          case "title":
            filteredData = filteredData.filter((item) => {
              return this.filter.title.searchTitle.some((title) =>
                item.Title.toLowerCase().includes(title.toLowerCase())
              );
            });
            break;
          case "category":
            filteredData = filteredData.filter((item) => {
              return this.filter.category.searchCategory.some((category) =>
                item.Category.toString()
                  .toLowerCase()
                  .includes(category.toString().toLowerCase())
              );
            });
            break;
          case "is_external":
            if (this.filter.isExternal.searchIsExternal === undefined) break; // 不进行筛选
            filteredData = filteredData.filter((item) => {
              return (
                item.IsExternal === this.filter.isExternal.searchIsExternal
              );
            });
            break;
          case "department":
            filteredData = filteredData.filter((item) => {
              return this.filter.department.searchDepartment.some(
                (department) =>
                  item.Department.toLowerCase().includes(
                    department.toLowerCase()
                  )
              );
            });
            break;
          case "status":
            if (this.filter.status.searchStatus === undefined) break; // 不进行筛选
            filteredData = filteredData.filter((item) => {
              return (
                (item.Status === "启用" ? true : false) ===
                this.filter.status.searchStatus
              );
            });
            break;
          case "gender":
            if (this.filter.gender.searchGender === undefined) break; // 不进行筛选
            filteredData = filteredData.filter((item) => {
              return (
                (item.Gender === "男性" ? true : false) ===
                this.filter.gender.searchGender
              );
            });
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
      } else if (targetItem.id === 2) {
        this.filter.englishName.searchEnglishName = "";
      } else if (
        targetItem.id >= this.filter.gender.genderTagIdIndex &&
        targetItem.id < this.filter.ethnicity.ethnicityTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("gender", item);
      } else if (
        targetItem.id >= this.filter.ethnicity.ethnicityTagIdIndex &&
        targetItem.id < this.filter.department.departmentTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("ethnicity", item);
      } else if (
        targetItem.id >= this.filter.department.departmentTagIdIndex &&
        targetItem.id < this.filter.title.titleTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("department", item);
      } else if (
        targetItem.id >= this.filter.title.titleTagIdIndex &&
        targetItem.id < this.filter.category.categoryTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("title", item);
      } else if (
        targetItem.id >= this.filter.category.categoryTagIdIndex &&
        targetItem.id < this.filter.isExternal.isExternalTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("category", item);
      } else if (
        targetItem.id >= this.filter.isExternal.isExternalTagIdIndex &&
        targetItem.id < this.filter.status.statusTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("is_external", item);
      } else if (targetItem.id >= this.filter.status.statusTagIdIndex) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("status", item);
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
        case "ethnicity":
          searchItems = this.filter.ethnicity.searchEthnicity;
          activeItems = this.filter.ethnicity.activeEthnicityItems;
          Items = this.list.ethnicityList;
          break;
        case "title":
          searchItems = this.filter.title.searchTitle;
          activeItems = this.filter.title.activeTitleItems;
          Items = this.list.titleList;
          break;
        case "category":
          searchItems = this.filter.category.searchCategory;
          activeItems = this.filter.category.activeCategoryItems;
          Items = this.list.categoryList;
          break;
        case "is_external":
          this.filter.isExternal.searchIsExternal = undefined;
          isNull = true;
          break;
        case "department":
          searchItems = this.filter.department.searchDepartment;
          activeItems = this.filter.department.activeDepartmentItems;
          Items = this.list.departmentList;
          break;
        case "status":
          this.filter.status.searchStatus = undefined;
          isNull = true;
        case "gender":
          this.filter.gender.searchGender = undefined;
          isNull = true;
      }

      // 这两个和其他的不同，另作处理
      if (cate !== "is_external" && cate !== "status" && cate !== "gender") {
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