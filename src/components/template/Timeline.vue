<script setup lang="ts">
    import { ref } from "vue";
    import axios from "axios";

    import { dataToDisplay } from "../../vuex-store/useGraph";
    import { Timeline } from "../../types/Timeline";
    import { WIKI_DESC } from "../../vite-env";

    const timeline: Timeline = <Timeline>dataToDisplay.value;
    const desc = ref("");

    axios
        .get(`${WIKI_DESC(timeline.name)}`)
        .then((res) => {
            desc.value = res.data.query.pages[0].extract;
        })
        .catch((err) => {
            console.log(err);
        });
</script>

<template>
    <div v-if="dataToDisplay">
        <h1 class="text-2xl">Timeline : {{ timeline.name }}</h1>
        <div>[{{ timeline.begin }} - {{ timeline.end }}]</div>
        <div v-if="desc">{{ desc }}</div>
    </div>
</template>
