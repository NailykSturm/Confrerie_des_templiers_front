<script setup lang="ts">
  import { defineComponent } from "vue";
  import "./assets/css/index.css";

  import NavBar from "./components/NavBar.vue";

  import { theme } from "./vuex-store/theme";

  defineComponent({
    components: {
      NavBar,
    },
    setup() {
      return {
        theme,
      };
    },
  });
</script>

<template>
  <div class="flex flex-col h-screen bg-base-100" :data-theme="theme">
    <NavBar />
    <router-view></router-view>
  </div>
</template>
