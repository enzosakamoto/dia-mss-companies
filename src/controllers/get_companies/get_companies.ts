import { IGetCompaniesController, IGetCompaniesRepository } from './protocols'

export class GetCompaniesController implements IGetCompaniesController {
  constructor(
    private readonly getCompaniesRepository: IGetCompaniesRepository
  ) {}
  async handle() {
    try {
      const companies = await this.getCompaniesRepository.getCompanies()
      return {
        statusCode: 200,
        body: companies
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: { message: 'Something went wrong' }
      }
    }
  }
}
