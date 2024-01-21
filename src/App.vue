<script setup lang="ts">
    import "./assets/css/index.css";

    import NavBar from "./components/NavBar.vue";
    import { isLoading } from "./vuex-store/useLoading";

    import { theme } from "./vuex-store/theme";
</script>

<template>
    <div class="flex flex-col h-screen bg-base-100" :data-theme="theme">
        <NavBar />
        <template v-if="isLoading"><progress class="progress"></progress></template>
        <router-view class="h-full w-full"></router-view>
    </div>
</template>
