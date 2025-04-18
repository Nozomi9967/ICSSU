<template>
  <div
    style="
      position: relative;
      display: flex;
      margin-top: 50px;
      padding-left: 100px;
      padding-right: 100px;
    "
  >
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
      <!-- 这段可以用来实现教师搜索查看自己的教学班级，然后查看教学班级的课表 -->
      <div style="margin-top: 15px; margin-bottom: 30px">
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
        <el-autocomplete
          style="width: 600px"
          v-model="schedule.id"
          :fetch-suggestions="getFetchSuggestions"
          placeholder="请绑定班级编号"
          @select="handleDimenItemSelect"
        >
          <template slot-scope="{ item }">
            <div class="autocomplete-item">
              <el-tag>{{ item.id }}</el-tag>
              <span class="name">{{ item.name }}</span>
            </div>
          </template>
        </el-autocomplete>

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
        <el-descriptions border>
          <el-descriptions-item label="学期">
            {{ selectedEvent.extendedProps?.semester || "暂无学期信息" }}
          </el-descriptions-item>
          <el-descriptions-item label="排课ID">
            {{ selectedEvent.extendedProps?.schedule_id || "暂无排课ID信息" }}
          </el-descriptions-item>
          <el-descriptions-item label="课程ID">
            {{ selectedEvent.extendedProps?.course_id || "暂无课程ID信息" }}
          </el-descriptions-item>
          <el-descriptions-item label="课程名称">
            {{ selectedEvent.extendedProps?.course_name || "暂无课程名称信息" }}
          </el-descriptions-item>
          <el-descriptions-item label="教师ID">
            {{ selectedEvent.extendedProps?.teacher_id || "暂无教师ID信息" }}
          </el-descriptions-item>
          <el-descriptions-item label="教师姓名">
            {{
              selectedEvent.extendedProps?.teacher_name || "暂无教师姓名信息"
            }}
          </el-descriptions-item>
          <el-descriptions-item label="教室ID">
            {{ selectedEvent.extendedProps?.classroom_id || "暂无教室ID信息" }}
          </el-descriptions-item>
          <el-descriptions-item label="班级ID">
            {{
              (selectedEvent.extendedProps?.class_ids || []).join(", ") ||
              "暂无班级ID信息"
            }}
          </el-descriptions-item>
          <el-descriptions-item label="班级名称">
            {{
              (selectedEvent.extendedProps?.class_name || []).join(", ") ||
              "暂无班级名称信息"
            }}
          </el-descriptions-item>
          <!-- 周数 -->
          <el-descriptions-item label="教学周数">
            {{
              selectedEvent?.extendedProps?.time_slots?.[0]?.WeekNumbers?.join(
                "、"
              ) || "未设置周数"
            }}
          </el-descriptions-item>

          <!-- 星期 -->
          <el-descriptions-item label="上课星期">
            {{
              selectedEvent?.extendedProps?.time_slots?.[0]?.Weekday ||
              "未设置星期"
            }}
          </el-descriptions-item>

          <!-- 节次 -->
          <el-descriptions-item label="开始节次">
            第{{
              selectedEvent?.extendedProps?.time_slots?.[0]?.StartPeriod || "?"
            }}节课
          </el-descriptions-item>

          <!-- 持续时间 -->
          <el-descriptions-item label="持续时长">
            {{
              selectedEvent?.extendedProps?.time_slots?.[0]?.Duration || "?"
            }}个课时
          </el-descriptions-item>
        </el-descriptions>
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
          <!-- 下面的这个div放点击课程后显示的关键信息 -->
          <div class="popover-text">
            教室编号：{{
              (selectedEvent.extendedProps &&
                selectedEvent.extendedProps.classroom_id) ||
              ""
            }}
            周数：{{
              (selectedEvent.extendedProps &&
                selectedEvent.extendedProps.time_slots[0].WeekNumbers.join(
                  ","
                )) ||
              ""
            }}
          </div>
          <div class="button-group">
            <el-button type="text" @click="handleDetail"
              >查看详细信息</el-button
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
} from "@config";
import { mapState } from "vuex";
import axios from "axios";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { addWeeks, startOfYear, getISOWeek } from "date-fns";

