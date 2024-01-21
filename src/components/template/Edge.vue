<script setup lang="ts">
    import { dataToDisplay } from "../../vuex-store/useGraph";
</script>

<template>
    <div v-if="dataToDisplay">
        <h1 class="text-2xl">Edge : {{ dataToDisplay.toString() }}</h1>
        <div v-for="(value, key) in dataToDisplay.getAttributes()">
            <li>{{ key }}: {{ value }}</li>
        </div>
    </div>
</template>
