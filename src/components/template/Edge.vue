<script setup lang="ts">
    import useGraph from "../../composables/useGraph";

    const { dataToDisplay } = useGraph();
</script>

<template>
    <div>
        <h1 class="text-2xl">EDGE {{ dataToDisplay!.toString() }}</h1>
        <div v-for="(value, key) in dataToDisplay!.getAttributes()">
            <li>{{ key }}: {{ value }}</li>
        </div>
    </div>
</template>
