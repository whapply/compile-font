<template>
  <div class="btn-wrap">
    <el-button
      :size="size"
      :loading="loading"
      @click="clickHandle"
      :disabled="disabled"
      >{{ text }}</el-button
    >
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: "创建"
    },
    size: {
      type: String,
      default: "mini"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    clickHandle() {
      this.$emit("clickHandle");
    }
  }
};
</script>

<style scoped lang="scss"></style>
