<template>
  <div class="content">
    <div class="title">自动排课</div>
    <div class="flex-container">
      <div class="left-column">
        <div class="section-with-title">
          <div class="section-title">排课规则表单</div>
          <RulesForm></RulesForm>
        </div>
      </div>
      <div class="divider"></div>
      <div class="right-column">
        <div class="schedule-upload-section">
          <div class="upload-title">课程计划文件上传</div>
          <el-upload
            class="upload"
            :auto-upload="false"
            drag
            :action="getScheduleFileUploadUrl"
            :before-upload="handleBeforeUpload"
            ref="scheduleUploadRef"
            multiple
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
            class="upload-button"
          >
            上传<i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
        <div class="section-with-title">
          <div class="section-title">优先排课</div>
          <el-transfer
            :data="transferData"
            v-model="transferValue"
            :titles="['排课列表', '优先排课列表']"
          ></el-transfer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RulesForm from "@/components/RulesForm";
import { SERVER_URL, SCHEDULE_PREFIX } from "@config";
import axios from "axios";

export default {
  name: "AutoArrange",
  components: {
    RulesForm,
  },
  computed: {
    getScheduleFileUploadUrl() {
      return `${this.serverUrl}${this.schedulePrefix}/create/file`;
    },
  },
  data() {
    return {
      serverUrl: SERVER_URL,
      schedulePrefix: SCHEDULE_PREFIX,
      transferData: [
        { key: 1, label: "选项 1" },
        { key: 2, label: "选项 2" },
        { key: 3, label: "选项 3" },
        { key: 4, label: "选项 4" },
      ],
      transferValue: [],
    };
  },
  methods: {
    handleBeforeUpload(file) {
      // 检查文件类型和大小
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
    handleScheduleUpload() {
      const uploadFiles = this.$refs.scheduleUploadRef.uploadFiles;
      if (uploadFiles.length === 0) {
        this.$message.error("请选择要上传的文件");
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "文件正在上传中，请耐心等待",
        spinner: "el-icon-loading",
        background: "rgba(0,0,0,0.7)",
        zIndex: 4000,
      });
      const formData = new FormData();
      uploadFiles.forEach((file) => {
        formData.append("schedule_file", file.raw);
      });
      axios
        .post(this.getScheduleFileUploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // 清空已上传的文件列表
          this.$refs.scheduleUploadRef.clearFiles();
          if (response.data.status === 200) {
            loading.close();
            this.$message({
              type: "success",
              message: "文件上传成功",
            });
          } else {
            this.$message.error("文件上传失败");
            loading.close();
          }
        })
        .catch((error) => {
          console.error("上传出错:", error);
          this.$message.error("上传过程中出现错误");
          loading.close();
        });
    },
  },
};
</script>

<style scoped>
.content {
  position: relative;

  padding: 12px;
  padding-top: 30px;
  margin: 16px;
}

.title {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: white;
  padding: 0 5px;
  z-index: 1;
  font-weight: bold;
  font-size: 20px;
}

.flex-container {
  display: flex;
}

.left-column {
  flex: 4;
  padding-left: 30px;
  margin-top: 30px;
}

.divider {
  width: 2px;
  background-color: rgba(128, 128, 128, 0.489);
  margin: 0 16px;
}

.right-column {
  flex: 6;
  display: flex;
  flex-direction: column;
  gap: 16px; /* 添加子元素间距 */
  margin-top: 30px;
}

.section-with-title {
  border: 2px solid rgba(128, 128, 128, 0.489);
  border-radius: 8px;
  padding: 12px;
  position: relative;
  margin-bottom: 16px;
  flex-grow: 1; /* 允许数据转移区域扩展剩余空间 */
}

.schedule-upload-section {
  border: 2px solid rgba(128, 128, 128, 0.489);
  border-radius: 8px;
  padding: 12px;
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.upload {
  margin-top: 0;
  text-align: center;
}

.upload-button {
  margin-top: 16px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.upload-title,
.section-title {
  position: absolute;
  top: -15px;
  left: 10px;
  background-color: white;
  padding: 0 5px;
  z-index: 1;
  font-weight: bold;
}
</style>    