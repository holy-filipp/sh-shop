<template>
  <div class="flex flex-col justify-between gap-2">
    <div class="font-medium text-balance">{{ data.name }}</div>
    <div class="text-lg font-bold">{{ data.price }}₽</div>
    <CartWidget :good-id="data.documentId" />
  </div>
</template>
<script lang="ts" setup>
import type { ISimplifiedGoodDto } from '~/api/good'

defineProps<{
  data: ISimplifiedGoodDto
}>()
</script>
