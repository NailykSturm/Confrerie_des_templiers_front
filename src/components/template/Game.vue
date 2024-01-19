<script setup lang="ts">
    import useGraph from "../../composables/useGraph";

    const { dataToDisplay } = useGraph();
</script>

<template>
    <div v-if="dataToDisplay">
        <h1 class="text-2xl">Game : {{ dataToDisplay.toString() }}</h1>
        <div v-for="(value, key) in dataToDisplay.getAttributes()">
            <li>{{ key }}: {{ value }}</li>
        </div>
    </div>
</template>
