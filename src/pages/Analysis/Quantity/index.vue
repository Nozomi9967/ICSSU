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
      <el-select
        v-model="selectedTeacherId"
        filterable
        placeholder="请选择教师"
        clearable
        @change="handleTeacherChange"
        :loading="loading"
      >
        <el-option
          v-for="teacher in teacherOptions"
          :key="teacher.id"
          :label="teacher.label"
          :value="teacher.id"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { mapState } from "vuex";
import axios from 'axios';

export default {
  name: 'SimpleTeacherWorkloadChart',
  data() {
    return {
      selectedTeacherId: null,
      teacherOptions: [],
      chart: null,
      averageWorkload: 0,
      currentTeacherWorkload: 0,
      loading: false,
      teacherMap: {} // 存储教师ID和名称的映射
    };
  },
  computed: {
    ...mapState(["analysis"]),
  },
  mounted() {
    this.initChart();
    this.fetchTeachers();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.barChart);
      this.updateChart();
    },

    async fetchTeachers() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:8080/teacher/queryall');
        const teachers = response.data.data || [];
        
        // 构建教师选项和映射表
        this.teacherOptions = teachers.map(teacher => {
          this.teacherMap[teacher.ID] = teacher.Name;
          return {
            id: teacher.ID,
            label: `${teacher.Name} (${teacher.ID})`
          };
        });

        // 计算平均工作量
        this.calculateAverageWorkload();
      } catch (error) {
        console.error('获取教师列表失败:', error);
        this.$message.error('获取教师列表失败');
      } finally {
        this.loading = false;
      }
    },

    calculateAverageWorkload() {
      if (!this.analysis?.teacher_workload) return;
      
      const workloads = Object.values(this.analysis.teacher_workload)
        .filter(val => val > 0);
      
      if (workloads.length === 0) return;
      
      this.averageWorkload = Math.round(workloads.reduce((sum, val) => sum + val, 0) / workloads.length);
      this.updateChart();
    },

    handleTeacherChange(teacherId) {
      if (teacherId && this.analysis?.teacher_workload[teacherId]) {
        this.currentTeacherWorkload = this.analysis.teacher_workload[teacherId];
      } else {
        this.currentTeacherWorkload = 0;
      }
      this.updateChart();
    },

    updateChart() {
      if (!this.chart) return;

      const series = [
        {
          name: '全体教师平均',
          type: 'bar',
          barWidth: this.selectedTeacherId ? '40%' : '60%',
          data: [this.averageWorkload],
          itemStyle: {
            color: '#61a0a8',
            emphasis: {
              color: '#7ab8c0',
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}',
            color: '#333'
          },
          emphasis: {
            itemStyle: {
              color: '#7ab8c0'
            },
            label: {
              show: true
            }
          }
        }
      ];

      if (this.selectedTeacherId) {
        const teacherName = this.teacherMap[this.selectedTeacherId] || this.selectedTeacherId;
        series.push({
          name: `当前教师: ${teacherName}`,
          type: 'bar',
          barWidth: '40%',
          data: [this.currentTeacherWorkload],
          itemStyle: {
            color: '#c23531',
            emphasis: {
              color: '#d15f5b',
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: true,
            position: 'top',
            formatter: '{c}',
            color: '#333'
          },
          emphasis: {
            itemStyle: {
              color: '#d15f5b'
            },
            label: {
              show: true
            }
          }
        });
      }

      const option = {
        title: {
          text: this.selectedTeacherId ? '教师排课量对比' : '教师平均排课量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          },
          formatter: params => {
            return `${params.seriesName}<br/>课时数: ${params.value}`;
          }
        },
        legend: {
          data: series.map(item => item.name),
          top: 30
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['排课量'],
          axisLabel: {
            interval: 0,
            rotate: 0
          }
        },
        yAxis: {
          type: 'value',
          name: '课时数',
          nameLocation: 'middle',
          nameGap: 30
        },
        series: series
      };

      this.chart.setOption(option, true);
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
</script>

<style scoped>
.bar-chart-container {
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
  height: 500px;
}

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

@media (max-width: 768px) {
  .teacher-selector {
    flex-direction: column;
    align-items: flex-start;
  }

  .selector-label {
    margin-bottom: 10px;
  }
}
</style>