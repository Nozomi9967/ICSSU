<template>

  <div style="position: relative;">
    <Calendar style="height: 700px" ref="calendarRef" :view="view" :use-detail-popup="false" :week="week"
      :calendars="calendars" :events="events" :usage-statistics="false" :options="calendarOptions" :time-zone=timezone
      @selectDateTime="onSelectDateTime" @beforeCreateEvent="handleBeforeCreateEvent"
      @beforeDeleteEvent="handleBeforeDeleteEvent" @beforeUpdateEvent="handleBeforeUpdateEvent"
      @clickEvent="handleClickEvent" :template="popupTemplate" />
    <!-- 新增课程dialog -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <el-input placeholder="请输入课程名称" v-model="courseInfo.name" clearable>
      </el-input>
      <el-time-picker is-range arrow-control v-model="courseInfo.startToEndValue" range-separator="至"
        start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
      </el-time-picker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleBeforeCreateEvent">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击日程后的popover弹出框 -->
    <el-popover v-model="popoverVisible"
      :style="{ left: popoverLeft + 'px', top: popoverTop + 'px', position: 'absolute' }" placement="bottom"
      trigger="manual" :title=selectedEvent.title width="200" content="rrrr">
      <div class="popover-content">
        <div class="popover-text">rrrr</div>
        <el-button type="text">编辑</el-button>
        <el-button type="text">删除</el-button>
      </div>
    </el-popover>
    <!-- 遮罩层 -->
    <div v-if="popoverVisible" v-click-outside="closePopover" class="popover-mask"></div>
  </div>
</template>

<script>
import Calendar from '@toast-ui/vue-calendar'
import '@toast-ui/calendar/dist/toastui-calendar.min.css'

export default {
  components: {
    Calendar
  },
  mounted() {
    // console.log('组件已挂载，检查 taskTemplate', this.taskTemplate);
    // 可以在这里添加更多的检查逻辑，比如获取日历实例中的任务元素，检查其是否符合预期
    // 添加全局点击事件监听器
  },
  data() {
    return {
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
      popupTemplate: {
        popupIsAllday() {
          return '全天';
        },
        titlePlaceholder() {
          return '课程名称';
        },
        locationPlaceholder() {
          return '课程地点';
        },
        popupSave() {
          return '添加';
        },
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
        name: '',
        startToEndValue: [],
      },
      calendarOptions: {
        isReadOnly: true,
        useDetailPopup: true,
        timeZone: 'Asia/Shanghai'
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
          start: '2025-03-04T20:00:00', // 事件开始时间
          end: '2025-03-04T21:30:00' // 事件结束时间
        }
      ]
    }
  },
  computed: {
    calendarInstance() {
      return this.$refs.calendarRef.getInstance()
    }
  },
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          // 获取 popover 元素
          const popoverEl = document.querySelector('.el-popover');
          if (popoverEl && !popoverEl.contains(event.target) && !vnode.context.isOpeningPopover) {
            // console.log('点击在 popover 外部，关闭 popover');
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
    handleBeforeCreateEvent() {
      this.calendarInstance.createEvents([
        {
          id: 'event1',
          calendarId: 'cal1',
          title: this.courseInfo.name,
          start: this.selectedEvent.start,
          end: this.selectedEvent.end
        }
      ])
      this.calendarInstance.clearGridSelections()
      this.dialogVisible = false
    },
    handleBeforeUpdateEvent(eventData) {
      // console.log('即将更新的事件信息：', eventData);
      this.calendarInstance.updateEvent(eventData.event.id, eventData.event.calendarId, eventData.changes);
      // 在这里可以添加你的自定义逻辑，比如阻止更新等
      // 如果想阻止更新，可以返回 false
      // return false;
    },
    handleBeforeDeleteEvent(event) {
      // console.log(eventData)
      this.calendarInstance.deleteEvent(event.id, event.calendarId);
    },
    onSelectDateTime(event) {
      this.selectedEvent = event
      this.courseInfo.startToEndValue = [event.start, event.end]
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
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

::v-deep .popover-content>el-button {
  width: 50px;
  display: inline-block;
  /* 确保按钮在一行 */
  margin-right: 10px;
  /* 按钮之间的间距 */
}

::v-deep .el-popover {
  height: 150px;
  /* overflow-y: auto; */
  /* 如果内容超出高度，添加滚动条 */
}
</style>