import { queryOptions, keepPreviousData } from '@tanstack/vue-query'
import { client } from '~/transport/http/client'
import type { IPaginatedResponseDto } from '~/api/category'
import qs from 'qs'

interface IStrapiMediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string
  size: number
  width: number
  height: number
  sizeInBytes: number
}

interface IStrapiMediaItem {
  id: number
  documentId: string
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: {
    large: IStrapiMediaFormat
    small: IStrapiMediaFormat
    medium: IStrapiMediaFormat
    thumbnail: IStrapiMediaFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string
  provider: string
  provider_metadata: unknown
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ISimplifiedGoodDto {
  id: number
  documentId: string
  name: string
  price: number
  category: {
    id: number
    documentId: string
    slug: string
  }
  gallery: IStrapiMediaItem[]
}

export const goodApi = {
  baseKey: 'good',
  getGoodsByCategoryQueryOptions: (category: Ref<string>, page: Ref<number>, pageSize: Ref<number>) =>
    queryOptions({
      queryKey: computed(() => [goodApi.baseKey, 'by', 'category', category.value, page.value, pageSize.value]),
      queryFn: (meta) =>
        client.request<IPaginatedResponseDto<ISimplifiedGoodDto[]>>(
          `api/goods?fields[0]=name&fields[1]=price&populate[category][fields][0]=slug&populate[gallery][fields][1]=*&filters[category][slug][$eq]=${category.value}&pagination[page]=${page.value}&pagination[pageSize]=${pageSize.value}`,
          {
            signal: meta.signal,
          }
        ),
    }),
  getGoodsByIdsQueryOptions: (ids: ComputedRef<string[]>) =>
    queryOptions({
      placeholderData: keepPreviousData,
      queryKey: computed(() => [goodApi.baseKey, 'by', 'ids', ids.value]),
      queryFn: (meta) => {
        const query = qs.stringify(
          {
            filters: {
              documentId: {
                $in: ids.value,
              },
            },
            fields: ['name', 'price'],
            populate: {
              category: {
                fields: ['slug'],
              },
              gallery: {
                fields: ['*'],
              },
            },
            pagination: {
              page: 1,
              pageSize: 100,
            },
          },
          {
            encodeValuesOnly: true,
          }
        )

        return client.request<IPaginatedResponseDto<ISimplifiedGoodDto[]>>(`api/goods?${query}`, {
          signal: meta.signal,
        })
      },
    }),
  getGoodByIdQueryOptions: (id: ComputedRef<string>) =>
    queryOptions({
      placeholderData: keepPreviousData,
      queryKey: computed(() => [goodApi.baseKey, 'by', 'ids', id.value]),
      queryFn: (meta) =>
        client.request<IPaginatedResponseDto<ISimplifiedGoodDto[]>>(`api/good/${computed(() => id.value)}?populate=*`, {
          signal: meta.signal,
        }),
    }),
}
