<template>
  <UContainer>
    <Loader v-if="isLoading" size="md" />
    <div v-if="good" class="mt-4 flex flex-col gap-4">
      <div class="text-lg font-medium">{{ good.data.name }}</div>
      <div class="mt-4 flex flex-col gap-4">
        <div class="flex flex-col items-center md:flex-row md:items-start md:gap-12">
          <UCarousel class="max-w-xs" :items="images" arrows dots v-slot="{ item }">
            <img :src="item" class="w-96" alt="Nope" />
          </UCarousel>
          <div class="hidden flex-col gap-2 md:flex">
            <div class="text-lg font-bold">{{ good.data.price }}₽</div>
            <CartWidget :good-id="good.data.documentId" />
          </div>
        </div>
        <div class="mt-6 flex flex-col gap-2 md:hidden">
          <div class="text-lg font-bold">{{ good.data.price }}₽</div>
          <CartWidget :good-id="good.data.documentId" />
        </div>
      </div>
      <div class="text-lg font-medium md:mt-6">Описание товара</div>
      <div>
        <StrapiBlocks :content="good.data.description" />
      </div>
    </div>
  </UContainer>
</template>
<script lang="ts" setup>
import { StrapiBlocks } from 'vue-strapi-blocks-renderer'

const props = defineProps<{
  goodId: string
}>()

const { good, isLoading, error } = useGoodById(props.goodId)
useErrorHandler(error)

const images = computed(() => {
  if (!good.value) {
    return
  }

  return good.value.data.gallery.map((el) => `/cms${el.url}`)
})
</script>
