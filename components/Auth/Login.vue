<template>
  <UForm :schema="schema" :state="state" class="flex w-64 flex-col gap-3">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" class="w-full" />
    </UFormField>
    <UFormField label="Пароль" name="password">
      <UInput v-model="state.password" type="password" class="w-full" />
    </UFormField>
    <div class="flex flex-col gap-2">
      <UButton type="submit" icon="i-lucide-log-in" loading-auto class="justify-center">Войти</UButton>
      <UCheckbox label="Запомнить меня" />
      <div class="flex items-center justify-between">
        Нет аккаунта?
        <ULink to="/auth/signup" as="button">Создать</ULink>
      </div>
    </div>
  </UForm>
</template>
<script lang="ts" setup>
import { z } from 'zod'

const fullPasswordSchema = z // should use in sign up
  .string()
  .min(8, 'Минимальная длина пароля 8 символов')
  .max(20, 'Максимальная длина пароля 20 символов')
  .refine((str) => /[A-Z]/.test(str), 'Пароль должен содержать прописаные буквы')
  .refine((str) => /[a-z]/.test(str), 'Пароль должен содержать строчные буквы')
  .refine((str) => /[0-9]/.test(str), 'Пароль должен содержать цифры')

const passwordSchema = z
  .string()
  .min(8, 'Минимальная длина пароля 8 символов')
  .max(20, 'Максимальная длина пароля 20 символов')

const schema = z.object({
  email: z.string().min(1, 'Это обязательное поле').email('Неправильный email'),
  password: passwordSchema,
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: '',
  password: '',
})
</script>
