export interface HttpResponse<T> {
  statusCode: HTTP_STATUS_CODE
  body: T
}

export interface HttpRequest<B> {
  params?: any
  headers?: any
  body?: B
}

export enum HTTP_STATUS_CODE {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NO_ITEMS_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}
