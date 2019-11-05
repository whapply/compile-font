<template>
  <el-select
    v-model="value"
    placeholder="请选择"
    size="mini"
    @change="selectChangeHandle"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    selectChangeHandle(val) {
      this.$emit("selectChangeHandle", val);
    }
  }
};
</script>
