<template>
  <div class="bg-default ring-default flex items-center gap-3 rounded-lg p-4 ring">
    <div class="flex w-full gap-3">
      <div class="flex shrink-0 items-center justify-center">
        <img v-if="thumbnail" :src="thumbnail" alt="Thumbnail" class="h-24 w-24 bg-contain" />
        <div v-else>Медиа файлов не найдено</div>
      </div>
      <div class="flex grow flex-col justify-center gap-2">
        <div class="font-medium text-balance">{{ data.name }}</div>
        <div class="text-lg font-bold">{{ data.price }}₽</div>
        <CartWidget class="md:hidden" :good-id="data.documentId" />
      </div>
    </div>
    <CartWidget :good-id="data.documentId" class="hidden md:block" />
  </div>
</template>
<script lang="ts" setup>
import type { ISimplifiedGoodDto } from '~/api/good'
import CartItemDetails from '~/components/Cart/CartItemDetails.vue'

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
