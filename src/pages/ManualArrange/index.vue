<template>
  <div style="position: relative;">
    <!-- 条件选择区域 -->
    <div style="margin-top: 15px;margin-bottom: 30px;">
      <el-input :placeholder="getPlaceholderStr" style="width: 70%;" v-model="searchKeyWord" class="input-with-select">
        <el-select v-model="selectedDimen" slot="prepend" style="width: 130px;" placeholder="请选择类型">
          <el-option label="教师" :value="1"></el-option>
          <el-option label="教室" :value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-select style="margin-left: 30px;" v-model="weekNum" placeholder="请选择周数">
        <el-option v-for="item in weekOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!-- 日历区域 -->
    <Calendar style="height: 700px" ref="calendarRef" :view="view" :use-detail-popup="false" :week="week"
      :calendars="calendars" :events="events" :usage-statistics="false" :time-zone=timezone
      @selectDateTime="onSelectDateTime" @beforeUpdateEvent="handleBeforeUpdateEvent" @clickEvent="handleClickEvent" />
    <!-- 课程dialog区域 -->
    <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="dialogVisible" width="60%"
      :before-close="handleClose">
      <el-form :model="courseInfo" ref="formRef">
        <el-form-item label="课程编号" prop="id">
          <el-input v-model="courseInfo.id"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="courseInfo.name"></el-input>
        </el-form-item>

        <!-- 节次区域 -->
        <div style="display: flex;flex-wrap: wrap;gap:30px">
          <!-- 开始节次 -->
          <el-form-item prop="startClass" style="flex: 1;min-width: 150px; max-width: 30%;">
            <el-select v-model="startClass" placeholder="请选择开始节次" @change="validateSelection">
              <el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <span style="display: inline-block; line-height: 32px;font-size: 16px;">至</span> -->
          <!-- 结束节次 -->
          <el-form-item prop="endClass" style="flex: 1;min-width: 150px; max-width: 30%;">
            <el-select v-model="endClass" placeholder="请选择结束节次" @change="validateSelection">
              <el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </div>
        <el-form-item>
          <el-button @click="handleCreateOrModifyEvent">提交</el-button>
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 点击日程后的popover弹出框区域 -->
    <el-popover v-model="popoverVisible"
      :style="{ left: popoverLeft + 'px', top: popoverTop + 'px', position: 'absolute' }" placement="bottom"
      trigger="manual" :title=selectedEvent.title width="200">
      <div class="popover-content">
        <div class="popover-text">{{ selectedEvent.location }}</div>
        <div class="button-group">
          <el-button type="text" @click="handleModifyFocusEvent">编辑</el-button>
          <el-button type="text" @click="handleDeleteFocusEvent">删除</el-button>
        </div>
      </div>
    </el-popover>
    <!-- 遮罩层区域 -->
    <div v-if="popoverVisible" v-click-outside="closePopover" class="popover-mask"></div>
  </div>
</template>

<script>
import Calendar from '@toast-ui/vue-calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
class Time {
  constructor(hour = 0, minute = 0) {
    this.hour = Math.min(23, Math.max(0, hour));
    this.minute = Math.min(59, Math.max(0, minute));
  }

  getFormattedTime() {
    const formattedHour = this.hour.toString().padStart(2, '0');
    const formattedMinute = this.minute.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  }

  // 比较时分大小的函数
  compareTo(otherTime) {
    if (this.hour > otherTime.hour) {
      return 1;
    } else if (this.hour < otherTime.hour) {
      return -1;
    } else {
      if (this.minute > otherTime.minute) {
        return 1;
      } else if (this.minute < otherTime.minute) {
        return -1;
      } else {
        return 0;
      }
    }
  }

