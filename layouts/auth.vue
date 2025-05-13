<template>
  <div class="flex h-dvh w-dvw flex-col items-center justify-center">
    <ULink class="flex flex-col items-center justify-center" to="/">
      <UIcon name="i-custom-logo-full" class="h-24 w-64" />
    </ULink>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'

const auth = useAuthStore()
const router = useRouter()

if (auth.user) {
  await router.push({
    path: "/"
  })
}
</script>
