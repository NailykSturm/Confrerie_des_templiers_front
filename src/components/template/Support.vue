<script setup lang="ts">
    import { Support } from "../../types/Support";
    import { dataToDisplay } from "../../vuex-store/useGraph";
    import SvgDisplayer from "../SvgDisplayer.vue";

    const support: Support = <Support>dataToDisplay.value;
</script>

<template>
    <div v-if="dataToDisplay">
        <h1 class="text-2xl">Support : {{ support.name }}</h1>
        <SvgDisplayer :svg_path="support.img" />
    </div>
</template>
