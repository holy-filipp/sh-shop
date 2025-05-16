<template>
  <div class="flex flex-col">
    <UButton
      v-if="!cart.isExists(goodId)"
      @click="cart.add(goodId)"
      icon="i-lucide-shopping-cart"
      class="justify-center"
      >В корзину</UButton
    >
    <div class="flex items-center gap-2" v-else>
      <UInputNumber v-model="cart.items[goodId]" :min="1" :max="10" class="w-full" />
      <UButton icon="i-lucide-trash" color="error" variant="subtle" @click="cart.remove(goodId)" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCartStore } from '~/store/cart'

defineProps<{
  goodId: string
}>()

const cart = useCartStore()
</script>
