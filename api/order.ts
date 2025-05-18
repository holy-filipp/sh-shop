import { client } from '~/transport/http/client'

export interface ICreateOrderDto {
  deliveryAddress: string
  goods: Record<string, number>
  total: number
}

export interface IOrderDto {
  id: number
  documentId: string
  deliveryAddress: string
  total: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: null
  goods: []
}

export const orderApi = {
  baseKey: 'order',
  createOrder: (data: ICreateOrderDto) =>
    client.request<IOrderDto>('api/orders', {
      method: 'POST',
      json: { data },
    }),
}
