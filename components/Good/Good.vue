<template>
  <UContainer>
    <div>{{ goodId }}</div>
  </UContainer>
</template>
<script lang="ts" setup>
const props = defineProps<{
  goodId: string
}>()
</script>
