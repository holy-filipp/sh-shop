import { useQuery } from '@tanstack/vue-query'
import { goodApi } from '~/api/good'

export function useGoodById(id: string) {
  const { data: good, isLoading, error } = useQuery(goodApi.getGoodByIdQueryOptions(id))

  return { good, isLoading, error }
}