export default {
  name: "MyTable",
  components: {
    FullCalendar,
  },
  data() {
    return {
      serverUrl: SERVER_URL,
      coursePrefix: COURSE_PREFIX,
      teacherPrefix: TEACHER_PREFIX,
      classroomPrefix: CLASSROOM_PREFIX,
      startDate: new Date(2025, 2, 3),
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "timeGridWeek", // 开始时的视图为周视图
        firstDay: 1, // 设置一周从星期一开始
        selectable: true, // 可框选日期格子
        // editable: true, // 可编辑
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
      startClass: null, //开始节次
      endClass: null, //结束节次
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
      schedule: {
        id: undefined,
        semester: "2024-2025-1",
      },
      isOpeningPopover: false,
      popoverLeft: 0,
      popoverTop: 0,
      popoverVisible: false,
      curInfo: {},
      curScheduleDetail: {},
      monthMap: {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12,
      },
      scheduleInfo: {},
      dialogVisible: false,
      state: "",
      selectedEvent: {},
      startWeekNumber: null, // 开始周数
      endWeekNumber: null, // 结束周数
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
      selectedWeekDay: null, // 选中的星期几
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
    };
  },
  mounted() {
    // 初始化周数选项
    if (this.identity == 1) {
      this.schedule.id = this.username;
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
    getTeacherSearchUrl() {
      return `${this.serverUrl}${this.teacherPrefix}/search`;
    },
    getTeacherTableUrl() {
      return "http://localhost:8080/table/teacher";
    },
    getClassTableUrl() {
      return "http://localhost:8080/table/class";
    },
    getClassroomTableUrl() {
      return "http://localhost:8080/table/classroom";
    },
    getInsertScheduleResultUrl() {
      return "http://localhost:8080/table/create";
    },
    getSearchClassUrl() {
      return "http://localhost:8080/class/search";
    },
    ...mapState(["username", "identity"]),
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
    getFetchSuggestions(queryString, cb) {
      const url = `${this.getSearchClassUrl}?search_str=${
        queryString ? queryString : ""
      }`;
      axios
        .get(url)
        .then((response) => {
          // console.log(response);
          // 假设接口返回的数据格式为 { data: [] }，实际情况可能不同，需根据真实接口返回调整
          const suggestions = response.data.data.classes.map((item) => ({
            id: item.id,
            name: item.name,
          }));
          cb(suggestions);
        })
        .catch((error) => {
          console.error("获取建议数据失败", error);
          cb([]);
        });
    },
    // 新增方法：处理选择建议项的操作
    handleDimenItemSelect(item) {
      this.schedule.id = item.id;
      console.log(this.schedule);
    },
    handleDetail() {
      this.dialogVisible = true;
    },
    handleSearchOut() {
      if (this.identity == 1) {
        if (!this.schedule.semester) {
          this.$message.error("请选择学期！！！");
          return;
        }
      } else {
        if (!this.schedule.semester || !this.schedule.id) {
          this.$message.error("请绑定教学班级或选择学期！！！");
          return;
        }
      }
      this.fetchTable();
    },
    handleRenderTableData() {
      console.log("##");
      // 获取今年 3 月 3 日的日期对象
      const startDate = new Date(new Date().getFullYear(), 2, 3);
      // 这里是把获得的排课数据，渲染到calendar组件上
      this.tableData.forEach((item) => {
        const weekNums = item.time_slots[0].WeekNumbers;
        const weekDay = item.time_slots[0].Weekday;
        const startPeriod = item.time_slots[0].StartPeriod;
        const duration = item.time_slots[0].Duration;

        // 遍历每个周数
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
            ...item,
          };

          // if (this.calendar.addEvent(newEvent)) {
          //   console.log("添加成功");
          // } else {
          //   console.log("添加失败", newEvent);
          // }
          if (!this.calendar.addEvent(newEvent)) {
            this.$message.error("初始化课表失败");
            return;
          }
        });
      });
    },
    fetchTable() {
      // 获取排课数据的函数
      let params;
      let url;
      switch (this.identity) {
        case 1:
          params = {
            teacher_id: this.schedule.id,
            semester: this.schedule.semester,
          };
          url = this.getTeacherTableUrl;
          break;
        case 2:
          params = {
            class_id: this.schedule.id,
            semester: this.schedule.semester,
          };
          url = this.getClassTableUrl;
          break;
      }

      axios
        .get(url, { params })
        .then((response) => {
          console.log(response);
          this.tableData = response.data.ClassTables;
          if (!this.tableData || this.tableData.length === 0) {
            this.$message.error("查询课表失败！");
            this.calendar.removeAllEvents();
            return;
          }
          this.handleRenderTableData();

          this.$message.success("查询课表成功");
          this.error = null;
        })
        .catch((error) => {
          this.error = error.message;
          // this.tableData = null;
        });
    },
    handleClose(done) {
      this.dialogVisible = false;
    },
    closePopover() {
      this.popoverVisible = false;
    },
    handleClickEvent(info) {
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
      console.log(this.selectedEvent.extendedProps);
      // 设置标志位
      this.isOpeningPopover = true;
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