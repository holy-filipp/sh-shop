<template>
  <div
    class="bg-default border-muted fixed mt-2 h-[calc(100dvh-100%-theme(spacing.2))] w-full overflow-auto border-t-1 border-b-2"
  >
    <UContainer class="flex flex-col gap-3 p-6">
      <div>
        <UDropdownMenu v-if="auth.isAuthorized()" :items="dropdown" :content="{ align: 'start' }">
          <UButton icon="i-lucide-menu">{{ displayName }}</UButton>
        </UDropdownMenu>
        <UButton v-else icon="i-lucide-log-in" to="/auth/login">Войти</UButton>
      </div>
      <UNavigationMenu :items="nav" orientation="vertical" />
    </UContainer>
  </div>
</template>
<script lang="ts" setup>
import type { NavigationMenuItem } from '#ui/components/NavigationMenu.vue'
import type { DropdownMenuItem } from '#ui/components/DropdownMenu.vue'
import { useMenuStore } from '~/store/ui/menu'
import { useAuthStore } from '~/store/auth'

const auth = useAuthStore()
const displayName = computed(() => {
  if (auth.user) {
    return auth.user.name ?? auth.user.email
  }

  return 'Не авторизирован'
})

defineProps<{
  nav: NavigationMenuItem[]
  dropdown: DropdownMenuItem[]
}>()
const menu = useMenuStore()
const route = useRoute()

watch(
  () => route.path,
  () => {
    menu.close()
  }
)
</script>
