<script setup lang="ts">
    import { ref } from "vue";
    import axios from "axios";

    import { Game } from "../../types/Game";
    import { dataToDisplay } from "../../vuex-store/useGraph";
    import SvgDisplayer from "../SvgDisplayer.vue";
    import { WIKI_DESC } from "../../vite-env";

    const game: Game = <Game>dataToDisplay.value;
    const desc = ref("");

    axios
        .post(`${WIKI_DESC(game.name)}`, {
            headers: {
                origin: "*",
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
        <h1 class="text-2xl">Jeu : {{ game.name }}</h1>
        <div>Date de parution : {{ game.date }}</div>
        <SvgDisplayer :svg_path="game.img" />
        <div v-if="desc">{{ desc }}</div>
    </div>
</template>
