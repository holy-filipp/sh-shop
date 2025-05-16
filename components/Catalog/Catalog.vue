<template>
  <UContainer>
    <Loader v-if="isLoading" size="md" />
    <div v-if="goods" class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <GoodCard v-for="good in goods.data" :key="good.documentId" :data="good" />
    </div>
  </UContainer>
</template>
<script lang="ts" setup>
import { useGoodsByCategory } from '~/composables/useGoodsByCategory'

const props = defineProps<{
  path: string[] | string
}>()
const category = computed(() => (typeof props.path === 'string' ? props.path : props.path[props.path.length - 1]))

const { goods, isLoading, error } = useGoodsByCategory(category, ref(1), ref(25))
useErrorHandler(error)
</script>
