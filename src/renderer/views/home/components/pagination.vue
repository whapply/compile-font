<template>
  <div class="pangination-wrap">
    <el-pagination
      v-if="total > 0"
      ref="pagination"
      :current-page.sync="currentPage3"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      background
      layout="total,prev, pager, next, jumper"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  name: "Pangination",
  props: {
    hideOnSinglePage: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: function() {
        return 0;
      }
    },
    pageSize: {
      type: Number,
      default: function() {
        return 10;
      }
    },
    pageSizes: {
      type: Array,
      default: function() {
        return [10, 20, 50, 100];
      }
    },
    currPage: {
      type: Number,
      default: function() {
        return 1;
      }
    }
  },
  data() {
    return {
      currentPage3: 1
    };
  },
  computed: {
    currPage3() {
      // get() {
      //   return this.page
      // },
      // set(val) {
      //   this.$emit('update:page', val)
      // }
      return this.currPage ? this.currPage : 1;
    }
  },
  methods: {
    setCurrPage(val = 1) {
      // this.$refs.pagination.internalCurrentPage = val
      this.currentPage3 = val;
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    }
  }
};
</script>

<style lang="less" scoped>
.pangination-wrap {
  padding: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
