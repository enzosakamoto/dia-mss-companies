import { HttpRequest, HttpResponse } from './../protocols'
import { Company } from '../../models/company'

export interface UpdateCompanyParams {
  name?: string
  image?: string
  description?: string
  link?: string
}

export interface IUpdateCompanyController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Company>>
}

export interface IUpdateCompanyRepository {
  updateCompany(id: string, params: UpdateCompanyParams): Promise<Company>
}
