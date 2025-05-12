import { useQueryClient } from '@tanstack/vue-query'
import { authApi } from '~/api/auth'
import { useAuthStore } from '~/store/auth'

export default defineNuxtPlugin(async () => {
  const queryClient = useQueryClient()
  const auth = useAuthStore()

  try {
    const data = await queryClient.fetchQuery(authApi.getMeQueryOptions())

    auth.set(data)
  } catch {
    return
  }
})