<script setup lang="ts">
    import { Character } from "../../types/Character";
    import useGraph from "../../composables/useGraph";
    import SvgDisplayer from "../SvgDisplayer.vue";

    const { dataToDisplay } = useGraph();
    const character: Character = <Character>dataToDisplay.value;
</script>

<template>
    <div v-if="dataToDisplay">
        <h1 class="text-2xl">Personnage : {{ character.name }}</h1>
        <SvgDisplayer :svg_path="character.img" />
    </div>
</template>
