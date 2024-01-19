<script setup lang="ts">
    import { defineComponent } from "vue";
    import "./assets/css/index.css";

    import NavBar from "./components/NavBar.vue";
    import useLoading from "./composables/useLoading";

    import { theme } from "./vuex-store/theme";
    const { isLoading } = useLoading();

    defineComponent({
        components: {
            NavBar,
        },
        setup() {
            return {
                theme,
                isLoading,
            };
        },
    });
</script>

<template>
    <div class="flex flex-col h-screen bg-base-100" :data-theme="theme">
        <NavBar />
        <template v-if="isLoading"><progress class="progress"></progress></template>
        <router-view class="h-full w-full"></router-view>
    </div>
</template>
