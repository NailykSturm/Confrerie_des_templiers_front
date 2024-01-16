<script setup lang="ts">
  import { ref } from "vue";

  defineProps<{ msg: string }>();

  const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="card max-w-6xl">
    <button class="btn btn-primary" type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>
