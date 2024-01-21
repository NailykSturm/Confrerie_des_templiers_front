<script setup lang="ts">
    defineProps({
        svg_path: {
            type: String,
            required: true,
        },
    });
</script>

<template>
    <div class="svg-displayer" v-if="svg_path != ''">
        <img :src="svg_path" class="w-28 h-28" alt="Too bad ..." />
    </div>
</template>
