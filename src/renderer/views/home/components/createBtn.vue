<template>
  <div class="create-btn-wrap">
    <Btn @clickHandle="newCompile"></Btn>
  </div>
</template>

<script>
import Btn from "@/components/Btn";
export default {
  name: "",
  components: { Btn },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    newCompile() {
      this.$router.push("./detail");
    }
  }
};
</script>

<style scoped lang="less">
.create-btn-wrap {
  display: flex;
  justify-content: flex-end;
}
</style>
