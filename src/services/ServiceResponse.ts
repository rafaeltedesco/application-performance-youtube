import { ServiceStatus } from './ServiceStatus'

type ServicePaginatedResponse<T> = {
  status:  'OK',
  data: T[],
  page: number,
  limit: number,
  totalPages?: number,
  remainingPages?: number,
}

type ErrorMessage = {
  error: {
    message: string,
  }
}

type ServiceErrorResponse = {
  status: 'NOT_FOUND' | 'BAD_REQUEST',
  data: ErrorMessage
}

export type ServiceResponse<T> = ServicePaginatedResponse<T> | ServiceErrorResponse;