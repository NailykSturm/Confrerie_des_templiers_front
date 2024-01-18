<script setup lang="ts">
    import { Ref, onMounted, ref } from "vue";

    import useGraph from "../composables/useGraph";
    const { graphDisplay, refreshGraph, initGraph } = useGraph();

    const chartDom: Ref<HTMLElement | null> = ref(null);
    const drawerToggle: Ref<HTMLInputElement | null> = ref(null);

    onMounted(() => {
        if (drawerToggle.value == null) drawerToggle.value = <HTMLInputElement>document.getElementById("my-drawer-4");
        if (chartDom.value == null) chartDom.value = document.getElementById("graph-canvas");
        console.log(graphDisplay.value);
        console.log(`${chartDom.value?.clientHeight} x ${chartDom.value?.clientWidth}`);
        initGraph(chartDom);
        console.log(graphDisplay.value);
        refreshGraph(drawerToggle);
    });
</script>

<template>
    <div class="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content h-screen w-full">
            <!-- Page content here -->
            <!-- <label for="my-drawer-4" class="drawer-button">Open drawer</label> -->
            <!-- <canvas ref="canvas" id="graph-canvas" class="grow"></canvas> -->
            <div class="h-full w-full" id="graph-canvas"></div>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-4" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <!-- Sidebar content here -->
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
            </ul>
        </div>
    </div>
</template>
