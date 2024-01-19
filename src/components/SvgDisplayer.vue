<script setup lang="ts">
  defineProps({
    svg_path: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <div class="svg-displayer">
    <img :src="svg_path" alt="Too bad ..." />
  </div>
</template>
