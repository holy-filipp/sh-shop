<template>
  <div class="bg-default ring-default flex flex-col gap-3 rounded-lg p-4 ring">
    <ULink class="flex h-full flex-col gap-3" raw :to="`/good/${data.documentId}`">
      <div class="flex h-full flex-col items-center justify-center">
        <img v-if="thumbnail" :src="thumbnail" alt="Thumbnail" class="h-64 bg-contain" />
        <div v-else>Медиа файлов не найдено</div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="font-medium text-balance">{{ data.name }}</div>
        <div class="text-lg font-bold">{{ data.price }}₽</div>
      </div>
    </ULink>
    <CartWidget :good-id="data.documentId" />
  </div>
</template>
<script lang="ts" setup>
import type { ISimplifiedGoodDto } from '~/api/good'

const props = defineProps<{
  data: ISimplifiedGoodDto
}>()

const thumbnail = computed(() => {
  if (!props.data.gallery) {
    return false
  }

  return '/cms' + props.data.gallery[0].url
})
</script>
