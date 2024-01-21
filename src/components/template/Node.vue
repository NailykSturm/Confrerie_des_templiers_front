<script setup lang="ts">
    import { Node } from "../../types/Node";
    import { dataToDisplay } from "../../vuex-store/useGraph";

    const node: Node = <Node>dataToDisplay.value;
</script>

<template>
    <div v-if="dataToDisplay">
        <h1 class="text-2xl">{{ node.type }} : {{ node.name }}</h1>
    </div>
</template>
