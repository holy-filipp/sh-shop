<template>
  <CreateOrder />
</template>
<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'

const auth = useAuthStore()
const router = useRouter()

if (!auth.isAuthorized()) {
  await router.push('/auth/login')
}
</script>
