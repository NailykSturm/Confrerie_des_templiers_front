<script setup lang="ts">
    import { Game } from "../../types/Game";
    import { dataToDisplay } from "../../vuex-store/useGraph";
    import SvgDisplayer from "../SvgDisplayer.vue";

    const game: Game = <Game>dataToDisplay.value;
</script>

<template>
    <div v-if="dataToDisplay">
        <h1 class="text-2xl">Jeu : {{ game.name }}</h1>
        <div>Date de parution : {{ game.date }}</div>
        <SvgDisplayer :svg_path="game.img" />
    </div>
</template>