  subtract(otherTime) {
    const thisTotalMinutes = this.hour * 60 + this.minute;
    const otherTotalMinutes = otherTime.hour * 60 + otherTime.minute;
    return thisTotalMinutes - otherTotalMinutes;
  }
}
export default {
  components: {
    Calendar
  },
  data() {
    return {
      weekNum: {//周数，默认为1
        value: '1',
        label: '第一周'
      },
      weekOptions: [{//周数选项
        value: '1',
        label: '第一周'
      }, {
        value: '2',
        label: '第二周'
      }, {
        value: '3',
        label: '第三周'
      }, {
        value: '4',
        label: '第四周'
      }, {
        value: '5',
        label: '第五周'
      }, {
        value: '6',
        label: '第六周'
      }, {
        value: '7',
        label: '第七周'
      }, {
        value: '8',
        label: '第八周'
      }, {
        value: '9',
        label: '第九周'
      }, {
        value: '10',
        label: '第十周'
      }, {
        value: '11',
        label: '第十一周'
      }, {
        value: '12',
        label: '第十二周'
      }, {
        value: '13',
        label: '第十三周'
      }, {
        value: '14',
        label: '第十四周'
      }, {
        value: '15',
        label: '第十五周'
      }, {
        value: '16',
        label: '第十六周'
      }],
      startClass: null,//开始节次
      endClass: null,//结束节次
      classOptions: [//节次选项
        { value: 1, label: '第1节课' },
        { value: 2, label: '第2节课' },
        { value: 3, label: '第3节课' },
        { value: 4, label: '第4节课' },
        { value: 5, label: '第5节课' },
        { value: 6, label: '第6节课' },
        { value: 7, label: '第7节课' },
        { value: 8, label: '第8节课' },
        { value: 9, label: '第9节课' },
        { value: 10, label: '第10节课' },
        { value: 11, label: '第11节课' },
        { value: 12, label: '第12节课' },
      ],
      timeDivision: [
        // 上午
        { start: new Time(8, 5), end: new Time(8, 50) },
        { start: new Time(8, 55), end: new Time(9, 40) },
        { start: new Time(10, 0), end: new Time(10, 45) },
        { start: new Time(10, 50), end: new Time(11, 35) },
        // 下午
        { start: new Time(14, 20), end: new Time(15, 5) },
        { start: new Time(15, 15), end: new Time(16, 0) },
        // 晚上
        { start: new Time(19, 20), end: new Time(20, 5) },
        { start: new Time(20, 10), end: new Time(20, 55) },
      ],
      selectedDimen: null,//维度：教师/教室
      searchKeyWord: '',//搜索关键字
      isModify: false,
      isOpeningPopover: false,
      popoverLeft: 0,
      popoverTop: 0,
      popoverVisible: false,
      timezone: {
        zones: [
          {
            timezoneName: 'Asia/Shanghai',
          },
        ],
      },
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
        Dec: 12
      },
      selectedEvent: {},
      courseInfo: {
        id: '',
        name: '',
        startToEndValue: [],
      },
      dialogVisible: false,
      view: 'week', // 展示的视图类型为月视图（month | week| day）
      week: {
        // 月视图顶部的名称
        dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        taskView: false,
        hourStart: 7,
        hourEnd: 22,
        startDayOfWeek: 1,
      },
      // 可以设置多个类型，然后不同的事件可以展示成不同样样式
      calendars: [{ id: 'cal1', name: 'Personal' }],
      // 事件列表
      events: [
        {
          id: '1',  //事件id 不重复
          calendarId: 'cal1', // 对应id
          title: 'Lunch', //事件标题
          category: 'time', // 事件类型（milestone|task|allday|time）
          location: 'myhouse',
          start: '2025-03-19T08:05:00', // 事件开始时间
          end: '2025-03-19T09:40:00' // 事件结束时间
        }
      ]
    }
  },
  mounted() {
    this.calendarInstance.setTheme({
      week: {
        timeGridHalfHourLine: {
          borderBottom: '1px dotted #e5e5e5',
        },
      },
    });
    this.calendarInstance.setOptions({
      template: {
        time: (event) => {
          // console.log(this);
          const start = event.start;
          const end = event.end;
          var startNum = 0;
          var endNum = 0;
          for (var i = 0; i < this.timeDivision.length; i++) {
            if (this.timeDivision[i].start.hour === start.getHours() && this.timeDivision[i].start.minute === start.getMinutes()) {
              startNum = i + 1;
            }
            if (this.timeDivision[i].end.hour === end.getHours() && this.timeDivision[i].end.minute === end.getMinutes()) {
              endNum = i + 1;
            }
          }
          // 假设你想在新的 span 里显示 startNum 和 endNum
          return `<span style="color: white;">${event.title}</span><br><span style="color: yellow;">开始节次: ${startNum}, 结束节次: ${endNum}</span>`;
        },
        timegridDisplayPrimaryTime({ time }) {
          const hours = time.getHours();
          console.log(time)
          if ([8, 12, 16].includes(hours)) {
            return `${time.getHours()}:00`;
          }
          return '';
        },
      },
    });
  },
  computed: {
    calendarInstance() {
      return this.$refs.calendarRef.getInstance()
    },
    getPlaceholderStr() {
      switch (this.selectedDimen) {
        case 0: return '请输入';
        case 1: return '请输入教师名';
        case 2: return '请输入教室';
        default: return '请输入';
      }
    }
  },
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          // 获取 popover 元素
          const popoverEl = document.querySelector('.el-popover');
          if (popoverEl && !popoverEl.contains(event.target) && !vnode.context.isOpeningPopover) {
            binding.value(event);
          }
          // 重置标志位
          vnode.context.isOpeningPopover = false;
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    },
  },
  methods: {
    validateSelection() {
      // 为空不做校验
      if (!this.startClass || !this.endClass) {
        return
      }
      if (this.startClass > this.endClass) {
        this.$message({
          type: 'error',
          message: '开始节次不得大于结束节次'
        })
      }
    },
    handleClose(done) {
      // var confirmStr = `之前${this.isModify === true ? '修改' : '填写'}的数据都会丢失，你确定关闭吗？`
      // this.$confirm(confirmStr)
      //   .then(_ => {
      //     this.handleResetCourseInfo()
      //     this.dialogVisible = false
      //     if (this.isModify) {
      //       this.$message(`已取消${this.isModify === true ? '修改' : '填写'}`)
      //     }
      //     this.isModify = false
      //     done()
      //   })
      //   .catch(_ => { })

      this.handleResetCourseInfo()
      this.dialogVisible = false
    },
    handleResetCourseInfo() {
      this.courseInfo.name = ''
      this.courseInfo.startToEndValue = []
    },
    handleModifyFocusEvent() {
      this.isModify = true
      this.courseInfo.name = this.selectedEvent.title
      this.courseInfo.startToEndValue = [this.selectedEvent.start, this.selectedEvent.end]
      this.dialogVisible = true
    },
    handleDeleteFocusEvent() {
      this.popoverVisible = false
      this.calendarInstance.deleteEvent(this.selectedEvent.id, this.selectedEvent.calendarId);
      this.$message({
        message: '已删除',
        type: 'warning'
      })
    },
    closePopover() {
      this.popoverVisible = false;
    },
    handleClickEvent(eventData) {
      const calendarEl = this.$refs.calendarRef.$el;
      const target = calendarEl.querySelector(`[data-event-id="${eventData.event.id}"]`);
      // console.log(target)
      if (target) {
        const rect = target.getBoundingClientRect();
        const calendarRect = calendarEl.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        // 计算相对于 Calendar 元素的位置，将 popover 放在日程右侧
        this.popoverLeft = rect.right - calendarRect.left + scrollX;
        this.popoverTop = rect.top - calendarRect.top + scrollY;
      }
      this.popoverVisible = true
      this.selectedEvent = eventData.event
      // 设置标志位
      this.isOpeningPopover = true;
    },
    //手动修改更新
    handleCreateOrModifyEvent() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          //验证通过，执行正常逻辑
          if (!this.isModify) {
            this.calendarInstance.createEvents([
              {
                id: 'event1',
                calendarId: 'cal1',
                title: this.courseInfo.name,
                start: this.selectedEvent.start,
                end: this.selectedEvent.end
              }
            ])
          } else {
            const changes = {
              title: this.courseInfo.name,
              start: this.courseInfo.startToEndValue[0],
              end: this.courseInfo.startToEndValue[1],
            }
            this.calendarInstance.updateEvent(this.selectedEvent.id, this.selectedEvent.calendarId, changes);
            this.handleResetCourseInfo()
            this.isModify = false
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }
          this.calendarInstance.clearGridSelections()
          this.dialogVisible = false
        } else {
          //验证失败
          return false
        }
      })
    },
    //拖拽更新
    handleBeforeUpdateEvent(eventData) {
      // console.log('即将更新的事件信息：', eventData);
      // 后端传过来的节数整齐则进入函数
      this.handleTimeDivision(eventData.changes.start, eventData.changes.end)
      this.calendarInstance.updateEvent(eventData.event.id, eventData.event.calendarId, eventData.changes);
    },
    handleTimeDivision(start, end) {
      // console.log(start, end)
      if (!start) {
        // Todo:下拉延长日程时，start为空
        return;
      }
      var range = {
        start: new Time(start.getHours(), start.getMinutes()),
        end: new Time(end.getHours(), end.getMinutes())
      }
      for (var i = 0; i < this.timeDivision.length; i++) {
        if (range.start.compareTo(this.timeDivision[i].start) >= 0 && range.start.compareTo(this.timeDivision[i].end) <= 0) {
          var j = (range.start.subtract(this.timeDivision[i].start) >= this.timeDivision[i].end.subtract(range.end)) ? (i + 1) : i
          if (j == 3 || j == 5) {
            // 这里指的是上午第四节课和下午第二节课，逻辑为不能分开
            return
          }
          start.setHours(this.timeDivision[j].start.hour)
          end.setHours(this.timeDivision[j + 1].end.hour)
          start.setMinutes(this.timeDivision[j].start.minute)
          end.setMinutes(this.timeDivision[j + 1].end.minute)
          return
        }
      }

    },
    onSelectDateTime(event) {
      this.selectedEvent = event
      this.courseInfo.startToEndValue = [event.start, event.end]
      this.dialogVisible = true
    },
    isCourseInfoEmpty() {

    },
    resetForm() {
      this.$refs.formRef.resetFields();
    }
  },
  beforeDestroy() {
    // 移除全局点击事件监听器
    document.body.removeEventListener('click', this.clickOutsideEvent);
  },
}
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
</style>