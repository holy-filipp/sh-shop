<template>
  <UContainer class="mt-4">
    <div class="text-lg font-medium">Корзина</div>
    <Loader v-if="isLoading" size="md" />
    <div v-if="cartItems.length === 0" class="mt-12 flex flex-col items-center gap-4">
      <div class="flex items-center gap-4">
        <UIcon name="i-lucide-brush-cleaning" class="size-14" />
        <div class="text-center text-lg">Ваша корзина пуста, отправляйтесь за покупками</div>
      </div>
      <UButton icon="i-lucide-store" to="/shop">Перейти в магазин</UButton>
    </div>
    <div
      v-if="goods && cartItems.length > 0"
      :class="twMerge('mt-4 flex flex-col gap-4 transition-opacity', isFetching && 'opacity-50')"
    >
      <CartItem v-for="item in goods.data" :key="item.documentId" :data="item" />
    </div>
    <UCard class="mt-4" v-if="goods && cartItems.length > 0">
      <template #header> <div class="text-lg font-medium">Сводная информация</div> </template>
      <div class="flex items-center justify-between">
        Товаров на сумму:
        <div>{{ subTotal }}₽</div>
      </div>
      <div class="flex items-center justify-between">
        Скидка:
        <div>{{ discountPercent === 0 ? '-' : `${discountPercent}% - ${discount}₽` }}</div>
      </div>
      <template #footer>
        <div class="flex flex-col gap-4 md:flex-row md:justify-between">
          <div class="flex items-center gap-2 text-lg font-medium">
            Итого:
            <div>{{ total }}₽</div>
          </div>
          <UButton v-if="!auth.isAuthorized()" class="justify-center" icon="i-lucide-log-in" to="/auth/login"
            >Войдите для оформления</UButton
          >
          <UButton v-else class="justify-center" icon="i-lucide-file-up" to="/create-order"
            >Перейти к оформлению</UButton
          >
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
<script lang="ts" setup>
import { useGoodsByIds } from '~/composables/useGoodsByIds'
import { useCartStore } from '~/store/cart'
import { twMerge } from 'tailwind-merge'
import { useAuthStore } from '~/store/auth'

const cart = useCartStore()
const auth = useAuthStore()
const cartItems = cart.getItemsIds()
const { goods, isLoading, error, isFetching } = useGoodsByIds(cartItems)
useErrorHandler(error)

const subTotal = computed(() => {
  if (!goods.value) {
    return 0
  }

  let sum = 0

  goods.value.data.forEach((item) => {
    sum += item.price * cart.get(item.documentId)
  })

  return sum
})
const discountPercent = ref(0) // TODO
const discount = computed(() => {
  return Math.floor(subTotal.value * (discountPercent.value / 100))
})
const total = computed(() => {
  return subTotal.value - discount.value
})
</script>
