<template>
  <div class="pie-chart-container">
    <!-- 标题 -->
    <div class="chart-title">
      <h2>教室利用率</h2>
    </div>

    <!-- ECharts 图表容器 -->
    <div class="chart-wrapper">
      <el-card class="chart-card">
        <!-- 使用 ref 绑定 DOM 元素，用于初始化 ECharts -->
        <div ref="chart" class="chart"></div>
      </el-card>
    </div>

    <!-- 教室选择器 -->
    <div class="classroom-selector">
      <span class="selector-label">选择教室</span>
      <!-- Element Plus 的级联选择器 -->
      <el-cascader
        placeholder="试试搜索"
        :options="options" 
        :props="{ multiple: false, checkStrictly: false}" 
        filterable 
        clearable 
        v-model="selectedOptions"> 
      </el-cascader>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'; // 导入 ECharts
import axios from 'axios'; // 导入 axios 用于发送 HTTP 请求

export default {
  name: 'PieChart', // 组件名称
  data() {
    return {
      options: [], // 级联选择器的选项数据
      selectedOptions: [], // 选中的教室选项
      chartData: [], // 图表数据
      chartTitle: '总教室利用率', // 动态图表标题
    };
  },
  created() {
    // 在组件创建时获取级联选择器的选项数据
    this.fetchOptions();
  },
  mounted() {
    // 在 DOM 挂载完成后，获取初始数据并渲染图表
    this.fetchData([]).then(() => {
      this.renderChart();
      // 监听窗口大小变化，重新渲染图表
      window.addEventListener('resize', this.renderChart);
    });
  },
  beforeDestroy() {
    // 在组件销毁前移除窗口大小变化的监听器，避免内存泄漏
    window.removeEventListener('resize', this.renderChart);
  },
  methods: {
    // 获取级联选择器的选项数据
    fetchOptions() {
      axios.get('http://localhost:3000/api/options')
        .then(response => {
          this.options = response.data; // 将获取的数据赋值给 options
        })
        .catch(error => {
          console.error('Error fetching options:', error); // 错误处理
        });
    },
    // 获取图表数据
    async fetchData(selectedClassrooms) {
      try {
        let params = {};
        if (selectedClassrooms.length > 0) {
          // 如果有选中的教室，将教室 ID 转换为逗号分隔的字符串
          const classroomIds = selectedClassrooms.map(classroom => classroom[1]).join(',');
          params = { classrooms: classroomIds }; // 将教室 ID 作为请求参数
        }
        // 发送 GET 请求获取图表数据
        const response = await axios.get('/api/piechart/data', { params });
        this.chartData = response.data; // 将获取的数据赋值给 chartData
      } catch (err) {
        console.error('获取饼图数据失败:', err); // 错误处理
      }
    },
    // 渲染 ECharts 图表
    renderChart() {
      const chartElement = this.$refs.chart; // 获取图表容器的 DOM 元素
      if (!chartElement) {
        console.error('DOM element not found'); // 如果 DOM 元素不存在，输出错误信息
        return;
      }

      const myChart = echarts.init(chartElement); // 初始化 ECharts 实例
      const option = {
        title: {
          text: this.chartTitle, // 动态绑定图表标题
          left: 'center', // 标题居中
        },
        tooltip: {
          trigger: 'item', // 提示框触发方式为数据项
        },
        legend: {
          orient: 'vertical', // 图例垂直排列
          left: 'left', // 图例居左
        },
        series: [
          {
            name: '访问来源', // 系列名称
            type: 'pie', // 图表类型为饼图
            radius: '70%', // 饼图半径
            data: this.chartData, // 绑定图表数据
            emphasis: {
              itemStyle: {
                shadowBlur: 10, // 高亮时的阴影模糊大小
                shadowOffsetX: 0, // 高亮时的阴影水平偏移
                shadowColor: 'rgba(0, 0, 0, 0.5)', // 高亮时的阴影颜色
              },
            },
          },
        ],
      };

      myChart.setOption(option); // 设置图表配置项
    },

    // 更新图表标题
    updateChartTitle(selectedOptions) {
      if (selectedOptions.length === 0) {
        // 如果未选择任何选项，显示“总教室利用率”
        this.chartTitle = '总教室利用率';
      } else {
        // 如果选择了选项，拼接标题
        const labels = selectedOptions.map((option, index) => {
          // 找到对应的 label
          let currentLevel = this.options;
          for (let i = 0; i <= index; i++) {
            const found = currentLevel.find(item => item.value === option);
            if (found) {
              currentLevel = found.children || [];
              if (i === index) {
                return found.label;
              }
            }
          }
          return '';
        }).filter(label => label); // 过滤掉空值
        this.chartTitle = `${labels.join('-')} 教室利用率`;
      }
    },
  },
  
  
  watch: {
    // 监听 selectedOptions 的变化
    selectedOptions(newVal) {
      // 更新图表标题
      this.updateChartTitle(newVal);
      
      if (newVal.length > 0) {
        // 如果有选中的教室，获取对应数据并渲染图表
        this.fetchData(newVal).then(() => {
          this.renderChart();
        });
      } else {
        // 如果没有选中的教室，获取全部数据并渲染图表
        this.fetchData([]).then(() => {
          this.renderChart();
        });
      }
    },
  },
};
</script>

<style scoped>
/* 容器样式 */
.pie-chart-container {
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
  height: 400px;
}

/* 教室选择器样式 */
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