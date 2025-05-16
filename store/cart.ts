import { useLocalStorage } from '@vueuse/core'

export const useCartStore = defineStore('cart', () => {
  const items = useLocalStorage<Record<string, number>>('cart', {})

  function add(goodId: string) {
    unref(items)[goodId] = 1
  }

  function remove(goodId: string) {
    delete unref(items)[goodId]
  }

  function get(goodId: string) {
    return unref(items)[goodId]
  }

  function isExists(goodId: string) {
    return unref(items)[goodId] === 0 || unref(items)[goodId]
  }

  function itemsInCart() {
    return Object.keys(items.value).length
  }

  function getItemsIds() {
    return computed(() => Object.keys(items.value))
  }

  return { add, remove, get, items, isExists, itemsInCart, getItemsIds }
})
