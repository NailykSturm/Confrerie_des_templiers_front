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
    There are nothing to see
    {{ dataToDisplay }}
</template>
