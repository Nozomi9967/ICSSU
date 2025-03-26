<template>

  <div style="position: relative;">
    <Calendar style="height: 700px" ref="calendarRef" :view="view" :use-detail-popup="false" :week="week"
      :calendars="calendars" :events="events" :usage-statistics="false" :time-zone=timezone
      @selectDateTime="onSelectDateTime" @beforeUpdateEvent="handleBeforeUpdateEvent" @clickEvent="handleClickEvent" />
    <!-- 新增课程dialog -->
    <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="dialogVisible" width="60%"
      :before-close="handleClose">
      <el-form :model="courseInfo" ref="formRef">
        <el-form-item label="课程编号" prop="id">
          <el-input v-model="courseInfo.id"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="courseInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="开始时间 - 结束时间" prop="startToEndValue">
          <el-time-picker is-range arrow-control v-model="courseInfo.startToEndValue" range-separator="至"
            start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
          </el-time-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleCreateOrModifyEvent">提交</el-button>
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 点击日程后的popover弹出框 -->
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
  data() {
    return {
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
          start: '2025-03-04T20:00:00', // 事件开始时间
          end: '2025-03-04T21:30:00' // 事件结束时间
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
    handleClose(done) {
      var confirmStr = `之前${this.isModify === true ? '修改' : '填写'}的数据都会丢失，你确定关闭吗？`
      this.$confirm(confirmStr)
        .then(_ => {
          this.handleResetCourseInfo()
          this.dialogVisible = false
          if (this.isModify) {
            this.$message(`已取消${this.isModify === true ? '修改' : '填写'}`)
          }
          this.isModify = false
          done()
        })
        .catch(_ => { })
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
      this.calendarInstance.updateEvent(eventData.event.id, eventData.event.calendarId, eventData.changes);
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