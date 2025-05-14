<template>
  <div class="mt-12 flex flex-col items-center">
    <div :class="computedClass" />
  </div>
</template>
<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

const SIZES = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
}
const props = withDefaults(
  defineProps<{
    size?: keyof typeof SIZES
  }>(),
  {
    size: 'sm',
  }
)
const computedClass = computed(() => twMerge('animate-spin rounded-full border-b-transparent', SIZES[props.size]))
</script>
