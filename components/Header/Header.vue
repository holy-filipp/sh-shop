<template>
  <header class="border-muted sticky top-0 right-0 left-0 z-100 border-b-1 bg-transparent backdrop-blur-sm">
    <UContainer class="flex items-center justify-between">
      <ULink class="flex flex-col items-center justify-center" to="/">
        <UIcon name="i-custom-logo-full" class="h-16 w-48" />
      </ULink>
      <UButton
        :icon="menu.isOpened ? 'i-lucide-x' : 'i-lucide-menu'"
        color="neutral"
        variant="ghost"
        class="md:hidden"
        @click="menu.toggle"
      />
      <UNavigationMenu highlight highlight-color="primary" :items="NAV_ITEMS" class="hidden md:flex" />
      <div class="hidden items-center gap-2 md:flex">
        <UDropdownMenu v-if="auth.isAuthorized()" :items="DROPDOWN_ITEMS" :content="{ align: 'end' }">
          <UButton icon="i-lucide-menu">{{ displayName }}</UButton>
        </UDropdownMenu>
        <UButton v-else icon="i-lucide-log-in" to="/auth/login">Войти</UButton>
        <UChip :text="1" size="3xl">
          <UButton icon="i-lucide-shopping-cart" variant="soft" />
        </UChip>
      </div>
    </UContainer>
    <HeaderMenu v-if="menu.isOpened" :nav="NAV_ITEMS" :dropdown="DROPDOWN_ITEMS" />
  </header>
</template>
<script lang="ts" setup>
import type { NavigationMenuItem } from '#ui/components/NavigationMenu.vue'
import type { DropdownMenuItem } from '#ui/components/DropdownMenu.vue'
import { useMenuStore } from '~/store/ui/menu'
import { useAuthStore } from '~/store/auth'

const auth = useAuthStore()
const menu = useMenuStore()
const displayName = computed(() => {
  if (auth.user) {
    return auth.user.name ?? auth.user.email
  }

  return 'Не авторизирован'
})

const NAV_ITEMS: NavigationMenuItem[] = [
  {
    label: 'Главная',
    to: '/',
    icon: 'i-lucide-home',
  },
  {
    label: 'Магазин',
    to: '/shop',
    icon: 'i-lucide-store',
  },
]

const DROPDOWN_ITEMS: DropdownMenuItem[] = [
  {
    label: 'Профиль',
    icon: 'i-lucide-user',
  },
  {
    label: 'Выйти из аккаунта',
    icon: 'i-lucide-log-out',
    color: 'error',
    onSelect: () => {
      auth.logout()
      jwtStorage.cleanup()
    },
  },
]
</script>
