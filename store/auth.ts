import { defineStore } from 'pinia'
import type { IUserDto } from '~/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUserDto>()

  function set(o: IUserDto) {
    user.value = o
  }

  function isAuthorized() {
    return !!user.value
  }

  function logout() {
    user.value = undefined
  }

  return { set, user, isAuthorized, logout }
})