<template>
  <UForm :schema="schema" :state="state" class="flex w-64 flex-col gap-3" @submit="handleSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" class="w-full" />
    </UFormField>
    <UFormField label="Телефон" name="phone">
      <UInput v-model="state.phone" class="w-full" />
    </UFormField>
    <UFormField label="Пароль" name="password">
      <UInput v-model="state.password" type="password" class="w-full" />
    </UFormField>
    <UFormField label="Повторите пароль" name="repeatPassword">
      <UInput v-model="state.repeatPassword" type="password" class="w-full" />
    </UFormField>
    <div class="flex flex-col gap-2">
      <UButton type="submit" icon="i-lucide-user-plus" loading-auto class="justify-center">Создать аккаунт</UButton>
      <UCheckbox label="Запомнить меня" name="remember" v-model="state.remember" />
      <div class="flex items-center justify-between">
        Есть аккаунт?
        <ULink to="/auth/login" as="button">Войти</ULink>
      </div>
    </div>
  </UForm>
</template>
<script lang="ts" setup>
import { z } from 'zod'
import parsePhoneNumber from 'libphonenumber-js'
import { useSignup } from '~/composables/useSignup'

const fullPasswordSchema = z
  .string()
  .min(8, 'Минимальная длина пароля 8 символов')
  .max(20, 'Максимальная длина пароля 20 символов')
  .refine((str) => /[A-Z]/.test(str), 'Пароль должен содержать прописаные буквы')
  .refine((str) => /[a-z]/.test(str), 'Пароль должен содержать строчные буквы')
  .refine((str) => /[0-9]/.test(str), 'Пароль должен содержать цифры')

const phoneNumberSchema = z.string().transform((value, ctx) => {
  const phoneNumber = parsePhoneNumber(value, 'RU')

  if (!phoneNumber?.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Неправильный номер телефона',
    })
    return z.NEVER
  }

  return phoneNumber.formatInternational()
})

const schema = z
  .object({
    email: z.string().min(1, 'Это обязательное поле').email('Неправильный email'),
    phone: phoneNumberSchema,
    password: fullPasswordSchema,
    repeatPassword: fullPasswordSchema,
    remember: z.boolean().default(true),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Пароли не совпадают',
    path: ['repeatPassword'],
  })

export type SignUpSchema = z.output<typeof schema>

const state = reactive<Partial<SignUpSchema>>({
  email: '',
  phone: '',
  password: '',
  repeatPassword: '',
  remember: true,
})
const { handleSubmit } = useSignup()
</script>
