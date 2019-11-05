<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  name: "app",
  components: {},
  mounted() {
    // ipcRenderer.on("message", this.checkoutUpdate);
  },
  destroyed() {
    // ipcRenderer.removeListener("message", this.updateHandler);
  },
  methods: {
    checkoutUpdate(e, { message }) {
      if (message === "isUpdateNow") {
        if (confirm("是否现在更新？")) {
          ipcRenderer.send("updateNow");
        }
      }
      // ipcRenderer.on("message", (event, { message }) => {
      //   console.log(message, "checkoutUpdate");
      //   if (message === "isUpdateNow") {
      //     if (confirm("是否现在更新？")) {
      //       ipcRenderer.send("updateNow");
      //     }
      //   }
      // });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
