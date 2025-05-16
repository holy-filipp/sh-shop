import { useQuery } from '@tanstack/vue-query'
import { goodApi } from '~/api/good'

export function useGoodsByIds(ids: ComputedRef<string[]>) {
  const {
    data: goods,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    ...goodApi.getGoodsByIdsQueryOptions(ids),
    enabled: computed(() => ids.value.length > 0),
  })

  return { goods, isLoading, error, isFetching }
}
