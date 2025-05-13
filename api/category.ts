import { queryOptions } from '@tanstack/vue-query'
import { client } from '~/transport/http/client'

interface IPaginatedResponseDto<T> {
  data: T
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface ICategoryDto {
  id: number
  documentId: string
  icon: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  label: string
  parent?: ICategoryDto
}

export const categoryApi = {
  baseKey: 'category',
  getCategoriesQueryOptions: () =>
    queryOptions({
      queryKey: [categoryApi.baseKey, 'categories'],
      queryFn: (meta) =>
        client.request<IPaginatedResponseDto<ICategoryDto[]>>('api/categories?populate=*&pagination[pageSize]=1000', {
          signal: meta.signal,
        }),
    }),
}
