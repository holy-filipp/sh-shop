import { useMutation } from '@tanstack/vue-query'
import { authApi } from '~/api/auth'
import type { FormSubmitEvent } from '#ui/types'
import type { LogInSchema } from '~/components/Auth/Login.vue'
import { jwtStorage } from '~/utils/jwt'
import { ApiError } from '~/transport/http/client'

export function useLogin() {
  const { mutateAsync } = useMutation({
    mutationFn: authApi.login,
  })
  const toast = useToast()
  const router = useRouter()

  const handleSubmit = async (event: FormSubmitEvent<LogInSchema>) => {
    try {
      const r = await mutateAsync({
        identifier: event.data.email,
        password: event.data.password,
      })

      jwtStorage.set(r.jwt, !event.data.remember)
      toast.add({
        title: 'Успешный вход',
        description: `Привет ${r.user.email}`,
        color: 'success',
      })
      router.push({
        path: '/',
      })
    } catch (e) {
      if (e instanceof ApiError) {
        toast.add({
          title: 'Ошибка',
          description: e.message,
          color: 'error',
        })

        jwtStorage.cleanup()
      }
    }
  }

  return { handleSubmit }
}
