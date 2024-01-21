<script setup lang="ts">
    import { Location } from "../../types/Location";
    import { dataToDisplay } from "../../vuex-store/useGraph";
    import SvgDisplayer from "../SvgDisplayer.vue";

    const location: Location = <Location>dataToDisplay.value;
</script>

<template>
    <div v-if="dataToDisplay">
        <h1 class="text-2xl">Localisation : {{ location.name }}</h1>
        <div v-for="img in location.images">
            <SvgDisplayer :svg_path="img" />
        </div>
    </div>
</template>
