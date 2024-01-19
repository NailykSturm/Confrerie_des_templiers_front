<script lang="ts">
    import { defineComponent } from "vue";
    import useGraph from "../../composables/useGraph";

    export default defineComponent({
        name: "Node",
        setup() {
            const { dataToDisplay } = useGraph();
            return { dataToDisplay };
        },
    });
</script>

<template>
    <div>
        <h1 class="text-2xl">Node {{ dataToDisplay!.toString() }}</h1>
        <div v-for="(value, key) in dataToDisplay!.getAttributes()">
            <li>{{ key }}: {{ value }}</li>
        </div>
    </div>
</template>
