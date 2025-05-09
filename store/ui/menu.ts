export const useMenuStore = defineStore('menu', () => {
  const isOpened = ref(false)

  function toggle() {
    isOpened.value = !isOpened.value
  }

  function close() {
    isOpened.value = false
  }

  function open() {
    isOpened.value = true
  }

  return { isOpened, toggle, close, open }
})
