<template>
  <div style="position: relative; display: flex">
    <!-- 节次显示区域 -->
    <div style="width: 100px; margin-top: 180px">
      <div
        v-for="option in classOptions"
        :key="option.value"
        style="
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <el-tag>{{ option.label }}</el-tag>
      </div>
    </div>
    <!-- 日历和其他区域 -->
    <div style="flex: 1; position: relative">
      <!-- 条件选择区域 -->
      <div style="margin-top: 15px; margin-bottom: 30px">
        <el-autocomplete
          style="width: 600px"
          v-model="schedule.id"
          :fetch-suggestions="getFetchSuggestions"
          :placeholder="getPlaceholderStr"
          @select="handleDimenItemSelect"
        >
          <template slot-scope="{ item }">
            <div class="autocomplete-item">
              <el-tag>{{ item.id }}</el-tag>
              <span class="name">{{ item.name }}</span>
            </div>
          </template>
          <el-select
            v-model="selectedDimen"
            slot="prepend"
            style="width: 130px"
            placeholder="请选择类型"
          >
            <el-option label="教师" :value="1"></el-option>
            <el-option label="教室" :value="2"></el-option>
            <el-option label="班级" :value="3"></el-option>
            <!-- 新增的班级选项 -->
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-autocomplete>
        <span style="margin-left: 30px; margin-right: 10px">学期</span>
        <el-select v-model="schedule.semester" placeholder="请选择学期">
          <el-option
            v-for="item in semesterOptions"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
        <el-button type="primary" plain @click="handleSearchOut"
          >查询课表</el-button
        >
      </div>
      <!-- 日历区域 -->
      <FullCalendar :options="calendarOptions" ref="calendarRef" />
      <!-- 课程dialog区域 -->
      <el-dialog
        title="课程安排"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <el-form :model="scheduleInfo" ref="formRef">
          <!-- <el-form-item label="课程编号" prop="id">
            <el-input v-model="scheduleInfo.id" style="width: 600px"></el-input>
          </el-form-item>
          <el-form-item label="课程名称" prop="name">
            <el-autocomplete
              style="width: 600px"
              v-model="scheduleInfo.name"
              :fetch-suggestions="queryCourseNameSearchAsync"
              placeholder="请输入课程名称"
              @select="handleCourseNameSelect"
            >
              <template slot-scope="{ item }">
                <div class="autocomplete-item">
                  <el-tag>{{ item.course_id }}</el-tag>
                  <span class="name">{{ item.course_name }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="授课教师" prop="teacher">
            <el-autocomplete
              style="width: 600px"
              v-model="scheduleInfo.teacher"
              :fetch-suggestions="queryTeacherSearchAsync"
              placeholder="请输入授课教师"
              @select="handleDialogTeacherSelect"
            >
              <template slot-scope="{ item }">
                <div class="autocomplete-item">
                  <el-tag>{{ item.id }}</el-tag>
                  <span class="name">{{ item.name }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item> -->

          <el-form-item label="排课编号" prop="id">
            <el-autocomplete
              style="width: 600px"
              v-model="scheduleInfo.id"
              :fetch-suggestions="queryScheduleSearchAsync"
              placeholder="请输入排课编号"
              @select="handleDialogScheduleSelect"
            >
              <template slot-scope="{ item }">
                <div class="autocomplete-item">
                  <el-tag>{{ item.id }}</el-tag>
                  <span class="name">{{ item.course_name }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="授课地点" prop="classroom">
            <el-autocomplete
              style="width: 600px"
              v-model="scheduleInfo.classroom"
              :fetch-suggestions="queryClassroomSearchAsync"
              placeholder="请输入授课地点"
              @select="handleClassroomSelect"
            >
              <template slot-scope="{ item }">
                <div class="autocomplete-item">
                  <el-tag>{{ item.id }}</el-tag>
                  <span class="name">{{ item.name }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>

          <!-- 节次区域 -->
          <div style="display: flex; flex-wrap: wrap; gap: 30px">
            <!-- 开始节次 -->
            <el-form-item
              prop="startClass"
              style="flex: 1; min-width: 150px; max-width: 30%"
            >
              <el-select
                v-model="scheduleInfo.startClass"
                placeholder="请选择开始节次"
                @change="validateSelection"
              >
                <el-option
                  v-for="item in classOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <span
              style="display: inline-block; line-height: 32px; font-size: 16px"
              >至</span
            >
            <!-- 结束节次 -->
            <el-form-item
              prop="endClass"
              style="flex: 1; min-width: 150px; max-width: 30%"
            >
              <el-select
                v-model="scheduleInfo.endClass"
                placeholder="请选择结束节次"
                @change="validateSelection"
              >
                <el-option
                  v-for="item in classOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 周数区域 -->
          <div style="display: flex; flex-wrap: wrap; gap: 30px">
            <!-- 开始周数 -->
            <el-form-item
              prop="startWeekNumber"
              style="flex: 1; min-width: 150px; max-width: 30%"
            >
              <el-select
                v-model="scheduleInfo.startWeekNumber"
                placeholder="请选择开始周数"
                @change="validateWeekNumberSelection"
              >
                <el-option
                  v-for="item in weekNumberOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <span
              style="display: inline-block; line-height: 32px; font-size: 16px"
              >至</span
            >
            <!-- 结束周数 -->
            <el-form-item
              prop="endWeekNumber"
              style="flex: 1; min-width: 150px; max-width: 30%"
            >
              <el-select
                v-model="scheduleInfo.endWeekNumber"
                placeholder="请选择结束周数"
                @change="validateWeekNumberSelection"
              >
                <el-option
                  v-for="item in weekNumberOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <!-- 星期几选择框 -->
          <el-form-item label="星期几" prop="selectedWeekDay">
            <el-select
              v-model="scheduleInfo.selectedWeekDay"
              placeholder="请选择星期几"
              @change="validateWeekDaySelection"
            >
              <el-option
                v-for="item in weekDayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleSubmitSchedule">提交</el-button>
            <el-button @click="handleClose">取消</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 点击日程后的popover弹出框区域 -->
      <el-popover
        v-model="popoverVisible"
        :style="{
          left: popoverLeft + 'px',
          top: popoverTop + 'px',
          position: 'absolute',
        }"
        placement="bottom"
        trigger="manual"
        :title="selectedEvent.title"
        width="200"
      >
        <div class="popover-content">
          <div class="popover-text">
            教室编号：{{
              (selectedEvent.extendedProps &&
                selectedEvent.extendedProps.classroom_id) ||
              ""
            }}
          </div>
          <div class="button-group">
            <el-button type="text" @click="handleModifyFocusEvent"
              >编辑</el-button
            >
            <el-button type="text" @click="handleDeleteFocusEvent"
              >删除</el-button
            >
          </div>
        </div>
      </el-popover>
      <!-- 遮罩层区域 -->
      <div
        v-if="popoverVisible"
        v-click-outside="closePopover"
        class="popover-mask"
      ></div>
    </div>
  </div>
</template>

<script>
import {
  SERVER_URL,
  COURSE_PREFIX,
  TEACHER_PREFIX,
  CLASSROOM_PREFIX,
  CLASS_PREFIX,
} from "@config";
import axios from "axios";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { addWeeks, getISOWeek } from "date-fns";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      serverUrl: SERVER_URL,
      coursePrefix: COURSE_PREFIX,
      teacherPrefix: TEACHER_PREFIX,
      classroomPrefix: CLASSROOM_PREFIX,
      classPrefix: CLASS_PREFIX,
      startDate: new Date(2025, 2, 3),
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "timeGridWeek", // 开始时的视图为周视图
        firstDay: 1, // 设置一周从星期一开始
        selectable: true, // 可框选日期格子
        editable: true, // 可编辑
        allDaySlot: false, // 隐藏全天事件栏
        headerToolbar: {
          left: "prev,next today",
          center: "customTitle",
          right: "timeGridWeek",
        },
        events: [
          { title: "Event 1", date: "2025-03-20" },
          {
            title: "Event 2",
            start: "2025-03-31T08:00:00",
            end: "2025-03-31T09:00:00",
          },
        ],
        contentHeight: "auto", // 动态调整高度
        validRange: this.calculateDateRange(), // 计算日期范围
        select: this.handleSelect, // 选择时间段时触发的回调函数
        eventClick: this.handleClickEvent, // 点击日程的回调函数
        customButtons: {
          // 自定义按钮
          customTitle: {
            // 自定义标题
            text: this.getWeekNumberTitle(),
            click: function () {},
          },
        },
        datesSet: (info) => {
          // 当日期改变时更新标题
          const newTitle = this.getWeekNumberTitle(info.start);
          this.$nextTick(() => {
            const customTitleElement = this.$refs.calendarRef.$el.querySelector(
              ".fc-customTitle-button"
            );
            if (customTitleElement) {
              customTitleElement.textContent = newTitle;
            }
          });
        },
        eventDrop: this.handleEventDrop,
        slotDuration: "01:00",
        slotMinTime: "08:00",
        slotMaxTime: "16:00",
        slotLabelFormat: {
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: false,
          // 自定义格式化函数，将时间点字符串置为空
          formatter: function () {
            return "";
          },
        },
        slotLabelClassNames: "fc-hour-height",
      },
      classOptions: [
        //节次选项
        { value: 1, label: "第1节课" },
        { value: 2, label: "第2节课" },
        { value: 3, label: "第3节课" },
        { value: 4, label: "第4节课" },
        { value: 5, label: "第5节课" },
        { value: 6, label: "第6节课" },
        { value: 7, label: "第7节课" },
        { value: 8, label: "第8节课" },
      ],
      classTimeMapping: [
        {
          class: 1,
          start: { hour: 8, minute: 0 },
          end: { hour: 9, minute: 0 },
        },
        {
          class: 2,
          start: { hour: 9, minute: 0 },
          end: { hour: 10, minute: 0 },
        },
        {
          class: 3,
          start: { hour: 10, minute: 0 },
          end: { hour: 11, minute: 0 },
        },
        {
          class: 4,
          start: { hour: 11, minute: 0 },
          end: { hour: 12, minute: 0 },
        },
        {
          class: 5,
          start: { hour: 12, minute: 0 },
          end: { hour: 13, minute: 0 },
        },
        {
          class: 6,
          start: { hour: 13, minute: 0 },
          end: { hour: 14, minute: 0 },
        },
        {
          class: 7,
          start: { hour: 14, minute: 0 },
          end: { hour: 15, minute: 0 },
        },
        {
          class: 8,
          start: { hour: 15, minute: 0 },
          end: { hour: 16, minute: 0 },
        },
      ],
      selectedDimen: null, //维度：教师/教室
      searchKeyWord: "", //搜索关键字
      schedule: {
        // id: "0558",
        // semester: "2024-2025-1",
        id: null,
        semester: null,
      },
      isModify: false,
      isOpeningPopover: false,
      popoverLeft: 0,
      popoverTop: 0,
      popoverVisible: false,
      curInfo: {},
      curScheduleDetail: {},
      selectedEvent: {},
      scheduleInfo: {
        id: "",
        classroom: null,
        endClass: null, //结束节次
        startClass: null, //开始节次
        startWeekNumber: null, // 开始周数
        endWeekNumber: null, // 结束周数
        selectedWeekDay: null, // 选中的星期几
      },
      dialogVisible: false,
      state: "",
      weekNumberOptions: [], // 周数选项数组，后续根据实际情况填充
      weekDayOptions: [
        { value: 1, label: "星期一" },
        { value: 2, label: "星期二" },
        { value: 3, label: "星期三" },
        { value: 4, label: "星期四" },
        { value: 5, label: "星期五" },
        { value: 6, label: "星期六" },
        { value: 7, label: "星期日" },
      ], // 星期几选项数组
      semesterOptions: [
        {
          value: 1,
          label: "2024-2025-1",
        },
        {
          value: 2,
          label: "2024-2025-2",
        },
      ],
      tableData: [],
    };
  },
  mounted() {
    // 初始化周数选项
    for (let i = 1; i <= 16; i++) {
      this.weekNumberOptions.push({ value: i, label: `第 ${i} 周` });
    }
    this.calendar = this.$refs.calendarRef.getApi();
    this.$nextTick(() => {
      // 使用 CSS 选择器隐藏时间标签
      const timeLabels = document.querySelectorAll(
        ".fc-timegrid-slot-label-cushion"
      );
      timeLabels.forEach((label) => {
        label.textContent = "";
        // 强制设置宽度为 50px
        label.style.width = "50px";
      });
    });
  },
  computed: {
    getPlaceholderStr() {
      switch (this.selectedDimen) {
        case 0:
          return "请输入";
        case 1:
          return "请输入教师名";
        case 2:
          return "请输入教室";
        case 3: // 新增的 class 维度
          return "请输入班级";
        default:
          return "请输入";
      }
    },
    getCourseNameSearchUrl() {
      return `${this.serverUrl}${this.coursePrefix}/search`;
    },
    getClassSearchUrl() {
      return `${this.serverUrl}${this.classPrefix}/search`;
    },
    getTeacherSearchUrl() {
      return `${this.serverUrl}${this.teacherPrefix}/search`;
    },
    getAllSchedulesUrl() {
      return "http://localhost:8080/schedule/queryall";
    },
    getClassroomSearchUrl() {
      return `${this.serverUrl}${this.classroomPrefix}/search`;
    },
    getTeacherTableUrl() {
      return "http://localhost:8080/table/teacher";
    },
    getClassroomTableUrl() {
      return "http://localhost:8080/table/classroom";
    },
    getInsertScheduleResultUrl() {
      return "http://localhost:8080/table/create";
    },
    getModifyScheduleResultUrl() {
      return "http://localhost:8080/table/update";
    },
    isSearchOut() {
      return this.schedule.id !== undefined && this.schedule.semester;
    },
  },
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          // 获取 popover 元素
          const popoverEl = document.querySelector(".el-popover");
          if (
            popoverEl &&
            !popoverEl.contains(event.target) &&
            !vnode.context.isOpeningPopover
          ) {
            binding.value(event);
          }
          // 重置标志位
          vnode.context.isOpeningPopover = false;
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
  methods: {
    handleSearchOut() {
      if (!this.isSearchOut) {
        this.$message.error("请输入id或选择学期！！！");
        return;
      }
      this.fetchTable();
    },
    validateWeekNumberSelection() {
      // 若开始周数或结束周数为空，不进行校验
      if (
        !this.scheduleInfo.startWeekNumber ||
        !this.scheduleInfo.endWeekNumber
      ) {
        return;
      }
      // 检查开始周数是否大于结束周数
      if (this.scheduleInfo.startWeekNumber > this.scheduleInfo.endWeekNumber) {
        this.$message({
          type: "error",
          message: "开始周数不得大于结束周数",
        });
      }
    },
    validateWeekDaySelection() {
      // 可以在这里添加对星期几选择的其他验证逻辑
      if (!this.scheduleInfo.selectedWeekDay) {
        this.$message({
          type: "error",
          message: "请选择星期几",
        });
      }
    },
    getFetchSuggestions(queryString, cb) {
      if (this.selectedDimen === 1) {
        return this.queryTeacherSearchAsync(queryString, cb);
      } else if (this.selectedDimen === 2) {
        return this.queryClassroomSearchAsync(queryString, cb);
      } else if (this.selectedDimen === 3) {
        // 新增的 class 维度
        return this.queryClassSearchAsync(queryString, cb);
      }
    },
    handleDimenItemSelect(item) {
      this.schedule.id = item.id;
    },
    handleRenderTableData() {
      // 获取今年 3 月 3 日的日期对象
      const startDate = new Date(new Date().getFullYear(), 2, 3);
      // console.log(this.tableData);
      this.tableData.forEach((item) => {
        const weekNums = item.time_slots[0].WeekNumbers;
        const weekDay = item.time_slots[0].Weekday;
        const startPeriod = item.time_slots[0].StartPeriod;
        const duration = item.time_slots[0].Duration;
        // console.log(weekNums, weekDay, startPeriod, duration);

        // 遍历每个周数
        if (weekNums) {
          weekNums.forEach((weekNum) => {
            // 计算课程所在的日期
            const daysOffset = (weekNum - 1) * 7 + (weekDay - 1);
            const courseDate = new Date(startDate.getTime());
            courseDate.setDate(courseDate.getDate() + daysOffset);

            // 计算课程开始时间
            const startTime = new Date(courseDate.getTime());
            startTime.setHours(8 + startPeriod - 1);
            startTime.setMinutes(0);

            // 计算课程结束时间
            const endTime = new Date(startTime.getTime());
            endTime.setHours(endTime.getHours() + duration);

            const newEvent = {
              title: item.course_name,
              start: startTime,
              end: endTime,
              classroom_id: item.classroom_id,
              schedule_result_id: item.id,
              time_slots: item.time_slots,
            };
            if (!this.calendar.addEvent(newEvent)) {
              this.$message.error("初始化课表失败");
              return;
            }
          });
        }
      });
    },
    fetchTable() {
      this.calendar.removeAllEvents();
      let params;
      let url;
      switch (this.selectedDimen) {
        case 1:
          params = {
            teacher_id: this.schedule.id,
            semester: this.schedule.semester,
          };
          url = this.getTeacherTableUrl;
          break;
        case 2:
          params = {
            classroom_id: this.schedule.id,
            semester: this.schedule.semester,
          };
          url = this.getClassroomTableUrl;
          break;
        case 3: // 新增的 class 维度
          params = {
            class_id: this.schedule.id, // 假设接口参数是 class_id，根据实际情况调整
            semester: this.schedule.semester,
          };
          url = "http://localhost:8080/table/class"; // 假设获取班级课表的接口 URL，根据实际情况调整
          break;
        default:
          console.log("switch出错");
          return;
      }
      axios
        .get(url, { params })
        .then((response) => {
          this.tableData = response.data.ClassTables;
          if (!this.tableData || this.tableData.length === 0) {
            this.$message.error("查询课表失败！");
            this.calendar.removeAllEvents();
            return;
          }
          this.$message.success("查询课表成功");
          this.handleRenderTableData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validateSelection() {
      // 若开始节次或结束节次为空，不进行校验
      if (!this.scheduleInfo.startClass || !this.scheduleInfo.endClass) {
        return;
      }
      // 检查开始节次是否大于结束节次
      if (this.scheduleInfo.startClass > this.scheduleInfo.endClass) {
        this.$message({
          type: "error",
          message: "开始节次不得大于结束节次",
        });
      } else {
        // 根据选择的节次找到对应的时间映射
        const startMapping = this.classTimeMapping.find(
          (m) => m.class === this.scheduleInfo.startClass
        );
        const endMapping = this.classTimeMapping.find(
          (m) => m.class === this.scheduleInfo.endClass
        );

        // 更新 curInfo 中的开始时间和结束时间
        if (startMapping && endMapping) {
          const startDate = new Date(this.curInfo.start);
          startDate.setHours(startMapping.start.hour);
          startDate.setMinutes(startMapping.start.minute);

          const endDate = new Date(this.curInfo.end);
          endDate.setHours(endMapping.end.hour);
          endDate.setMinutes(endMapping.end.minute);

          this.curInfo.start = startDate;
          this.curInfo.end = endDate;
        }
      }
    },
    handleClose() {
      this.resetForm();
      this.dialogVisible = false;
    },
    handleModifyFocusEvent() {
      this.isModify = true;
      // console.log(this.curInfo);
      const eventInfo = this.curInfo.event.extendedProps;
      this.scheduleInfo.id = eventInfo.schedule_result_id.toString();
      this.scheduleInfo.classroom = eventInfo.classroom_id;
      this.scheduleInfo.startClass = eventInfo.time_slots[0].StartPeriod;
      this.scheduleInfo.endClass =
        eventInfo.time_slots[0].StartPeriod +
        eventInfo.time_slots[0].Duration -
        1;
      this.scheduleInfo.selectedWeekDay = eventInfo.time_slots[0].Weekday;
      if (eventInfo.time_slots[0].WeekNumbers) {
        this.scheduleInfo.startWeekNumber =
          eventInfo.time_slots[0].WeekNumbers[0];
        this.scheduleInfo.endWeekNumber =
          eventInfo.time_slots[0].WeekNumbers[
            eventInfo.time_slots[0].WeekNumbers.length - 1
          ];
      }

      this.dialogVisible = true;
    },
    handleDeleteFocusEvent() {
      this.popoverVisible = false;
      // console.log(this.curInfo)
      this.curInfo.event.remove();
      this.$message({
        message: "已删除",
        type: "warning",
      });
    },
    closePopover() {
      this.popoverVisible = false;
    },
    handleClickEvent(info) {
      // console.log(info);
      this.curInfo = info;
      const target = info.jsEvent.target;
      if (target) {
        const calendarEl = this.$refs.calendarRef.$el;
        const rect = target.getBoundingClientRect();
        const calendarRect = calendarEl.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        // 计算相对于 Calendar 元素的位置，将 popover 放在日程右侧
        this.popoverLeft = rect.right - calendarRect.left + scrollX;
        this.popoverTop = rect.top - calendarRect.top + scrollY;
      }
      this.popoverVisible = true;
      this.selectedEvent = info.event;
      // 设置标志位
      this.isOpeningPopover = true;
    },
    handleSubmitSchedule() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          //验证通过，执行正常逻辑
          const formData = {
            classroom_id: this.scheduleInfo.classroom,
            time_slots: [
              {
                week_numbers: Array.from(
                  {
                    length:
                      this.scheduleInfo.endWeekNumber -
                      this.scheduleInfo.startWeekNumber +
                      1,
                  },
                  (_, index) => index + this.scheduleInfo.startWeekNumber
                ),
                weekday: this.scheduleInfo.selectedWeekDay,
                start_period: this.scheduleInfo.startClass,
                duration:
                  this.scheduleInfo.endClass - this.scheduleInfo.startClass + 1,
              },
            ],
          };

          if (!this.isModify) {
            formData.schedule_id = Number(this.scheduleInfo.id);
            axios
              .post(this.getInsertScheduleResultUrl, formData)
              .then((res) => {
                // console.log(res);
                if (res.data.status === 200) {
                  this.$message.success("排课成功");
                  this.dialogVisible = false;
                } else {
                  this.$message.error("排课失败");
                  this.dialogVisible = false;
                }
              })
              .catch((err) => {
                const errStr = err.response.data.message
                  ? err.response.data.message
                  : "";
                // console.log(errStr);
                this.$msgbox({
                  title: "排课失败",
                  message: errStr,
                  type: "error",
                  confirmButtonText: "确定",
                })
                  .then(() => {})
                  .catch(() => {});
              });

            // if (!this.isModify) {
            //   const newEvent = {
            //     title: this.scheduleInfo.id,
            //     start: this.curInfo.start,
            //     end: this.curInfo.end,
            //   };
            //   if (this.calendar.addEvent(newEvent)) {
            //     this.dialogVisible = false;
            //     this.$message({
            //       type: "success",
            //       message: "添加成功",
            //     });
            //   } else {
            //     this.$message({
            //       type: "error",
            //       message: "添加失败",
            //     });
            //   }
            // } else {
            //   // console.log(this.curInfo.event)
            //   this.curInfo.event.setProp("title", this.scheduleInfo.id);
            //   this.handleResetCourseInfo();
            //   this.isModify = false;
            //   this.$message({
            //     message: "修改成功",
            //     type: "success",
            //   });
            // }
            // this.dialogVisible = false;
          } else {
            formData.schedule_result_id = Number(this.scheduleInfo.id);
            axios
              .put(this.getModifyScheduleResultUrl, formData)
              .then((res) => {
                // console.log(res);
                if (res.data.status === 200) {
                  this.$message.success("修改排课结果成功");
                  this.calendar.removeAllEvents();
                  this.fetchTable();
                } else {
                  this.$message.error("排课失败");
                  this.dialogVisible = false;
                }
              })
              .catch((err) => {
                // console.log(err);
                const errStr = err.response.data.message
                  ? err.response.data.message
                  : "";
                // console.log(errStr);
                this.$msgbox({
                  title: "排课失败",
                  message: errStr,
                  type: "error",
                  confirmButtonText: "确定",
                })
                  .then(() => {})
                  .catch(() => {});
              });
          }
        } else {
          //验证失败
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
    handleSelect(info) {
      this.dialogVisible = true;
      this.curInfo = info;
      info.view.calendar.unselect();

      const startHour = info.start.getHours();
      const startMinute = info.start.getMinutes();
      const endHour = info.end.getHours();
      const endMinute = info.end.getMinutes();

      let startClass = null;
      let endClass = null;

      // 遍历节次时间映射关系，找到匹配的开始节次和结束节次
      for (const mapping of this.classTimeMapping) {
        if (
          startHour === mapping.start.hour &&
          startMinute === mapping.start.minute
        ) {
          startClass = mapping.class;
        }
        if (endHour === mapping.end.hour && endMinute === mapping.end.minute) {
          endClass = mapping.class;
        }
      }

      this.scheduleInfo.startClass = startClass;
      this.scheduleInfo.endClass = endClass;
    },
    calculateDateRange() {
      // 计算有效日期范围
      const startDate = this.startDate; // 3 月 1 日，月份从 0 开始计数
      const endDate = addWeeks(startDate, 16);
      return {
        start: startDate,
        end: endDate,
      };
    },
    getWeekNumberTitle(date = new Date()) {
      // 重新计算基准周数
      const weekNumber =
        getISOWeek(date) - getISOWeek(new Date(2025, 2, 3)) + 1;
      this.weekNum = weekNumber;
      return `第 ${weekNumber} 周`;
    },
    handleEventDrop(info) {
      info.revert();
      // info 包含了事件移动前后的信息
      var event = info.event;
      console.log(event);
      const start = event.start;
      const end = event.end;
      const startDay = start.getDay();
      const startHour = start.getHours();
      const endDay = end.getDay();
      const endHour = end.getHours();
      let startClass = null;
      let endClass = null;
      // 查找开始节次
      for (const mapping of this.classTimeMapping) {
        if (startHour === mapping.start.hour) {
          startClass = mapping.class;
          break;
        }
      }
      // 查找结束节次
      for (const mapping of this.classTimeMapping) {
        if (endHour === mapping.end.hour) {
          endClass = mapping.class;
          break;
        }
      }
      // 计算持续节次数
      let duration = null;
      if (startClass !== null && endClass !== null) {
        duration = endClass - startClass + 1;
      }
      const eventInfo = event.extendedProps;
      const formData = {
        schedule_result_id: eventInfo.schedule_result_id,
        classroom_id: eventInfo.classroom_id,
        time_slots: [
          {
            week_numbers: eventInfo.time_slots[0].WeekNumbers,
            weekday: startDay,
            start_period: startClass,
            duration: duration,
          },
        ],
      };
      axios
        .put(this.getModifyScheduleResultUrl, formData)
        .then((res) => {
          // console.log(res);
          if (res.data.status === 200) {
            this.$message.success("修改排课结果成功");
            this.calendar.removeAllEvents();
            this.fetchTable();
          } else {
            this.$message.error("排课失败");
            this.dialogVisible = false;
          }
        })
        .catch((err) => {
          // console.log(err);
          const errStr = err.response.data.message
            ? err.response.data.message
            : "";
          // console.log(errStr);
          this.$msgbox({
            title: "排课失败",
            message: errStr,
            type: "error",
            confirmButtonText: "确定",
          })
            .then(() => {})
            .catch(() => {});
        });
    },
    queryClassSearchAsync(queryString, cb) {
      // 请求数据
      const queryParms = {
        search_str: queryString,
      };
      var names;
      axios
        .get(this.getClassSearchUrl, {
          params: queryParms,
        })
        .then((res) => {
          names = res.data.data.classes; // 假设接口返回的班级数据在 classes 字段下，根据实际情况调整
          var results = queryString ? names.filter((n) => n.id) : names;

          // console.log(results);
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          }, 3000 * Math.random());
        })
        .catch((err) => {
          console.log(err);
        });
    },
    queryCourseNameSearchAsync(queryString, cb) {
      // 请求数据
      const queryParms = {
        search_str: queryString,
      };
      var names;
      axios
        .get(this.getCourseNameSearchUrl, {
          params: queryParms,
        })
        .then((res) => {
          names = res.data.data.courses;
          var results = queryString
            ? names.filter(this.createStateFilter(queryString))
            : names;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          }, 3000 * Math.random());
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.course_name.toLowerCase().indexOf(queryString.toLowerCase()) !=
          -1
        );
      };
    },
    handleCourseNameSelect(item) {
      this.scheduleInfo.id = item.course_id;
      this.scheduleInfo.name = item.course_name;
    },
    queryTeacherSearchAsync(queryString, cb) {
      // 请求数据
      const queryParms = {
        search_str: queryString,
      };
      var names;
      axios
        .get(this.getTeacherSearchUrl, {
          params: queryParms,
        })
        .then((res) => {
          names = res.data.data.teachers;
          var results = queryString ? names.filter((n) => n.id) : names;

          // console.log(results);
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          }, 3000 * Math.random());
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDialogScheduleSelect(item) {
      // console.log(item);
      this.scheduleInfo.id = item.id.toString();
      this.curScheduleDetail = item;
    },
    queryScheduleSearchAsync(queryString, cb) {
      // 请求数据
      const queryParms = {
        search_str: queryString,
      };
      var names;
      axios
        .get(this.getAllSchedulesUrl, {
          params: queryParms,
        })
        .then((res) => {
          if (res.status === 200) {
            names = res.data.data.Schedules;
            // console.log(this.schedule.id);
            names = this.schedule.id
              ? names.filter((n) => n.teacher_id === this.schedule.id)
              : names;
            names = queryString
              ? names.filter((n) => n.id.toString().includes(queryString))
              : names;
            let results = queryString
              ? names.filter((n) => [n.id, n.course_name])
              : names;
            // console.log(results);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
              cb(results);
            }, 3000 * Math.random());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDialogTeacherSelect(item) {
      // console.log(item);
      this.scheduleInfo.teacher = item.name;
    },
    queryClassroomSearchAsync(queryString, cb) {
      // 请求数据
      const queryParms = {
        search_str: queryString,
      };
      var names;
      axios
        .get(this.getClassroomSearchUrl, {
          params: queryParms,
        })
        .then((res) => {
          names = res.data.data.classrooms;
          var results = queryString ? names.filter((n) => n.id) : names;

          // console.log(results);
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(results);
          }, 3000 * Math.random());
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClassroomSelect(item) {
      // console.log(item);
      this.scheduleInfo.classroom = item.id;
    },
  },
  beforeDestroy() {
    // 移除全局点击事件监听器
    document.body.removeEventListener("click", this.clickOutsideEvent);
  },
};
</script>

<style scoped>
.popover-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 998;
  /* 适当降低遮罩层的 z-index */
}

::v-deep .el-popover .popover-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;
  padding: 10px;
  /* 可以根据需要调整内边距 */
}

/* 新增按钮组样式 */
::v-deep .el-popover .button-group {
  display: flex;
  gap: 10px;
  /* 按钮之间的间距 */
}

::v-deep .el-popover {
  height: 150px;
  /* overflow-y: auto; */
  /* 如果内容超出高度，添加滚动条 */
}

.autocomplete-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

::v-deep .fc-hour-height {
  height: 60px; /* 调整格子高度 */
}

::v-deep .start-time {
  color: green;
  font-weight: bold;
}

::v-deep .end-time {
  color: red;
  font-style: italic;
}

::v-deep .fc-tooltip {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 12px;
  display: none;
  z-index: 1000;
}

::v-deep .start-time-slot {
  float: left;
}
::v-deep .end-time-slot {
  float: right;
}
</style>