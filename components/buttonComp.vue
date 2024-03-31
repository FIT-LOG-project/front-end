<template>
  <button
    type="button"
    class="border text-xl border-blue-600 bg-blue-600 text-white p-1 rounded"
  >
    {{ text }}
  </button>
</template>
<script setup lang="ts">
defineProps<{
    text: string
}>()

</script>
<style lang="">
    
</style>