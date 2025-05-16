import { useQuery } from '@tanstack/vue-query'
import { categoryApi } from '~/api/category'
import type { NavigationMenuItem } from '#ui/components/NavigationMenu.vue'

export function useCategories() {
  const { data, error, isLoading } = useQuery(categoryApi.getCategoriesQueryOptions())
  const categories = computed(() => {
    if (!data.value) return []

    const rawData = data.value.data.slice()

    const categoryMap = new Map<string, NavigationMenuItem>()
    const slugPaths = new Map<string, string>()

    rawData.forEach((category) => {
      categoryMap.set(category.documentId, {
        label: category.label,
        icon: `i-lucide-${category.icon}`,
        to: '',
        children: [],
      } as NavigationMenuItem)
      slugPaths.set(category.documentId, category.slug)
    })

    const rootItems: NavigationMenuItem[] = []

    rawData.forEach((category) => {
      const item = categoryMap.get(category.documentId)!

      if (!category.parent) {
        item.to = `/shop/${category.slug}`
        rootItems.push(item)
      } else {
        const parentItem = categoryMap.get(category.parent.documentId)
        if (parentItem) {
          const parentPath = slugPaths.get(category.parent.documentId) || ''
          const fullPath = `${parentPath}/${category.slug}`
          slugPaths.set(category.documentId, fullPath)
          item.to = `/shop/${fullPath}`
          parentItem.children!.push(item)
        }
      }
    })

    return rootItems
  })

  return { categories, error, isLoading }
}
