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
                      <span>教室编号</span>
                      <el-popover
                        placement="bottom"
                        title="请输入教室编号"
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
                      <span>教室名称</span>
                      <el-popover
                        placement="bottom"
                        title="请输入教室名称"
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
                <el-table-column prop="Campus" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="(command) => handleCommand(command, 'campus')"
                      >
                        <span class="el-dropdown-link">
                          校区<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <!-- TODO: 此处动态绑定样式不起作用，操作其它后会起作用 -->
                          <!-- :class="{ 'active-item': filter.campus.activeCampusItems[index] }" -->
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
                <el-table-column prop="Building" width="180">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'building')
                        "
                      >
                        <span class="el-dropdown-link">
                          教学楼<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.buildingList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Floor" width="100">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="(command) => handleCommand(command, 'floor')"
                      >
                        <span class="el-dropdown-link">
                          楼层<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.floorList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Capacity" label="容量" width="100">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'capacity')
                        "
                      >
                        <span class="el-dropdown-link">
                          容量<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="index"
                            v-for="(item, index) in list.capacityList"
                            :key="index"
                            >{{ item }}</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Type" label="类型" width="160">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="(command) => handleCommand(command, 'type')"
                      >
                        <span class="el-dropdown-link">
                          类型<i class="el-icon-arrow-down el-icon--right"></i>
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
                <el-table-column prop="HasAC" label="是否有空调" width="130">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="(command) => handleCommand(command, 'hasAc')"
                      >
                        <span class="el-dropdown-link">
                          是否有空调<i
                            class="el-icon-arrow-down el-icon--right"
                          ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            :command="0"
                            :disabled="!filter.hasAc.hasAcExists[0]"
                            >是</el-dropdown-item
                          >
                          <el-dropdown-item
                            :command="1"
                            :disabled="!filter.hasAc.hasAcExists[1]"
                            >否</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <span>{{ scope.row.HasAC ? "是" : "否" }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Description" label="描述" width="120">
                </el-table-column>
                <el-table-column prop="Department" label="所属院系" width="180">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown
                        @command="
                          (command) => handleCommand(command, 'department')
                        "
                      >
                        <span class="el-dropdown-link">
                          所属院系<i
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
                        @click="handleDeleteClassroom(scope.row)"
                        type="text"
                        size="small"
                        >删除</el-button
                      >
                      <el-button
                        @click="handleModifyClassroom(scope.row)"
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
            title="教室详细"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
          >
            <template v-if="dialogVisible">
              <ClassroomForm
                ref="classroomFormRef"
                :ClassroomInfo="classroomInfo"
                @submit="handleManageSubmit"
              ></ClassroomForm>
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
          <ClassroomForm
            :classroomInfo="classroomInsertInfo"
            ref="classroomInsertFormRef"
            @submit="handleInsertSubmit"
          ></ClassroomForm>
          <!-- excel输入 -->
          <div class="excel-upload-section">
            <el-upload
              class="upload-child"
              :auto-upload="false"
              drag
              :action="getClassroomFileUploadUrl"
              :before-upload="handleBeforeUpload"
              ref="classroomUploadRef"
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
              @click="handleClassroomUpload"
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
import { SERVER_URL, CLASSROOM_PREFIX, TAGS_NUM } from "@config";
import axios from "axios";
import ClassroomForm from "@/components/ClassroomForm";
export default {
  name: "Classroom",
  components: {
    ClassroomForm,
  },
  mounted() {
    this.handleGetClassrooms();
  },
  data() {
    return {
      activeTabIndex: "1", // 控制tab-pane
      tableData: [], // 总数据
      serverUrl: SERVER_URL,
      classroomPrefix: CLASSROOM_PREFIX,
      tagsNum: TAGS_NUM,
      dialogVisible: false, // 编辑的dialog
      classroomInfo: {}, // 管理用
      classroomInsertInfo: {}, // 新增用
      tagType: ["", "success", "info", "warning", "danger"],
      tagsList: [],
      maxTagWidth: 210, // 单个tag的最大宽度，单位为px，可根据需求调整
      list: {
        campusList: [],
        buildingList: [],
        floorList: [],
        capacityList: [],
        typeList: [],
        departmentList: [],
        hasAcList: ["是", "否"],
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
        campus: {
          searchCampus: [],
          activeCampusItems: [],
          campusTagIdIndex: undefined, // campus的TagId起始索引
        },
        building: {
          searchBuilding: [],
          activeBuildingItems: [],
          buildingTagIdIndex: undefined,
        },
        floor: {
          searchFloor: [],
          activeFloorItems: [],
          floorTagIdIndex: undefined,
        },
        capacity: {
          searchCapacity: [],
          activeCapacityItems: [],
          capacityTagIdIndex: undefined,
        },
        type: {
          searchType: [],
          activeTypeItems: [],
          typeTagIdIndex: undefined,
        },
        hasAc: {
          searchHasAc: undefined,
          hasAcExists: [false, false],
          hasAcTagIdIndex: undefined,
        },
        status: {
          searchStatus: undefined,
          statusExists: [false, false],
          statusTagIdIndex: undefined,
        },
        department: {
          searchDepartment: [],
          activeDepartmentItems: [],
          departmentTagIdIndex: undefined,
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
    getClassroomFileUploadUrl() {
      return `${this.serverUrl}${this.classroomPrefix}/create/file`;
    },
    getClassroomInsertUrl() {
      return `${this.serverUrl}${this.classroomPrefix}/create`;
    },
    getAllClassroomsUrl() {
      return `${this.serverUrl}${this.classroomPrefix}/queryall`;
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
    handleClassroomUpload() {
      const uploadFiles = this.$refs.classroomUploadRef.uploadFiles;
      if (uploadFiles.length === 0) {
        this.$message.error("请选择要上传的文件");
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "文件正在上传中，请耐心等待",
        spinner: "el-icon-loading",
        background: "rgba(0,0,0,0.7)",
        zIndex: 4000,
      });
      const formData = new FormData();
      uploadFiles.forEach((file) => {
        formData.append("classroom_file", file.raw);
      });
      axios
        .post(this.getClassroomFileUploadUrl, formData, {
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
            this.$refs.classroomUploadRef.clearFiles();
            this.handleGetClassrooms();
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
        .post(this.getClassroomInsertUrl, info)
        .then((res) => {
          if (res.data.status == 200) {
            this.$message.success("新增成功");
            this.handleInsertReset();
            this.handleGetClassrooms(); // 刷新
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
      this.$refs.classroomInsertFormRef.handleManageReset();
    },
    // 管理
    handleProcessTableData() {
      this.Pagi.total = this.tableData.length;

      // 提取所有 Campus 的种类
      const campusSet = new Set();
      this.tableData.forEach((item) => {
        if (item.Campus) {
          campusSet.add(item.Campus);
        }
      });
      this.list.campusList = Array.from(campusSet);

      // 提取所有 Building 的种类
      const buildingSet = new Set();
      this.tableData.forEach((item) => {
        if (item.Building) {
          buildingSet.add(item.Building);
        }
      });
      this.list.buildingList = Array.from(buildingSet);

      // 提取所有 Floor 的种类
      const floorSet = new Set();
      this.tableData.forEach((item) => {
        if (item.Floor) {
          floorSet.add(item.Floor);
        }
      });
      this.list.floorList = Array.from(floorSet);
      this.list.floorList.sort((a, b) => a - b); // 按数值从小到大排序
      this.filter.campus.activeCampusItems = Array(
        this.list.campusList.length
      ).fill(false);
      this.filter.building.activeBuildingItems = Array(
        this.list.buildingList.length
      ).fill(false);
      this.filter.floor.activeFloorItems = Array(
        this.list.floorList.length
      ).fill(false);
      this.filter.campus.campusTagIdIndex = 2;
      this.filter.building.buildingTagIdIndex =
        this.filter.campus.campusTagIdIndex + this.list.campusList.length;
      this.filter.floor.floorTagIdIndex =
        this.filter.building.buildingTagIdIndex + this.list.buildingList.length;

      // 提取所有 Capacity 的种类
      const capacitySet = new Set();
      this.tableData.forEach((item) => {
        if (item.Capacity) {
          capacitySet.add(item.Capacity);
        }
      });
      this.list.capacityList = Array.from(capacitySet);
      this.list.capacityList.sort((a, b) => a - b); // 按数值从小到大排序

      // 提取所有 Type 的种类
      const typeSet = new Set();
      this.tableData.forEach((item) => {
        if (item.Type) {
          typeSet.add(item.Type);
        }
      });
      this.list.typeList = Array.from(typeSet);

      // 提取所有 Department 的种类
      const departmentSet = new Set();
      this.tableData.forEach((item) => {
        if (item.Department) {
          departmentSet.add(item.Department);
        }
      });
      this.list.departmentList = Array.from(departmentSet);

      // 检查是否有空调的数据
      this.filter.hasAc.hasAcExists = [false, false];
      this.tableData.forEach((item) => {
        if (item.HasAC) {
          this.filter.hasAc.hasAcExists[0] = true;
        } else {
          this.filter.hasAc.hasAcExists[1] = true;
        }
      });

      // 检查状态的数据
      this.filter.status.statusExists = [false, false];
      this.tableData.forEach((item) => {
        if (item.Status === "启用") {
          this.filter.status.statusExists[0] = true;
        } else if (item.Status === "不启用") {
          this.filter.status.statusExists[1] = true;
        }
      });

      this.filter.capacity.activeCapacityItems = Array(
        this.list.capacityList.length
      ).fill(false);
      this.filter.type.activeTypeItems = Array(this.list.typeList.length).fill(
        false
      );
      this.activeHasAcItems = Array(this.list.hasAcList.length).fill(false);
      this.filter.department.activeDepartmentItems = Array(
        this.list.departmentList.length
      ).fill(false);
      this.activeStatusItems = Array(this.list.statusList.length).fill(false);

      this.filter.capacity.capacityTagIdIndex =
        this.filter.floor.floorTagIdIndex + this.list.floorList.length;
      this.filter.type.typeTagIdIndex =
        this.filter.capacity.capacityTagIdIndex + this.list.capacityList.length;
      this.filter.hasAc.hasAcTagIdIndex =
        this.filter.type.typeTagIdIndex + this.list.typeList.length;
      this.filter.department.departmentTagIdIndex =
        this.filter.hasAc.hasAcTagIdIndex + 1;
      this.filter.status.statusTagIdIndex =
        this.filter.department.departmentTagIdIndex +
        this.list.departmentList.length;
    },
    handleGetClassrooms() {
      axios
        .get(this.getAllClassroomsUrl)
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
    handleDeleteClassroom(row) {
      const classroomId = row.ID;
      axios
        .delete(
          `${this.serverUrl}${this.classroomPrefix}/delete/${classroomId}`
        )
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.handleGetClassrooms();
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
    handleModifyClassroom(row) {
      this.classroomInfo = {
        id: row.ID,
        name: row.Name,
        campus: row.Campus,
        building: row.Building,
        floor: row.Floor,
        capacity: row.Capacity,
        type: row.Type,
        has_ac: row.HasAC,
        description: row.Description,
        department: row.Department,
        status: row.Status,
      };
      this.dialogVisible = true;
    },
    handleManageReset() {
      this.classroomInfo = {};
    },
    handleManageSubmit(newClassroomInfo) {
      axios
        .put(
          `${this.serverUrl}${this.classroomPrefix}/update/${newClassroomInfo.id}`,
          newClassroomInfo
        )
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.handleGetClassrooms();
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
        case "campus":
          activeItems = this.filter.campus.activeCampusItems;
          tagIdIndex = 2;
          list = this.list.campusList;
          searchList = this.filter.campus.searchCampus;
          break;
        case "building":
          activeItems = this.filter.building.activeBuildingItems;
          tagIdIndex = this.filter.building.buildingTagIdIndex;
          list = this.list.buildingList;
          searchList = this.filter.building.searchBuilding;
          break;
        case "floor":
          activeItems = this.filter.floor.activeFloorItems;
          tagIdIndex = this.filter.floor.floorTagIdIndex;
          list = this.list.floorList;
          searchList = this.filter.floor.searchFloor;
          break;
        case "capacity":
          activeItems = this.filter.capacity.activeCapacityItems;
          tagIdIndex = this.filter.capacity.capacityTagIdIndex;
          list = this.list.capacityList;
          searchList = this.filter.capacity.searchCapacity;
          break;
        case "type":
          activeItems = this.filter.type.activeTypeItems;
          tagIdIndex = this.filter.type.typeTagIdIndex;
          list = this.list.typeList;
          searchList = this.filter.type.searchType;
          break;
        case "department":
          activeItems = this.filter.department.activeDepartmentItems;
          tagIdIndex = this.filter.department.departmentTagIdIndex;
          list = this.list.departmentList;
          searchList = this.filter.department.searchDepartment;
          break;
        case "hasAc":
          const hasAcTag = {
            id: this.filter.hasAc.hasAcTagIdIndex,
            value: `是否有空调：${this.list.hasAcList[command]}`,
          };
          if (this.filter.hasAc.searchHasAc === undefined) {
            if (!this.filter.curSearch.includes("hasAc")) {
              this.filter.curSearch.push("hasAc");
            }
            this.tagsList.push(hasAcTag);
            this.filter.hasAc.searchHasAc = command === 0 ? true : false;
          } else if (
            (this.filter.hasAc.searchHasAc && !command) ||
            (!this.filter.hasAc.searchHasAc && command)
          ) {
            this.$message.warning("你已添加过该标签");
            return;
          } else {
            this.filter.hasAc.searchHasAc = command === 0 ? true : false;
            for (let index in this.tagsList) {
              if (this.tagsList[index].id === hasAcTag.id) {
                this.tagsList[
                  index
                ].value = `是否有空调：${this.list.hasAcList[command]}`;
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
      }

      if (activeItems[command]) {
        this.$message.warning("你已添加过该标签");
        return;
      }
      activeItems[command] = true;

      const tag = {
        id: command + tagIdIndex,
        value: `${
          type === "campus"
            ? "校区"
            : type === "building"
            ? "教学楼"
            : type === "floor"
            ? "楼层"
            : type === "capacity"
            ? "容量"
            : type === "type"
            ? "类型"
            : type === "department"
            ? "所属院系"
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
      for (let item of this.filter.curSearch) {
        switch (item) {
          // 其他 case...
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
          case "campus":
            filteredData = filteredData.filter((item) => {
              return this.filter.campus.searchCampus.some((campus) =>
                item.Campus.toLowerCase().includes(campus.toLowerCase())
              );
            });
            break;
          case "building":
            filteredData = filteredData.filter((item) => {
              return this.filter.building.searchBuilding.some((building) =>
                item.Building.toLowerCase().includes(building.toLowerCase())
              );
            });
            break;
          case "floor":
            filteredData = filteredData.filter((item) => {
              return this.filter.floor.searchFloor.some((floor) =>
                item.Floor.toString()
                  .toLowerCase()
                  .includes(floor.toString().toLowerCase())
              );
            });
            break;
          case "capacity":
            filteredData = filteredData.filter((item) => {
              return this.filter.capacity.searchCapacity.some((capacity) =>
                item.Capacity.toString().includes(capacity.toString())
              );
            });
            break;
          case "type":
            filteredData = filteredData.filter((item) => {
              return this.filter.type.searchType.some((type) =>
                item.Type.toLowerCase().includes(type.toLowerCase())
              );
            });
            break;
          case "hasAc":
            if (this.filter.hasAc.searchHasAc === undefined) break; // 不进行筛选
            filteredData = filteredData.filter((item) => {
              return item.HasAC === this.filter.hasAc.searchHasAc;
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
        targetItem.id >= this.filter.campus.campusTagIdIndex &&
        targetItem.id < this.filter.building.buildingTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("campus", item);
      } else if (
        targetItem.id >= this.filter.building.buildingTagIdIndex &&
        targetItem.id < this.filter.floor.floorTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("building", item);
      } else if (
        targetItem.id >= this.filter.floor.floorTagIdIndex &&
        targetItem.id < this.filter.capacity.capacityTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("floor", item);
      } else if (
        targetItem.id >= this.filter.capacity.capacityTagIdIndex &&
        targetItem.id < this.filter.type.typeTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("capacity", item);
      } else if (
        targetItem.id >= this.filter.type.typeTagIdIndex &&
        targetItem.id < this.filter.hasAc.hasAcTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("type", item);
      } else if (
        targetItem.id >= this.filter.hasAc.hasAcTagIdIndex &&
        targetItem.id < this.filter.department.departmentTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("hasAc", item);
      } else if (
        targetItem.id >= this.filter.department.departmentTagIdIndex &&
        targetItem.id < this.filter.status.statusTagIdIndex
      ) {
        const item = targetItem.value.split("：")[1];
        this.handleDeleteMulSelectFilter("department", item);
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
        case "campus":
          searchItems = this.filter.campus.searchCampus;
          activeItems = this.filter.campus.activeCampusItems;
          Items = this.list.campusList;
          break;
        case "building":
          searchItems = this.filter.building.searchBuilding;
          activeItems = this.filter.building.activeBuildingItems;
          Items = this.list.buildingList;
          break;
        case "floor":
          searchItems = this.filter.floor.searchFloor;
          activeItems = this.filter.floor.activeFloorItems;
          Items = this.list.floorList;
          break;
        case "capacity":
          searchItems = this.filter.capacity.searchCapacity;
          activeItems = this.filter.capacity.activeCapacityItems;
          Items = this.list.capacityList;
          break;
        case "type":
          searchItems = this.filter.type.searchType;
          activeItems = this.filter.type.activeTypeItems;
          Items = this.list.typeList;
          break;
        case "hasAc":
          this.filter.hasAc.searchHasAc = undefined;
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
      }

      // 这两个和其他的不同，另作处理
      if (cate !== "hasAc" && cate !== "status") {
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
  margin-top: -30px;
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