<template>
  <div class="content">
    <el-tabs type="border-card" v-model="activeTabIndex">
      <el-tab-pane label="排课管理" name="1">
        <!-- 排课管理 -->
        <div class="manage-section">
          <div class="table-tag">
            <div class="table-section">
              <el-table 
                :data="filterTableData()" 
                border 
                style="width: 100%; height: 701px;"
                v-loading="loading"
              >
              <!-- 任务编号 -->
              <el-table-column prop="id" label="任务编号" width="120" fixed>
                  <template v-slot:header>
                    <div class="header-font">
                      <span>任务编号</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.id.searchScheduleId"
                            placeholder="输入任务编号过滤"
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





                <!-- 学年学期 -->
                <el-table-column prop="semester" label="学年学期" width="150">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>学年学期</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.year.searchYear"
                            placeholder="输入学年学期过滤"
                            @input="handleYearFilterInput"
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
                
                <!-- 课程编号 -->
                <el-table-column prop="course_id" label="课程编号" width="150">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>课程编号</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.courseId.searchId"
                            placeholder="输入课程编号过滤"
                            @input="handleCourseIdFilterInput"
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
                
                <!-- 课程名称 -->
                <el-table-column prop="course_name" label="课程名称" width="180">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>课程名称</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.courseName.searchName"
                            placeholder="输入课程名称过滤"
                            @input="handleCourseNameFilterInput"
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
                
                <!-- 教师工号 -->
                <el-table-column prop="teacher_id" label="教师工号" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>教师工号</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.teacherId.searchTeacherId"
                            placeholder="输入教师工号过滤"
                            @input="handleTeacherIdFilterInput"
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
                
                <!-- 任课教师 -->
                <el-table-column prop="teacher_name" label="任课教师" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>任课教师</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.teacher.searchTeacher"
                            placeholder="输入教师姓名过滤"
                            @input="handleTeacherFilterInput"
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
                
                <!-- 教学班组成 -->
                <el-table-column prop="teaching_class" label="教学班组成" width="150">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>教学班组成</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.classComp.searchClassComp"
                            placeholder="输入教学班组成过滤"
                            @input="handleClassCompFilterInput"
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
                
                <!-- 教学班编号 -->
                <el-table-column prop="teaching_class_number" label="教学班编号" width="180">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>教学班编号</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.classId.searchClassId"
                            placeholder="输入教学班编号过滤"
                            @input="handleClassIdFilterInput"
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
                
                <!-- 课程归属 -->
                <el-table-column prop="course_affiliation" label="课程归属" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>课程归属</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.affiliation.searchAffiliation"
                            placeholder="输入课程归属过滤"
                            @input="handleAffiliationFilterInput"
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
                
                <!-- 课程学分 -->
                <el-table-column prop="course_credit" label="课程学分" width="100">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'credit')">
                        <span class="el-dropdown-link">
                          课程学分<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="0">升序</el-dropdown-item>
                          <el-dropdown-item :command="1">降序</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                
                <!-- 教学班名称 -->
                <el-table-column prop="teaching_class_name" label="教学班名称" width="200">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>教学班名称</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.className.searchClassName"
                            placeholder="输入教学班名称过滤"
                            @input="handleClassNameFilterInput"
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
                
                <!-- 学时类型 -->
                <el-table-column prop="hour_type" label="学时类型" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'hoursType')">
                        <span class="el-dropdown-link">
                          学时类型<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item 
                            :command="index" 
                            v-for="(item, index) in list.hoursTypeList" 
                            :key="index"
                          >
                            {{ item }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                
                <!-- 开课学时 -->
                <el-table-column prop="opening_hours" label="开课学时" width="100">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'openingHours')">
                        <span class="el-dropdown-link">
                          开课学时<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="0">升序</el-dropdown-item>
                          <el-dropdown-item :command="1">降序</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                
                <!-- 排课学时 -->
                <el-table-column prop="scheduling_hours" label="排课学时" width="100">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'schedulingHours')">
                        <span class="el-dropdown-link">
                          排课学时<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="0">升序</el-dropdown-item>
                          <el-dropdown-item :command="1">降序</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                
                <!-- 总学时 -->
                <el-table-column prop="total_hours" label="总学时" width="100">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'totalHours')">
                        <span class="el-dropdown-link">
                          总学时<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="0">升序</el-dropdown-item>
                          <el-dropdown-item :command="1">降序</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                
                <!-- 排课优先级 -->
                <el-table-column prop="scheduling_priority" label="排课优先级" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'priority')">
                        <span class="el-dropdown-link">
                          排课优先级<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="0">升序</el-dropdown-item>
                          <el-dropdown-item :command="1">降序</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                
                <!-- 教学班人数 -->
                <el-table-column prop="teaching_class_size" label="教学班人数" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'classSize')">
                        <span class="el-dropdown-link">
                          班级人数<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="0">升序</el-dropdown-item>
                          <el-dropdown-item :command="1">降序</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                
                <!-- 课程性质 -->
                <el-table-column prop="course_nature" label="课程性质" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'nature')">
                        <span class="el-dropdown-link">
                          课程性质<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item 
                            :command="index" 
                            v-for="(item, index) in list.natureList" 
                            :key="index"
                          >
                            {{ item }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                
                <!-- 开课校区 -->
                <el-table-column prop="opening_campus" label="开课校区" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'opening_campus')">
                        <span class="el-dropdown-link">
                          开课校区<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item 
                            :command="index" 
                            v-for="(item, index) in list.opening_campusList" 
                            :key="index"
                          >
                            {{ item }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                
                <!-- 是否外聘 -->
                <el-table-column prop="is_external" label="是否外聘" width="100">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'external')">
                        <span class="el-dropdown-link">
                          是否外聘<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="0">是</el-dropdown-item>
                          <el-dropdown-item :command="1">否</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <span>{{ scope.row.is_external ? '是' : '否' }}</span>
                  </template>
                </el-table-column>
                
                <!-- 开课院系 -->
                <el-table-column prop="department" label="开课院系" width="150">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'department')">
                        <span class="el-dropdown-link">
                          开课院系<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item 
                            :command="index" 
                            v-for="(item, index) in list.departmentList" 
                            :key="index"
                          >
                            {{ item }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                
                <!-- 开课周次学时 -->
                <el-table-column prop="opening_week_hours" label="开课周次学时" width="150">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>开课周次学时</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.weekHours.searchWeekHours"
                            placeholder="输入开课周次学时过滤"
                            @input="handleWeekHoursFilterInput"
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
                
                <!-- 连排节次 -->
                <el-table-column prop="continuous_periods" label="连排节次" width="100">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'sessions')">
                        <span class="el-dropdown-link">
                          连排节次<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="0">升序</el-dropdown-item>
                          <el-dropdown-item :command="1">降序</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                
                <!-- 指定教室类型 -->
                <el-table-column prop="specified_specified_classroom_type" label="指定教室类型" width="150">
                  <template v-slot:header>
                    <div class="header-font">
                      <el-dropdown @command="(command) => handleCommand(command, 'specified_classroomType')">
                        <span class="el-dropdown-link">
                          教室类型<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item 
                            :command="index" 
                            v-for="(item, index) in list.specified_classroomTypeList" 
                            :key="index"
                          >
                            {{ item }}
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </template>
                </el-table-column>
                
                <!-- 指定教室 -->
                <el-table-column prop="specified_classroom" label="指定教室" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>指定教室</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.specified_classroom.searchspecified_classroom"
                            placeholder="输入教室过滤"
                            @input="handlespecified_classroomFilterInput"
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
                
                <!-- 指定教学楼 -->
                <el-table-column prop="specified_building" label="指定教学楼" width="120">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>指定教学楼</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.specified_building.searchspecified_building"
                            placeholder="输入教学楼过滤"
                            @input="handlespecified_buildingFilterInput"
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
                
                <!-- 指定时间 -->
                <el-table-column prop="specified_time" label="指定时间" width="150">
                  <template v-slot:header>
                    <div class="header-font">
                      <span>指定时间</span>
                      <el-popover placement="bottom" width="200" trigger="click">
                        <div>
                          <el-input
                            v-model="filter.time.searchTime"
                            placeholder="输入时间过滤"
                            @input="handleTimeFilterInput"
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
                
                <!-- 操作列 -->
                <el-table-column fixed="right" label="操作" width="180">
                  <template slot-scope="scope">
                    <div class="buttons">
                      <el-button
                        @click="handleEditSchedule(scope.row)"
                        type="text"
                        size="small"
                        >编辑</el-button
                      >
                      <el-button
                        @click="handleDeleteSchedule(scope.row)"
                        type="text"
                        size="small"
                        >删除</el-button
                      >
                      <el-button
                        @click="handleArrangespecified_classroom(scope.row)"
                        type="text"
                        size="small"
                        >排课</el-button
                      >
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- 筛选标签区域 -->
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
          
          <!-- 编辑排课对话框 -->
          <el-dialog
            width="80%"
            title="编辑排课任务"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
          >
            <template v-if="dialogVisible">
              <ScheduleForm
                :scheduleInfo="scheduleInfo"
                @submit="handleEditSubmit"
              ></ScheduleForm>
            </template>
          </el-dialog>
          
          <!-- 分页 -->
          <div class="pagi-section">
            <el-pagination
              style="margin-top: 5px"
              background
              layout="prev, pager, next, total"
              :total="Pagi.total"
              :page-size="Pagi.pageSize"
              :current-page="Pagi.current"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="新增排课" name="2">
        <!-- 新增排课 -->
        <div class="insert-section" >
          <div class="form-container" style="flex: 1; overflow-y: auto; padding: 0 20px; margin-bottom: 20px;">
            <ScheduleForm
              :scheduleInfo="scheduleInsertInfo"
              ref="scheduleInsertFormRef"
              @submit="handleInsertSubmit"
            ></ScheduleForm>
          
            <!-- excel导入 -->
            <div class="excel-upload-section">
              <el-upload
                class="upload-child"
                :auto-upload="false"
                drag
                :action="getScheduleFileUploadUrl"
                :before-upload="handleBeforeUpload"
                ref="scheduleUploadRef"
                multiple
                :on-change="handleFileChange"
                accept=".xlsx,.xls"
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
                @click="handleScheduleUpload"
                class="upload-child upload-button"
                :disabled="uploadFiles.length === 0"
              >
                上传<i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </div>
            </div>
        </div>
      </el-tab-pane>
      
      <!-- <el-tab-pane label="排课结果" name="3">
        
        <div class="result-section">
          <el-table :data="arrangedData" border style="width: 100%" v-loading="loadingArranged">
            <el-table-column prop="teaching_class_name" label="教学班名称" width="180"></el-table-column>
            <el-table-column prop="course_name" label="课程名称" width="180"></el-table-column>
            <el-table-column prop="teacher_name" label="任课教师" width="120"></el-table-column>
            <el-table-column prop="specified_classroom" label="教室" width="120"></el-table-column>
            <el-table-column prop="specified_building" label="教学楼" width="120"></el-table-column>
            <el-table-column prop="specified_time" label="时间" width="200"></el-table-column>
            <el-table-column prop="opening_week_hours" label="周次学时" width="120"></el-table-column>
            <el-table-column prop="continuous_periods" label="连排节次" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click="handleAdjustSchedule(scope.row)"
                  type="text"
                  size="small"
                  >调整</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { SERVER_URL, SCHEDULE_PREFIX, TAGS_NUM } from "@config";
