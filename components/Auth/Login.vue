<template>
  <UForm :schema="schema" :state="state" class="flex w-64 flex-col gap-3" @submit="handleSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" class="w-full" />
    </UFormField>
    <UFormField label="Пароль" name="password">
      <UButtonGroup class="w-full">
        <UInput v-model="state.password" :type="passwordFieldType" class="w-full" />
        <UButton :icon="passwordFieldIcon" variant="subtle" color="neutral" @click="showPassword = !showPassword" />
      </UButtonGroup>
    </UFormField>
    <div class="flex flex-col gap-2">
      <UButton type="submit" icon="i-lucide-log-in" loading-auto class="justify-center">Войти</UButton>
      <UCheckbox label="Запомнить меня" v-model="state.remember" name="remember" />
      <div class="flex items-center justify-between">
        Нет аккаунта?
        <ULink to="/auth/signup" as="button">Создать</ULink>
      </div>
    </div>
  </UForm>
</template>
<script lang="ts" setup>
import { z } from 'zod'
import { useLogin } from '~/composables/useLogin'

const passwordSchema = z
  .string()
  .min(8, 'Минимальная длина пароля 8 символов')
  .max(20, 'Максимальная длина пароля 20 символов')

const schema = z.object({
  email: z.string().min(1, 'Это обязательное поле').email('Неправильный email'),
  password: passwordSchema,
  remember: z.boolean().default(true),
})

export type LogInSchema = z.output<typeof schema>

const state = reactive<Partial<LogInSchema>>({
  email: '',
  password: '',
  remember: true,
})

const showPassword = ref(false)
const passwordFieldType = computed(() => (showPassword.value ? 'text' : 'password'))
const passwordFieldIcon = computed(() => (showPassword.value ? 'i-lucide-eye-closed' : 'i-lucide-eye'))
const { handleSubmit } = useLogin()
</script>
