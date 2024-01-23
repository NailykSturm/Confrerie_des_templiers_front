<script setup lang="ts">
    import axios from "axios";
    import { ref } from "vue";
    import { WIKI_DESC } from "../../vite-env";

    import { Location } from "../../types/Location";
    import { dataToDisplay } from "../../vuex-store/useGraph";
    import SvgDisplayer from "../SvgDisplayer.vue";

    const location: Location = <Location>dataToDisplay.value;
    const desc = ref("");

    axios
        .get(`${WIKI_DESC}`, {
            headers: {
                Accept: '*/*',
                'User-Agent': 'axios/1.3.5',
                'Access-Control-Allow-Origin': "*"
            },
            data: {
                origin: "*",
                action: "query",
                meta: "tokens",
                format: "json",
            },
        })
        .then((res) => {
            desc.value = res.data.query.pages[0].extract;
        })
        .catch((err) => {
            console.log(err);
        });
</script>

<template>
    <div v-if="dataToDisplay">
        <h1 class="text-2xl">Localisation : {{ location.name }}</h1>
        <div v-for="img in location.images">
            <SvgDisplayer :svg_path="img" />
        </div>
        <div v-if="desc">{{ desc }}</div>
    </div>
</template>
