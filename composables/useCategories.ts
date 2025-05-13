import { useQuery } from '@tanstack/vue-query'
import { categoryApi } from '~/api/category'
import type { NavigationMenuItem } from '#ui/components/NavigationMenu.vue'

export function useCategories() {
  const { data, error, isLoading } = useQuery(categoryApi.getCategoriesQueryOptions())
  const categories = computed(() => {
    if (!data.value) return []

    const rawData = data.value.data.slice()

    const categoryMap = new Map<string, NavigationMenuItem>()

    rawData.forEach((category) => {
      categoryMap.set(category.label, {
        label: category.label,
        icon: category.icon ? `i-lucide-${category.icon}` : undefined,
        children: [],
      } as NavigationMenuItem)
    })

    const rootItems: NavigationMenuItem[] = []

    rawData.forEach((category) => {
      if (!category.parent) {
        const item = categoryMap.get(category.label)
        if (item) {
          rootItems.push(item)
        }
      } else {
        const parentItem = categoryMap.get(category.parent.label)
        const childItem = categoryMap.get(category.label)
        if (parentItem && childItem) {
          parentItem.children!.push(childItem)
        }
      }
    })

    return rootItems
  })

  return { categories, error, isLoading }
}
