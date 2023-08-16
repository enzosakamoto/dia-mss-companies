import { Company } from '../../models/company'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { IDeleteCompanyRepository } from './protocols'

export class DeleteCompanyController implements IController {
  constructor(
    private readonly deleteCompanyRepository: IDeleteCompanyRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<Company>> {
    try {
      const id = httpRequest?.params?.id

      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing company id'
        }
      }

      const company = await this.deleteCompanyRepository.deleteCompany(id)
      return {
        statusCode: 200,
        body: company
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong'
      }
    }
  }
}
