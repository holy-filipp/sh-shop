<template>
  <UContainer>
    <div class="mt-4 text-lg font-medium">Оформление заказа</div>
    <UForm :schema="schema" :state="state" @submit="handleSubmit">
      <UFormField label="Адрес доставки" name="address">
        <UInput v-model="state.address" />
      </UFormField>
      <UButton type="submit">Ленивое создание</UButton>
    </UForm>
  </UContainer>
</template>
<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  address: z.string(),
})

export type CreateOrderSchema = z.output<typeof schema>

const state = reactive<Partial<CreateOrderSchema>>({
  address: '',
})

const { handleSubmit } = useCreateOrder()
</script>
