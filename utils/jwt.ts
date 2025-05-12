import { useLocalStorage, useSessionStorage } from '@vueuse/core'

export const jwtStorage = {
  get: () => {
    const session = useSessionStorage('jwt', '')
    const storage = useLocalStorage('jwt', '')

    return storage.value != '' ? storage.value : session.value
  },
  set: (key: string, isSession?: boolean) => {
    if (isSession) {
      const token = useSessionStorage('jwt', '')
      token.value = key

      return
    }

    const token = useLocalStorage('jwt', '')
    token.value = key
  },
  cleanup: () => {
    const session = useSessionStorage('jwt', '')
    const storage = useLocalStorage('jwt', '')

    session.value = ''
    storage.value = ''
  },
}
