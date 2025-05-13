import { useMutation } from '@tanstack/vue-query'
import { authApi } from '~/api/auth'
import type { FormSubmitEvent } from '#ui/types'
import { jwtStorage } from '~/utils/jwt'
import { ApiError } from '~/transport/http/client'
import type { SignUpSchema } from '~/components/Auth/SignUp.vue'
import { useAuthStore } from '~/store/auth'

export function useSignup() {
  const { mutateAsync } = useMutation({
    mutationFn: authApi.signup,
  })
  const toast = useToast()
  const router = useRouter()
  const auth = useAuthStore()

  const handleSubmit = async (event: FormSubmitEvent<SignUpSchema>) => {
    try {
      const r = await mutateAsync({
        email: event.data.email,
        username: event.data.email,
        password: event.data.password,
        phone: event.data.phone,
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
      auth.set(r.user)
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
