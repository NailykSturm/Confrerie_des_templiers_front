<script setup lang="ts">
    import { dataToDisplay } from "../../vuex-store/useGraph";
    import { Timeline } from "../../types/Timeline";

    const timeline: Timeline = <Timeline>dataToDisplay.value;
</script>

<template>
    <div v-if="dataToDisplay">
        <h1 class="text-2xl">Timeline : {{ timeline.name }}</h1>
        <div>[{{ timeline.begin }} - {{ timeline.end }}]</div>
    </div>
</template>
