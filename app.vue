<template>
  <NuxtLayout>
    <UApp>
      <NuxtPage />
    </UApp>
  </NuxtLayout>
  <VueQueryDevtools />
</template>
<script setup lang="ts">
import { useMenuStore } from '~/store/ui/menu'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const colorMode = useColorMode()

colorMode.preference = 'light'

const menu = useMenuStore()

watch(
  () => menu.isOpened,
  (blockScroll) => {
    if (blockScroll) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)
</script>
