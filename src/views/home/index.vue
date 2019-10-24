<template>
  <div class="wrap">
    <create-btn></create-btn>
    <Table></Table>
  </div>
</template>

<script>
import Table from "./components/table";
import CreateBtn from "./components/createBtn";
export default {
  name: "",
  components: { Table, CreateBtn },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less"></style>
