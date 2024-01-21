<script setup lang="ts">
    import { Faction } from "../../types/Faction";
    import useGraph from "../../composables/useGraph";
    import SvgDisplayer from "../SvgDisplayer.vue";

    const { dataToDisplay } = useGraph();
    const faction: Faction = <Faction>dataToDisplay.value;
</script>

<template>
    <div v-if="dataToDisplay">
        <h1 class="text-2xl">Faction : {{ faction.name }}</h1>
        <div>{{ faction.description }}</div>
        <SvgDisplayer :svg_path="faction.img" />
    </div>
</template>
