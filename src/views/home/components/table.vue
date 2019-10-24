<template>
  <div class="table-wrap">
    <div style="height:450px;">
      <el-table :data="tableData" style="width: 100%;" size="mini">
        <el-table-column
          prop="index"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="fmtCreateTime"
          label="创建时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="fmtLastEditTime"
          label="最后编辑时间"
          width="180"
        ></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      ref="pagination"
      :total="totalData.length"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="pageChangeHandle"
    />
  </div>
</template>

<script>
import { IndexDB } from "@/utils/indexDB";
import Pagination from "./pagination";
import dayjs from "dayjs";

export default {
  name: "Table",
  components: { Pagination },
  props: {},
  data() {
    return {
      totalData: [],
      offset: 0,
      limit: 10
    };
  },
  computed: {
    tableData() {
      return this.totalData.slice(
        this.limit * this.offset,
        this.limit * this.offset + 10
      );
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    handleSizeChange() {},
    pageChangeHandle(val) {
      this.offset = val - 1;
    },
    init() {
      IndexDB.find({}).then(res => {
        this.totalData = this.fmtTabData(res.sort(this.compare("createTime")));
      });
    },
    compare(property) {
      return function(obj1, obj2) {
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value2 - value1; //降序
      };
    },
    handleEdit(index, row) {
      this.$router.push({
        path: "./detail",
        query: {
          createTime: row.createTime
        }
      });
    },
    handleDelete(index, row) {
      this.$alert("是否删除该条记录", {
        confirmButtonText: "确定",
        type: "warning",
        callback: () => {
          this.delHistory(row);
        }
      });
    },
    delHistory(row) {
      IndexDB.remove({ createTime: row.createTime }).then(() => {
        this.init();
      });
    },
    fmtTabData(data) {
      return data.map((item, index) => {
        return Object.assign({}, item, {
          fmtCreateTime: this.fmtDate(item.createTime),
          fmtLastEditTime: this.fmtDate(item.lastEditTime),
          index: index + 1
        });
      });
    },
    fmtDate(date) {
      return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style scoped lang="scss"></style>
