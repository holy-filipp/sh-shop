import { useQuery } from '@tanstack/vue-query'
import { goodApi } from '~/api/good'

export function useGoodsByCategory(category: Ref<string>, page: Ref<number>, pageSize: Ref<number>) {
  const { data: goods, isLoading, error } = useQuery(goodApi.getGoodsByCategoryQueryOptions(category, page, pageSize))

  return { goods, isLoading, error }
}
