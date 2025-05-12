import { client } from '~/transport/http/client'

interface IAuthLogIn {
  identifier: string
  password: string
}

interface IUserDto {
  id: number
  documentId: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  phone: string
}

interface IAuthResponseDto {
  jwt: string
  user: IUserDto
}

interface IAuthSignUp {
  email: string
  username: string
  phone: string
  password: string
}

export const authApi = {
  baseKey: 'auth',
  login: (data: IAuthLogIn) => {
    return client.request<IAuthResponseDto>('api/auth/local', {
      method: 'POST',
      json: data,
    })
  },
  signup: (data: IAuthSignUp) => {
    return client.request<IAuthResponseDto>('api/auth/local/register', {
      method: 'POST',
      json: data,
    })
  },
}
