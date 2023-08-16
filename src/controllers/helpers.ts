import { HTTP_STATUS_CODE, HttpResponse } from './protocols'

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: HTTP_STATUS_CODE.OK,
  body
})

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: HTTP_STATUS_CODE.CREATED,
  body
})

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
    body: message
  }
}

export const internalServerError = (message: string): HttpResponse<string> => {
  return {
    statusCode: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    body: message
  }
}
