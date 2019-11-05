<template>
  <div class="detail-wrap">
    <div class="operate-wrap">
      <Select
        :options="fontOptions"
        @selectChangeHandle="selectChangeHandle"
      ></Select>
      <Btn @clickHandle="createFont" :disabled="canCreate" class="ml-20"></Btn>
    </div>

    <ul id="font-list">
      <li v-for="(item, index) in compileArr" :key="index" class="mt-20">
        <p>
          <span>{{ item.type }}</span>
          <Btn
            @clickHandle="removeHandle(item, index)"
            :loading="loading"
            class="ml-20"
            text="移除"
          ></Btn>
        </p>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入需要编译的字体"
          v-model="item.value"
        ></el-input>
      </li>
      <li v-if="compileArr.length > 0" class="mt-20">
        <span>备注</span>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入备注内容"
          v-model="remark"
        ></el-input>
      </li>
    </ul>
    <div style="display:flex;justify-content:flex-end;">
      <Btn
        @clickHandle="checkCanCompile"
        :disabled="fontNums === 0"
        :loading="loading"
        class="ml-20"
        text="开始编译"
      ></Btn>
      <Btn @clickHandle="cancel" class="ml-20" text="取消"></Btn>
    </div>
  </div>
</template>

<script>
import Select from "@/components/Select";
import Btn from "@/components/Btn";
import { getAppPath, readFiles, getBasename } from "@/utils/file";
import { fillHtml } from "@/utils/html/";
import { IndexDB } from "@/utils/indexDB";
import { ipcRenderer, remote } from "electron";
const path = require("path");

export default {
  name: "Detail",
  components: {
    Select,
    Btn
  },
  props: {},
  data() {
    return {
      loading: false,
      remark: "",
      fontOptions: [
        {
          value: "",
          label: ""
        }
      ],
      compileArr: [],
      currFontType: ""
    };
  },
  computed: {
    canCreate() {
      return this.currFontType ? false : true;
    },
    fontNums() {
      const sum = this.compileArr.reduce((pre, curr) => {
        return (pre += curr.value.trim().length);
      }, 0);
      return sum;
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.init();
    ipcRenderer.on("saveHistory", this.saveHistory);
  },
  destroyed() {
    ipcRenderer.removeListener("saveHistory", this.saveHistory);
  },
  methods: {
    init() {
      const currItemCreateTime = this.$route.query.createTime;
      if (currItemCreateTime) {
        IndexDB.find({ createTime: currItemCreateTime })
          .then(res => {
            this.compileArr = res[0].fonts;
          })
          .catch(e => {
            console.log(e);
          });
      }
      this.getFonts();
    },
    getFonts() {
      const dirPath = getAppPath();
      readFiles(dirPath, res => {
        const truthFonts = res.filter(item => {
          return path.extname(item) === ".ttf";
        });
        this.fontOptions = this.formatArr(truthFonts);
      });
    },
    formatArr(arr) {
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        newArr.push({
          label: getBasename(arr[i]),
          value: getBasename(arr[i])
        });
      }
      return newArr;
    },
    selectChangeHandle(val) {
      this.currFontType = val;
    },
    createFont() {
      const mul = this.compileArr.some(item => {
        return item.type === this.currFontType;
      });
      if (!mul) {
        this.compileArr.push({
          value: "",
          type: this.currFontType
        });
      } else {
        this.$message.error(`${this.currFontType}字体输入框已存在`);
      }
    },
    checkCanCompile() {
      const canCompile = this.canCompile();
      canCompile && this.compileStart();
    },
    compileStart() {
      this.loading = true;
      fillHtml(this.compileArr);
    },
    canCompile() {
      return this.compileArr.some(item => {
        return item.value.trim();
      });
    },
    cancel() {
      this.$router.go(-1);
    },

    removeHandle(item, index) {
      this.compileArr.splice(index, 1);
    },

    updateSuccess() {
      this.$message.success(
        `已下载到文件${remote.app.getPath("downloads")}文件夹`
      );
      this.cancel();
    },

    saveHistory() {
      const createTime = new Date().getTime();
      const options = {
        fonts: this.compileArr,
        createTime: createTime,
        lastEditTime: createTime,
        remark: this.remark
      };
      const currItemCreateTime = this.$route.query.createTime;
      if (currItemCreateTime) {
        // 更新
        IndexDB.update(
          { createTime: currItemCreateTime },
          {
            fonts: options.fonts,
            lastEditTime: options.lastEditTime,
            remark: options.remark
          }
        ).then(() => {
          this.updateSuccess();
        });
      } else {
        // 创建
        IndexDB.insert(options).then(() => {
          this.updateSuccess();
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.detail-wrap {
  padding: 20px;
  .operate-wrap {
    display: flex;
  }
  #font-list {
    li {
      p {
        margin: 5px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
