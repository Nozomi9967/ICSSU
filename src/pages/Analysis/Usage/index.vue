<template>
  <div class="pie-chart-container">
    <!-- 标题 -->
    <div class="chart-title">
      <h2>教室利用率</h2>
    </div>

    <!-- ECharts 图表容器 -->
    <div class="chart-wrapper">
      <el-card class="chart-card">
        <div ref="chart" class="chart"></div>
      </el-card>
    </div>

    <!-- 教室选择器 -->
    <div class="classroom-selector">
      <span class="selector-label">选择教室</span>
      <el-select
        v-model="selectedClassroom"
        filterable
        clearable
        placeholder="请选择或搜索教室"
        @change="handleClassroomChange"
      >
        <el-option
          v-for="item in classroomOptions"
          :key="item.ID"
          :label="`${item.Name} (${item.ID})`"
          :value="item.ID"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
// 以下是未来需要恢复Vuex时取消注释的部分
import { mapState } from "vuex";

export default {
  name: "PieChart",
  data() {
    return {
      // 当前直接使用的模拟数据（未来使用Vuex时可删除这部分）
      // analysis: {
      //   classroom_usage: {
      //     HXGCZX201: 0.4222222222222222,
      //     HXGCZX202: 0.25,
      //     HXGCZX203: 0.65,
      //     HXGCZX204: 0.5777777777777777,
      //     HXGCZX205: 0.24444444444444444,
      //     HXGCZX206: 0.40555555555555556,
      //     // 更多教室数据...
      //   },
      //   teacher_workload: {
      //     "0004": 72,
      //     "0009": 108,
      //     "0010": 64,
      //     // 更多教师数据...
      //   },
      //   time_distribution: {
      //     "周1-星期1-1节": 59,
      //     "周1-星期1-3节": 59,
      //     // 更多时间分布数据...
      //   },
      // },

      classroomOptions: [], // 从API获取的教室选项
      selectedClassroom: "", // 选中的教室ID
      chartData: [], // 图表数据
      chartTitle: "总教室利用率", // 动态图表标题
    };
  },

  // 以下是未来需要恢复Vuex时取消注释的部分
  computed: {
    ...mapState(["analysis"]),
  },

  mounted() {
    this.fetchClassroomOptions();
    this.$nextTick(() => {
      this.renderChart();
      window.addEventListener("resize", this.renderChart);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.renderChart);
  },

  // 以下是未来需要恢复Vuex时取消注释的部分
  // watch: {
  //   analysis: {
  //     handler(newVal) {
  //       if (newVal && newVal.classroom_usage) {
  //         if (!this.selectedClassroom) {
  //           this.showAverageUsage();
  //         }
  //       }
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // },

  methods: {
    async fetchClassroomOptions() {
      try {
        const response = await axios.get(
          "http://localhost:8080/classroom/queryall"
        );
        if (response.data.status === 200) {
          this.classroomOptions = response.data.data;
          this.showAverageUsage();
        }
      } catch (error) {
        console.error("获取教室列表失败:", error);
      }
    },

    showAverageUsage() {
      const usages = Object.values(this.analysis.classroom_usage);
      if (usages.length > 0) {
        const averageUsage =
          usages.reduce((sum, val) => sum + val, 0) / usages.length;
        this.chartData = [
          { value: averageUsage, name: "已使用" },
          { value: 1 - averageUsage, name: "未使用" },
        ];
        this.chartTitle = "总教室利用率";
        this.renderChart();
      }
    },

    handleClassroomChange(classroomId) {
      if (!classroomId) {
        this.showAverageUsage();
        return;
      }

      // 当前直接从本地analysis数据获取（未来使用Vuex时改为从this.analysis获取）
      const usage = this.analysis.classroom_usage[classroomId] || 0;
      this.chartData = [
        { value: usage, name: "已使用" },
        { value: 1 - usage, name: "未使用" },
      ];

      const selectedClassroom = this.classroomOptions.find(
        (item) => item.ID === classroomId
      );
      this.chartTitle = selectedClassroom
        ? `${selectedClassroom.Name} 教室利用率`
        : "教室利用率";

      this.renderChart();
    },

    renderChart() {
      const chartElement = this.$refs.chart;
      if (!chartElement) {
        console.error("DOM element not found");
        return;
      }

      const myChart = echarts.init(chartElement);
      const option = {
        title: {
          text: this.chartTitle,
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "教室利用率",
            type: "pie",
            radius: "70%",
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            data: this.chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              show: true,
              formatter: "{b}: {d}%",
            },
            labelLine: {
              show: true,
            },
          },
        ],
        color: ["#67C23A", "#F56C6C"],
      };

      myChart.setOption(option);
      myChart.resize();
    },
  },
};
</script>

<style scoped>
.pie-chart-container {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chart-title {
  text-align: left;
  margin-bottom: 20px;
  margin-left: 30px;
}

.chart-title h2 {
  font-size: 24px;
  color: #303133;
  font-weight: bold;
}

.chart-wrapper {
  margin-bottom: 20px;
}

.chart-card {
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chart {
  width: 100%;
  height: 400px;
}

.classroom-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.selector-label {
  font-size: 14px;
  color: #606266;
  margin-right: 10px;
}

@media (max-width: 768px) {
  .classroom-selector {
    flex-direction: column;
    align-items: flex-start;
  }

  .selector-label {
    margin-bottom: 10px;
  }

  .el-select {
    width: 100%;
  }
}
</style>