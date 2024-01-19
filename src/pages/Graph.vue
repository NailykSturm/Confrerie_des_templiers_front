<script setup lang="ts">
    import { Ref, onMounted, ref } from "vue";

    import useGraph from "../composables/useGraph";
    const { componentToDisplay, refreshGraph, initGraph } = useGraph();

    const chartDom: Ref<HTMLElement | null> = ref(null);
    const drawerToggle: Ref<HTMLInputElement | null> = ref(null);

    onMounted(() => {
        if (drawerToggle.value == null) drawerToggle.value = <HTMLInputElement>document.getElementById("my-drawer-4");
        if (chartDom.value == null) chartDom.value = document.getElementById("graph-canvas");
        initGraph(chartDom, drawerToggle);
        refreshGraph();
    });
</script>

<template>
    <div class="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content h-full w-full">
            <!-- Page content here -->
            <div class="h-full w-full bg-base-100" id="graph-canvas"></div>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu p-4 w-4/6 min-h-full bg-base-200 text-base-content">
                <!-- Sidebar content here -->
                <!-- <template v-if="componentToDisplay != null"> -->
                <!-- <component :is="componentToDisplay" /> -->
                <componentToDisplay />
                <!-- </template> -->
            </ul>
        </div>
    </div>
</template>