import axios from "axios";
import ScheduleForm from "@/components/ScheduleForm";

export default {
  name: "ScheduleManagement",
  components: {
    ScheduleForm,
  },
  data() {
    return {
      activeTabIndex: "1",
      tableData: [],
      arrangedData: [],
      loading: false,
      loadingArranged: false,
      serverUrl: SERVER_URL,
      schedulePrefix: SCHEDULE_PREFIX,
      tagsNum: TAGS_NUM,
      dialogVisible: false,
      scheduleInfo: {},
      scheduleInsertInfo: {},
      uploadFiles: [],
      tagType: ["", "success", "info", "warning", "danger"],
      tagsList: [],
      maxTagWidth: 210,
      startOffset: 2,
      list: {
        natureList: ["必修课", "选修课", "公共课", "专业课"],
        opening_campusList: ["铁门关校区", "其他校区"],
        departmentList: ["教育艺术学院", "信息工程学院", "经济管理学院", "机电工程学院"],
        hoursTypeList: ["理论", "实践", "混合"],
        specified_classroomTypeList: ["多媒体教室", "普通教室", "实验室", "机房", "体育场"],
        sortList: ["升序", "降序"],
        yesNoList: ["是", "否"]
      },
      Pagi: {
        pageSize: 5,
        total: 0,
        current: 1,
      },
      filter: {
        id: {searchScheduleId: ""},
        year: { searchYear: "" },
        courseId: { searchId: "" },
        courseName: { searchName: "" },
        teacherId: { searchTeacherId: "" },
        teacher: { searchTeacher: "" },
        classComp: { searchClassComp: "" },
        classId: { searchClassId: "" },
        affiliation: { searchAffiliation: "" },
        className: { searchClassName: "" },
        hoursType: { 
          searchHoursType: [],
          activeHoursTypeItems: [],
          hoursTypeTagIdIndex: undefined
        },
        openingHours: { searchOpeningHours: undefined },
        schedulingHours: { searchSchedulingHours: undefined },
        totalHours: { searchTotalHours: undefined },
        priority: { searchPriority: undefined },
        classSize: { searchClassSize: undefined },
        nature: { 
          searchNature: [],
          activeNatureItems: [],
          natureTagIdIndex: undefined
        },
        opening_campus: { 
          searchopening_campus: [],
          activeopening_campusItems: [],
          opening_campusTagIdIndex: undefined
        },
        external: { searchExternal: undefined },
        department: { 
          searchDepartment: [],
          activeDepartmentItems: [],
          departmentTagIdIndex: undefined
        },
        weekHours: { searchWeekHours: "" },
        sessions: { searchSessions: undefined },
        specified_classroomType: { 
          searchspecified_classroomType: [],
          activespecified_classroomTypeItems: [],
          specified_classroomTypeTagIdIndex: undefined
        },
        specified_classroom: { searchspecified_classroom: "" },
        specified_building: { searchspecified_building: "" },
        time: { searchTime: "" },
        curSearch: [],
      },
    };
  },
  computed: {
    getScheduleFileUploadUrl() {
      return `${this.serverUrl}${this.schedulePrefix}/create/file`;
    },
    getScheduleInsertUrl() {
      return `${this.serverUrl}${this.schedulePrefix}/create`;
    },
    getAllSchedulesUrl() {
      return `${this.serverUrl}${this.schedulePrefix}/queryall`;
    },
    getArrangedSchedulesUrl() {
      return `${this.serverUrl}${this.schedulePrefix}/arranged`;
    },
  },
  mounted() {
    this.handleGetSchedules();
    // this.handleGetArrangedSchedules();
  },
  methods: {
    // 文件上传相关方法
    handleBeforeUpload(file) {
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
    
    handleFileChange(file, fileList) {
      this.uploadFiles = fileList;
    },
    
    handleScheduleUpload() {
      if (this.uploadFiles.length === 0) {
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
      this.uploadFiles.forEach((file) => {
        formData.append("schedule_file", file.raw);
      });
      
      axios.post(this.getScheduleFileUploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          loading.close();
          this.$message.success("排课文件上传成功");
          this.$refs.scheduleUploadRef.clearFiles();
          this.uploadFiles = [];
          this.handleGetSchedules();
        } else {
          this.$message.error(response.data.message || "文件上传失败");
          loading.close();
        }
      })
      .catch((error) => {
        console.error("上传出错:", error);
        this.$message.error(error.response?.data?.message || "上传过程中出现错误");
        loading.close();
      });
    },
    
    // 新增排课
    handleInsertSubmit(info) {
      this.loading = true;
      axios.post(this.getScheduleInsertUrl, info)
        .then((res) => {
          if (res.status == 200) {
            this.$message.success("新增排课成功");
            this.handleInsertReset();
            this.handleGetSchedules();
          } else {
            this.$message.error(res.data.message || "新增排课失败!");
          }
        })
        .catch((error) => {
          const errMsg = error.response?.data?.message;
          this.$message.error(`新增排课失败！${errMsg || error.message}`);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    handleInsertReset() {
      this.$refs.scheduleInsertFormRef?.handleReset();
    },
    
    // 获取数据
    handleGetSchedules() {
      this.loading = true;
      axios.get(this.getAllSchedulesUrl)
        .then((res) => {
          // console.log(res.data.data.Schedules);
          if (res.status === 200) {
            this.tableData = res.data.data.Schedules || [];
            this.Pagi.total = this.tableData.length;
            this.initFilterOptions();
          } else {
            this.$message.error(res.data.message || "排课数据请求失败");
          }
        })
        .catch((err) => {
          console.error("获取排课数据失败:", err);
          this.$message.error(err.response?.data?.message || "排课数据请求失败");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    // handleGetArrangedSchedules() {
    //   this.loadingArranged = true;
    //   axios.get(this.getArrangedSchedulesUrl)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         this.arrangedData = res.data.data.arranged || [];
    //       } else {
    //         this.$message.error(res.data.message || "获取排课结果失败");
    //       }
    //     })
    //     .catch((err) => {
    //       console.error("获取排课结果失败:", err);
    //       this.$message.error(err.response?.data?.message || "获取排课结果失败");
    //     })
    //     .finally(() => {
    //       this.loadingArranged = false;
    //     });
    // },
    
    // 初始化筛选选项
    initFilterOptions() {
      // 处理下拉选项
      const unique = (arr) => [...new Set(arr.filter(item => item))];
      
      // 院系列表
      this.list.departmentList = unique(this.tableData.map(item => item.department));
      
      // 初始化activeItems
      this.filter.hoursType.activeHoursTypeItems = Array(this.list.hoursTypeList.length).fill(false);
      this.filter.nature.activeNatureItems = Array(this.list.natureList.length).fill(false);
      this.filter.opening_campus.activeopening_campusItems = Array(this.list.opening_campusList.length).fill(false);
      this.filter.department.activeDepartmentItems = Array(this.list.departmentList.length).fill(false);
      this.filter.specified_classroomType.activespecified_classroomTypeItems = Array(this.list.specified_classroomTypeList.length).fill(false);
      
      // 设置标签索引
      this.filter.hoursType.hoursTypeTagIdIndex = this.startOffset;
      this.filter.nature.natureTagIdIndex = this.filter.hoursType.hoursTypeTagIdIndex + this.list.hoursTypeList.length;
      this.filter.opening_campus.opening_campusTagIdIndex = this.filter.nature.natureTagIdIndex + this.list.natureList.length;
      this.filter.department.departmentTagIdIndex = this.filter.opening_campus.opening_campusTagIdIndex + this.list.opening_campusList.length;
      this.filter.specified_classroomType.specified_classroomTypeTagIdIndex = this.filter.department.departmentTagIdIndex + this.list.departmentList.length;
      
      // 排序类标签索引
      this.filter.openingHours.openingHoursTagIdIndex = this.filter.specified_classroomType.specified_classroomTypeTagIdIndex + this.list.specified_classroomTypeList.length;
      this.filter.schedulingHours.schedulingHoursTagIdIndex = this.filter.openingHours.openingHoursTagIdIndex + this.list.sortList.length;
      this.filter.totalHours.totalHoursTagIdIndex = this.filter.schedulingHours.schedulingHoursTagIdIndex + this.list.sortList.length;
      this.filter.priority.priorityTagIdIndex = this.filter.totalHours.totalHoursTagIdIndex + this.list.sortList.length;
      this.filter.classSize.classSizeTagIdIndex = this.filter.priority.priorityTagIdIndex + this.list.sortList.length;
      this.filter.sessions.sessionsTagIdIndex = this.filter.classSize.classSizeTagIdIndex + this.list.sortList.length;
      this.filter.external.externalTagIdIndex = this.filter.sessions.sessionsTagIdIndex + this.list.yesNoList.length;
    },
    
    // 排课管理操作
    handleEditSchedule(row) {
      this.scheduleInfo = { ...row };
      this.dialogVisible = true;
    },
    
    handleDeleteSchedule(row) {
      this.$confirm("确认删除该排课任务?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          axios.delete(`${this.serverUrl}${this.schedulePrefix}/delete/${row.id}`)
            .then((res) => {
              if (res.data.status === 200) {
                this.$message.success("删除成功");
                this.handleGetSchedules();
                this.handleGetArrangedSchedules();
              } else {
                this.$message.error(res.data.message || "删除失败");
              }
            })
            .catch((err) => {
              console.error("删除失败:", err);
              this.$message.error(err.response?.data?.message || "删除失败");
            })
            .finally(() => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    
    handleArrangespecified_classroom(row) {
      this.$prompt("请输入教室安排", "排课", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: row.specified_classroom || "",
      })
        .then(({ value }) => {
          this.loading = true;
          const arrangeData = {
            id: row.id,
            specified_classroom: value,
            specified_building: row.specified_building || "",
            specified_time: row.specified_time || "",
            opening_week_hours: row.opening_week_hours || "",
            continuous_periods: row.continuous_periods || ""
          };
          
          axios.post(`${this.serverUrl}${this.schedulePrefix}/arrange`, arrangeData)
            .then((res) => {
              if (res.data.status === 200) {
                this.$message.success("排课成功");
                this.handleGetSchedules();
                this.handleGetArrangedSchedules();
              } else {
                this.$message.error(res.data.message || "排课失败");
              }
            })
            .catch((err) => {
              console.error("排课失败:", err);
              this.$message.error(err.response?.data?.message || "排课失败");
            })
            .finally(() => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.$message.info("已取消排课");
        });
    },
    
    // handleAdjustSchedule(row) {
    //   this.$prompt("调整排课信息", "调整排课", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     inputValue: row.specified_classroom || "",
    //   })
    //     .then(({ value }) => {
    //       this.loadingArranged = true;
    //       const adjustData = {
    //         id: row.id,
    //         specified_classroom: value,
    //         specified_building: row.specified_building || "",
    //         specified_time: row.specified_time || "",
    //         opening_week_hours: row.opening_week_hours || "",
    //         continuous_periods: row.continuous_periods || ""
    //       };
          
    //       axios.put(`${this.serverUrl}${this.schedulePrefix}/adjust`, adjustData)
    //         .then((res) => {
    //           if (res.data.status === 200) {
    //             this.$message.success("调整成功");
    //             this.handleGetArrangedSchedules();
    //           } else {
    //             this.$message.error(res.data.message || "调整失败");
    //           }
    //         })
    //         .catch((err) => {
    //           console.error("调整失败:", err);
    //           this.$message.error(err.response?.data?.message || "调整失败");
    //         })
    //         .finally(() => {
    //           this.loadingArranged = false;
    //         });
    //     })
    //     .catch(() => {
    //       this.$message.info("已取消调整");
    //     });
    // },
    
    handleEditSubmit(newScheduleInfo) {
      this.loading = true;
      axios.put(`${this.serverUrl}${this.schedulePrefix}/update`, newScheduleInfo)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message.success("修改成功");
            this.handleGetSchedules();
            this.dialogVisible = false;
          } else {
            this.$message.error(res.data.message || "修改失败");
          }
        })
        .catch((err) => {
          console.error("修改失败:", err);
          this.$message.error(err.response?.data?.message || "修改失败");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    // 分页
    handleCurrentChange(newValue) {
      this.Pagi.current = newValue;
    },
    
    handleSizeChange(newSize) {
      this.Pagi.pageSize = newSize;
      this.Pagi.current = 1;
    },
    
    // 筛选相关方法
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
              this.tagsList[index].value = `${typeName}：${this.list[listProp][command]}`;
            }
          }
        }
      };

      let activeItems, tagIdIndex, list, searchList;
      switch (type) {
        case "hoursType":
          activeItems = this.filter.hoursType.activeHoursTypeItems;
          tagIdIndex = this.startOffset;
          list = this.list.hoursTypeList;
          searchList = this.filter.hoursType.searchHoursType;
          break;
        case "nature":
          activeItems = this.filter.nature.activeNatureItems;
          tagIdIndex = this.filter.nature.natureTagIdIndex;
          list = this.list.natureList;
          searchList = this.filter.nature.searchNature;
          break;
        case "opening_campus":
          activeItems = this.filter.opening_campus.activeopening_campusItems;
          tagIdIndex = this.filter.opening_campus.opening_campusTagIdIndex;
          list = this.list.opening_campusList;
          searchList = this.filter.opening_campus.searchopening_campus;
          break;
        case "department":
          activeItems = this.filter.department.activeDepartmentItems;
          tagIdIndex = this.filter.department.departmentTagIdIndex;
          list = this.list.departmentList;
          searchList = this.filter.department.searchDepartment;
          break;
        case "specified_classroomType":
          activeItems = this.filter.specified_classroomType.activespecified_classroomTypeItems;
          tagIdIndex = this.filter.specified_classroomType.specified_classroomTypeTagIdIndex;
          list = this.list.specified_classroomTypeList;
          searchList = this.filter.specified_classroomType.searchspecified_classroomType;
          break;
        case "openingHours":
          handleTagLogic("openingHours", "sortList", "searchOpeningHours", "开课学时");
          return;
        case "schedulingHours":
          handleTagLogic("schedulingHours", "sortList", "searchSchedulingHours", "排课学时");
          return;
        case "totalHours":
          handleTagLogic("totalHours", "sortList", "searchTotalHours", "总学时");
          return;
        case "priority":
          handleTagLogic("priority", "sortList", "searchPriority", "排课优先级");
          return;
        case "classSize":
          handleTagLogic("classSize", "sortList", "searchClassSize", "班级人数");
          return;
        case "sessions":
          handleTagLogic("sessions", "sortList", "searchSessions", "连排节次");
          return;
        case "external":
          handleTagLogic("external", "yesNoList", "searchExternal", "是否外聘");
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
          type === "hoursType"
            ? "学时类型"
            : type === "nature"
            ? "课程性质"
            : type === "opening_campus"
            ? "开课校区"
            : type === "department"
            ? "开课院系"
            : type === "specified_classroomType"
            ? "教室类型"
            : ""
        }：${list[command]}`,
      };
      this.tagsList.push(tag);
      searchList.push(list[command]);

      if (!this.filter.curSearch.includes(type)) {
        this.filter.curSearch.push(type);
      }
    },
    
    // 文本输入筛选
    handleIdFilterInput(){
      this.handleTextFilterInput("id", "searchScheduleId", "排课编号", 0);
    },
    handleYearFilterInput() {
      this.handleTextFilterInput("year", "searchYear", "学年学期", 1);
    },
    
    handleCourseIdFilterInput() {
      this.handleTextFilterInput("courseId", "searchId", "课程编号", 2);
    },
    
    handleCourseNameFilterInput() {
      this.handleTextFilterInput("courseName", "searchName", "课程名称", 3);
    },
    
    handleTeacherIdFilterInput() {
      this.handleTextFilterInput("teacherId", "searchTeacherId", "教师工号", 4);
    },
    
    handleTeacherFilterInput() {
      this.handleTextFilterInput("teacher", "searchTeacher", "任课教师", 5);
    },
    
    handleClassCompFilterInput() {
      this.handleTextFilterInput("classComp", "searchClassComp", "教学班组成", 6);
    },
    
    handleClassIdFilterInput() {
      this.handleTextFilterInput("classId", "searchClassId", "教学班编号", 7);
    },
    
    handleAffiliationFilterInput() {
      this.handleTextFilterInput("affiliation", "searchAffiliation", "课程归属", 8);
    },
    
    handleClassNameFilterInput() {
      this.handleTextFilterInput("className", "searchClassName", "教学班名称", 9);
    },
    
    handleWeekHoursFilterInput() {
      this.handleTextFilterInput("weekHours", "searchWeekHours", "开课周次学时", 10);
    },
    
    handlespecified_classroomFilterInput() {
      this.handleTextFilterInput("specified_classroom", "searchspecified_classroom", "指定教室", 11);
    },
    
    handlespecified_buildingFilterInput() {
      this.handleTextFilterInput("specified_building", "searchspecified_building", "指定教学楼", 12);
    },
    
    handleTimeFilterInput() {
      this.handleTextFilterInput("time", "searchTime", "指定时间", 13);
    },
    
    handleTextFilterInput(filterProp, searchProp, typeName, tagId) {
      if (this.tagsList.length >= this.tagsNum) {
        this.$message.warning("添加的筛选数量已达上限，请删除一些再添加");
        return;
      }
      
      const index = this.filter.curSearch.findIndex((item) => item === filterProp);
      const tagIndex = this.tagsList.findIndex((item) => item.id === tagId);
      
      // 输入为空时移除筛选
      if (index != -1 && !this.filter[filterProp][searchProp]) {
        this.filter.curSearch.splice(index, 1);
        if (tagIndex != -1) {
          this.tagsList.splice(tagIndex, 1);
        }
        return;
      }
      
      // 已有筛选时更新标签
      if (index != -1) {
        if (tagIndex != -1) {
          this.tagsList[tagIndex].value = `${typeName}：${this.filter[filterProp][searchProp]}`;
        }
        return;
      }
      
      // 新筛选时添加标签
      if (this.filter[filterProp][searchProp]) {
        this.filter.curSearch.push(filterProp);
        const tag = {
          id: tagId,
          value: `${typeName}：${this.filter[filterProp][searchProp]}`,
        };
        this.tagsList.push(tag);
      }
    },
    
    // 数据筛选
    filterTableData() {
      let filteredData = this.tableData;
      
      const filterByString = (data, searchValue, property) => {
        if (!searchValue) return data;
        return data.filter((item) =>
          String(item[property] || '').toLowerCase().includes(searchValue.toLowerCase())
        );
      };
      
      const filterByArray = (data, searchArray, property) => {
        if (!searchArray || searchArray.length === 0) return data;
        return data.filter((item) =>
          searchArray.some((value) =>
            String(item[property] || '').toLowerCase().includes(value.toLowerCase())
          )
        );
      };
      
      const sortByValue = (data, searchValue, property) => {
        if (searchValue === undefined) return data;
        return [...data].sort((a, b) => {
          const valueA = a[property] || 0;
          const valueB = b[property] || 0;
          return searchValue ? valueA - valueB : valueB - valueA;
        });
      };

      for (let item of this.filter.curSearch) {
        switch (item) {
          case "id":
            filteredData = filterByString(filteredData, this.filter.id.searchScheduleId, "id");
            break;
          case "year":
            filteredData = filterByString(filteredData, this.filter.year.searchYear, "semester");
            break;
          case "courseId":
            filteredData = filterByString(filteredData, this.filter.courseId.searchId, "course_id");
            break;
          case "courseName":
            filteredData = filterByString(filteredData, this.filter.courseName.searchName, "course_name");
            break;
          case "teacherId":
            filteredData = filterByString(filteredData, this.filter.teacherId.searchTeacherId, "teacher_id");
            break;
          case "teacher":
            filteredData = filterByString(filteredData, this.filter.teacher.searchTeacher, "teacher_name");
            break;
          case "classComp":
            filteredData = filterByString(filteredData, this.filter.classComp.searchClassComp, "teaching_class");
            break;
          case "classId":
            filteredData = filterByString(filteredData, this.filter.classId.searchClassId, "teaching_class_number");
            break;
          case "affiliation":
            filteredData = filterByString(filteredData, this.filter.affiliation.searchAffiliation, "course_affiliation");
            break;
          case "className":
            filteredData = filterByString(filteredData, this.filter.className.searchClassName, "teaching_class_name");
            break;
          case "weekHours":
            filteredData = filterByString(filteredData, this.filter.weekHours.searchWeekHours, "opening_week_hours");
            break;
          case "specified_classroom":
            filteredData = filterByString(filteredData, this.filter.specified_classroom.searchspecified_classroom, "specified_classroom");
            break;
          case "specified_building":
            filteredData = filterByString(filteredData, this.filter.specified_building.searchspecified_building, "specified_building");
            break;
          case "time":
            filteredData = filterByString(filteredData, this.filter.time.searchTime, "specified_time");
            break;
          case "hoursType":
            filteredData = filterByArray(filteredData, this.filter.hoursType.searchHoursType, "hour_type");
            break;
          case "nature":
            filteredData = filterByArray(filteredData, this.filter.nature.searchNature, "course_nature");
            break;
          case "opening_campus":
            filteredData = filterByArray(filteredData, this.filter.opening_campus.searchopening_campus, "opening_campus");
            break;
          case "department":
            filteredData = filterByArray(filteredData, this.filter.department.searchDepartment, "department");
            break;
          case "specified_classroomType":
            filteredData = filterByArray(filteredData, this.filter.specified_classroomType.searchspecified_classroomType, "specified_specified_classroom_type");
            break;
          case "openingHours":
            filteredData = sortByValue(filteredData, this.filter.openingHours.searchOpeningHours, "opening_hours");
            break;
          case "schedulingHours":
            filteredData = sortByValue(filteredData, this.filter.schedulingHours.searchSchedulingHours, "scheduling_hours");
            break;
          case "totalHours":
            filteredData = sortByValue(filteredData, this.filter.totalHours.searchTotalHours, "total_hours");
            break;
          case "priority":
            filteredData = sortByValue(filteredData, this.filter.priority.searchPriority, "scheduling_priority");
            break;
          case "classSize":
            filteredData = sortByValue(filteredData, this.filter.classSize.searchClassSize, "teaching_class_size");
            break;
          case "sessions":
            filteredData = sortByValue(filteredData, this.filter.sessions.searchSessions, "continuous_periods");
            break;
          case "external":
            if (this.filter.external.searchExternal === undefined) break;
            filteredData = filteredData.filter(item => 
              item.is_external === (this.filter.external.searchExternal === 0)
            );
            break;
          default:
            break;
        }
      }
      
      this.Pagi.total = filteredData.length;
      const start = (this.Pagi.current - 1) * this.Pagi.pageSize;
      const end = Math.min(start + this.Pagi.pageSize, this.Pagi.total);
      return filteredData.slice(start, end);
    },
    
    // 标签管理
    handleCloseTag(targetItem) {
      this.tagsList = this.tagsList.filter((item) => item.id !== targetItem.id);
      
      // 文本输入类型的标签
      const textFilterMap = {
        0: { prop: "id", key: "searchScheduleId" },
        1: { prop: "year", key: "searchYear" },
        2: { prop: "courseId", key: "searchId" },
        3: { prop: "courseName", key: "searchName" },
        4: { prop: "teacherId", key: "searchTeacherId" },
        5: { prop: "teacher", key: "searchTeacher" },
        6: { prop: "classComp", key: "searchClassComp" },
        7: { prop: "classId", key: "searchClassId" },
        8: { prop: "affiliation", key: "searchAffiliation" },
        9: { prop: "className", key: "searchClassName" },
        10: { prop: "weekHours", key: "searchWeekHours" },
        11: { prop: "specified_classroom", key: "searchspecified_classroom" },
        12: { prop: "specified_building", key: "searchspecified_building" },
        13: { prop: "time", key: "searchTime" }
      };
      
      if (textFilterMap[targetItem.id]) {
        const { prop, key } = textFilterMap[targetItem.id];
        this.filter[prop][key] = "";
        this.removeFromCurSearch(prop);
        return;
      }
      
      // 下拉选择类型的标签
      const dropdownFilterMap = {
        [this.filter.hoursType.hoursTypeTagIdIndex]: { 
          prop: "hoursType", 
          list: "hoursTypeList",
          key: "searchHoursType",
          active: "activeHoursTypeItems"
        },
        [this.filter.nature.natureTagIdIndex]: { 
          prop: "nature", 
          list: "natureList",
          key: "searchNature",
          active: "activeNatureItems"
        },
        [this.filter.opening_campus.opening_campusTagIdIndex]: { 
          prop: "opening_campus", 
          list: "opening_campusList",
          key: "searchopening_campus",
          active: "activeopening_campusItems"
        },
        [this.filter.department.departmentTagIdIndex]: { 
          prop: "department", 
          list: "departmentList",
          key: "searchDepartment",
          active: "activeDepartmentItems"
        },
        [this.filter.specified_classroomType.specified_classroomTypeTagIdIndex]: { 
          prop: "specified_classroomType", 
          list: "specified_classroomTypeList",
          key: "searchspecified_classroomType",
          active: "activespecified_classroomTypeItems"
        }
      };
      
      for (const [startId, config] of Object.entries(dropdownFilterMap)) {
        const endId = parseInt(startId) + this.list[config.list].length;
        if (targetItem.id >= startId && targetItem.id < endId) {
          const item = targetItem.value.split("：")[1];
          this.handleDeleteMulSelectFilter(config.prop, item, config);
          return;
        }
      }
      
      // 排序和是否类型的标签
      const otherFilterMap = {
        [this.filter.openingHours.openingHoursTagIdIndex]: { prop: "openingHours", key: "searchOpeningHours" },
        [this.filter.schedulingHours.schedulingHoursTagIdIndex]: { prop: "schedulingHours", key: "searchSchedulingHours" },
        [this.filter.totalHours.totalHoursTagIdIndex]: { prop: "totalHours", key: "searchTotalHours" },
        [this.filter.priority.priorityTagIdIndex]: { prop: "priority", key: "searchPriority" },
        [this.filter.classSize.classSizeTagIdIndex]: { prop: "classSize", key: "searchClassSize" },
        [this.filter.sessions.sessionsTagIdIndex]: { prop: "sessions", key: "searchSessions" },
        [this.filter.external.externalTagIdIndex]: { prop: "external", key: "searchExternal" }
      };
      
      for (const [id, config] of Object.entries(otherFilterMap)) {
        const endId = parseInt(id) + (config.prop === "external" ? this.list.yesNoList.length : this.list.sortList.length);
        if (targetItem.id >= id && targetItem.id < endId) {
          this.filter[config.prop][config.key] = undefined;
          this.removeFromCurSearch(config.prop);
          return;
        }
      }
    },
    
    removeFromCurSearch(prop) {
      const index = this.filter.curSearch.indexOf(prop);
      if (index !== -1) {
        this.filter.curSearch.splice(index, 1);
      }
    },
    
    handleDeleteMulSelectFilter(cate, item, config) {
      const searchItems = this.filter[cate][config.key];
      const activeItems = this.filter[cate][config.active];
      const Items = this.list[config.list];
      
      // 从筛选数组中去除
      const itemIndex = searchItems.findIndex((i) => i == item);
      if (itemIndex == -1) return;
      searchItems.splice(itemIndex, 1);
      
      // 从active...数组中去除
      const activeIndex = Items.findIndex((i) => i == item);
      if (activeIndex == -1) return;
      activeItems[activeIndex] = false;
      
      // 如果该类别没有可供筛选的item，不进行筛选
      if (searchItems.length == 0) {
        this.removeFromCurSearch(cate);
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
          }
        });
      }
    },
    
    handleClearTags() {
      // 清空所有筛选条件
      Object.keys(this.filter).forEach(key => {
        if (typeof this.filter[key] === 'object' && this.filter[key] !== null) {
          if (Array.isArray(this.filter[key])) {
            this.filter[key] = [];
          } else {
            Object.keys(this.filter[key]).forEach(subKey => {
              if (subKey.startsWith('search')) {
                if (Array.isArray(this.filter[key][subKey])) {
                  this.filter[key][subKey] = [];
                } else {
                  this.filter[key][subKey] = '';
                }
              }
              if (subKey.startsWith('active') && Array.isArray(this.filter[key][subKey])) {
                this.filter[key][subKey].fill(false);
              }
            });
          }
        }
      });
      
      this.filter.curSearch = [];
      this.tagsList = [];
      this.$message.success("已清空所有筛选条件");
    }
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
  display: flex;
  flex-direction: column;
}

.result-section {
  padding: 20px;
}

.table-tag {
  display: flex;
  flex: 1;
}

.table-section {
  width: 85%;
  padding-right: 10px;
  overflow-x: auto;
}

.tags {
  width: 214px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-height: 630px;
  overflow-y: auto;
}

.tags-reset {
  display: flex;
  justify-content: center;
  width: 214px;
}

::v-deep.el-table td,
::v-deep.el-table th {
  padding: 10px;
}

.header-font {
  font-size: 16px;
}

/* 响应式调整 */
@media screen and (max-width: 1600px) {
  .table-section {
    width: 80%;
  }
  
  .tags {
    width: 180px;
  }
}

@media screen and (max-width: 1400px) {
  .table-section {
    width: 75%;
  }
  
  .tags {
    width: 150px;
  }
}

@media screen and (max-width: 1200px) {
  .table-tag {
    flex-direction: column;
  }
  
  .table-section {
    width: 100%;
    padding-right: 0;
  }
  
  .tags {
    width: 100%;
    min-height: auto;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .tags-reset {
    width: 100%;
    margin-top: 10px;
  }
}
</style>