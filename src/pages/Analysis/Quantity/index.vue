<template>
  <div class="bar-chart-container">
    <div class="chart-title">
      <h2>教师排课量</h2>
    </div>

    <div class="chart-wrapper">
      <el-card class="chart-card">
        <div ref="barChart" class="chart"></div>
      </el-card>
    </div>

    <div class="teacher-selector">
      <span class="selector-label">选择教师</span>
      <!-- 单选可搜索的下拉框 -->
      <el-select
        v-model="selectedValue"
        filterable
        placeholder="请选择"
        clearable
        @change="handleChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <!-- 显示当前选中的值 -->
      <div class="selector-label">
        当前选中的值：{{ selectedValue || "未选择（显示所有教师平均数据）" }}
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios"; // 引入 axios
import { mapState } from "vuex";

export default {
  name: "BarChart",
  data() {
    return {
      // 选中的值
      selectedValue: "",
      // 下拉框选项
      options: [],
      // ECharts 实例
      chart: null,
    };
  },
  mounted() {
    this.initChart();
    this.fetchTeachers(); // 获取老师信息
    this.fetchAverageData(); // 初始加载所有教师的平均数据
    console.log(this.analysis);
  },
  computed: {
    ...mapState(["analysis"]),
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.barChart);

      // 初始图表配置
      const option = {
        title: {
          text: "教师排课量",
        },
        tooltip: {},
        xAxis: {
          data: ["日平均", "周一", "周二", "周三", "周四", "周五"],
        },
        yAxis: {},
        series: [
          {
            name: "排课量",
            type: "bar",
            data: [], // 初始数据为空
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option);
    },
    fetchTeachers() {
      // 从后端获取老师信息
      axios
        .get(
          "http://127.0.0.1:4523/m1/5962874-5651024-default/teacher/queryall"
        ) // 替换为你的后端 API 地址
        .then((response) => {
          this.options = response.data.data.map((teacher) => ({
            value: teacher.ID,
            label: teacher.Name,
          }));
        })
        .catch((error) => {
          console.error("获取老师信息失败:", error);
        });
    },
    fetchAverageData() {
      // 获取所有教师的平均排课数据
      axios
        .get("/api/average-schedule") // 替换为你的后端 API 地址
        .then((response) => {
          const averageData = response.data; // 假设返回的数据格式为 [5, 20, 36, 10, 10, 10]
          this.updateChart(averageData);
        })
        .catch((error) => {
          console.error("获取平均排课数据失败:", error);
        });
    },
    handleChange(selectedValue) {
      if (selectedValue) {
        // 根据选择的老师 ID 获取柱状图数据
        axios
          .get(`/api/teacher-schedule/${selectedValue}`) // 替换为你的后端 API 地址
          .then((response) => {
            const chartData = response.data; // 假设返回的数据格式为 [5, 20, 36, 10, 10, 10]
            this.updateChart(chartData);
          })
          .catch((error) => {
            console.error("获取排课数据失败:", error);
          });
      } else {
        // 未选择时，显示所有教师的平均数据
        this.fetchAverageData();
      }
    },
    updateChart(data) {
      // 更新图表数据
      const option = {
        series: [
          {
            data: data,
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>

<style scoped>
/* 容器样式 */
.bar-chart-container {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 标题样式 */
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

/* 图表容器样式 */
.chart-wrapper {
  margin-bottom: 20px;
}

.chart-card {
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chart {
  width: 100%;
  height: 500px;
}

/* 教室选择器样式 */
.teacher-selector {
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

.cascader {
  width: 300px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .classroom-selector {
    flex-direction: column;
    align-items: flex-start;
  }

  .selector-label {
    margin-bottom: 10px;
  }

  .cascader {
    width: 100%;
  }
}
</style>