<template>
  <div
    class="bg-default border-muted fixed mt-2 h-[calc(100dvh-100%-theme(spacing.2))] w-full overflow-auto border-t-1 border-b-2"
  >
    <UContainer class="p-5">
      <UNavigationMenu :items="items" orientation="vertical" />
    </UContainer>
  </div>
</template>
<script lang="ts" setup>
import type { NavigationMenuItem } from '#ui/components/NavigationMenu.vue'

const props = defineProps<{
  items: NavigationMenuItem[]
}>()
</script>
