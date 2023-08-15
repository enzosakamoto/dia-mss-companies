import { Company } from '../../models/company'
import { HttpRequest, HttpResponse } from '../protocols'

export interface ICreateCompanyController {
  handle(
    httpRequest: HttpRequest<CreateCompanyParams>
  ): Promise<HttpResponse<Company>>
}
export interface CreateCompanyParams {
  name: string
  image: string
  description: string
  link: string
}

export interface ICreateCompanyRepository {
  createCompany(params: CreateCompanyParams): Promise<Company>
}
