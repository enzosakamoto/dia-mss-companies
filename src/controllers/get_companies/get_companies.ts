import { Company } from '../../models/company'
import { internalServerError, ok } from '../helpers'
import { HttpResponse, IController } from '../protocols'
import { IGetCompaniesRepository } from './protocols'

export class GetCompaniesController implements IController {
  constructor(
    private readonly getCompaniesRepository: IGetCompaniesRepository
  ) {}
  async handle(): Promise<HttpResponse<Company[] | string>> {
    try {
      const companies = await this.getCompaniesRepository.getCompanies()
      return ok<Company[]>(companies)
    } catch (error) {
      return internalServerError('Something went wrong')
    }
  }
}
