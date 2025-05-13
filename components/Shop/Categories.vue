<template>
  <div v-if="categories">
    <UNavigationMenu orientation="vertical" :items="categories" />
  </div>
</template>
<script setup lang="ts">
const { categories } = useCategories()
</script>
