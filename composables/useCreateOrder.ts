import { type ICreateOrderDto, orderApi } from '~/api/order'
import { useMutation } from '@tanstack/vue-query'
import type { FormSubmitEvent } from '#ui/types'
import type { CreateOrderSchema } from '~/components/CreateOrder/CreateOrder.vue'
import { jwtStorage } from '~/utils/jwt'
import { ApiError } from '~/transport/http/client'
import { useCartStore } from '~/store/cart'

export function useCreateOrder() {
  const { mutateAsync } = useMutation({
    mutationFn: orderApi.createOrder,
  })
  const router = useRouter()
  const toast = useToast()
  const cart = useCartStore()

  const handleSubmit = async (event: FormSubmitEvent<CreateOrderSchema>) => {
    try {
      const r = await mutateAsync({
        deliveryAddress: event.data.address,
        goods: cart.items,
        total: 1337,
      })

      toast.add({
        title: 'Заказ успешно создан',
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
      }
    }
  }

  return { handleSubmit }
}
