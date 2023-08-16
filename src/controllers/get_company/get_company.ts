import { Company } from '../../models/company'
import { badRequest, internalServerError, ok } from '../helpers'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { IGetCompanyRepository } from './protocols'

export class GetCompanyController implements IController {
  constructor(private readonly getCompanyRepository: IGetCompanyRepository) {}
  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<Company | string>> {
    try {
      const id = httpRequest?.params?.id

      if (!id) {
        return badRequest('Missing company id')
      }

      const company = await this.getCompanyRepository.getCompany(id)

      return ok<Company>(company)
    } catch (error) {
      return internalServerError('Something went wrong')
    }
  }
}
