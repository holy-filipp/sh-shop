<template>
  <div
    class="bg-default border-muted fixed mt-2 h-[calc(100dvh-100%-theme(spacing.2))] w-full overflow-auto border-t-1 border-b-2"
  >
    <UContainer class="flex flex-col gap-3 p-6">
      <div>
        <UDropdownMenu v-if="TEST_LOGGED_IN" :items="dropdown" :content="{ align: 'start' }">
          <UButton icon="i-lucide-menu">Филипп А.</UButton>
        </UDropdownMenu>
        <UButton icon="i-lucide-log-in" to="/auth/login" v-else>Войти</UButton>
      </div>
      <UNavigationMenu :items="nav" orientation="vertical" />
    </UContainer>
  </div>
</template>
<script lang="ts" setup>
import type { NavigationMenuItem } from '#ui/components/NavigationMenu.vue'
import type { DropdownMenuItem } from '#ui/components/DropdownMenu.vue'
import { useMenuStore } from '~/store/ui/menu'

const TEST_LOGGED_IN: boolean = true

const props = defineProps<{
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
