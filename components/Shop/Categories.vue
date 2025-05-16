<template>
  <Loader v-if="isLoading" size="md" />
  <div v-if="categories">
    <UNavigationMenu orientation="vertical" :items="categories" />
  </div>
</template>
<script setup lang="ts">
const { categories, isLoading, error } = useCategories()
useErrorHandler(error)
</script>
