<template>
  <Loader v-if="isLoading" size="md" />
  <div v-if="categories">
    <UNavigationMenu orientation="vertical" :items="categories" />
  </div>
</template>
<script setup lang="ts">
const { categories, isLoading, error } = useCategories()
const toast = useToast()

watch(error, (newError) => {
  if (!newError) {
    return
  }

  toast.add({
    title: 'Ошибка',
    color: 'error',
    description: newError?.message,
  })
})
</script>
