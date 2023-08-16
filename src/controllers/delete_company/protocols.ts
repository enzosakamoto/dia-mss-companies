import { HttpRequest, HttpResponse } from './../protocols'
import { Company } from '../../models/company'

export interface IDeleteCompanyController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Company>>
}

export interface IDeleteCompanyRepository {
  deleteCompany(id: string): Promise<Company>
}
