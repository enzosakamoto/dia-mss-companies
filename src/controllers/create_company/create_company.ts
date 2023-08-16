import { Company } from '../../models/company'
import { badRequest, created, internalServerError } from '../helpers'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { CreateCompanyParams, ICreateCompanyRepository } from './protocols'
import validator from 'validator'

export class CreateCompanyController implements IController {
  constructor(
    private readonly createCompanyRepository: ICreateCompanyRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<CreateCompanyParams>
  ): Promise<HttpResponse<Company | string>> {
    try {
      const requiredFields = ['name', 'image', 'description', 'link']

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateCompanyParams]?.length) {
          return badRequest(`Field ${field} is required`)
        }
      }

      if (httpRequest.body!.name.length < 4) {
        return badRequest('Name must be at least 4 characters')
      }

      const imageUrlIsValid = validator.isURL(httpRequest.body!.image)

      if (!imageUrlIsValid) return badRequest('Image has invalid URL')

      if (httpRequest.body!.description.length < 10) {
        return badRequest('Description must be at least 10 characters')
      }

      const linkIsValid = validator.isURL(httpRequest.body!.link)

      if (!linkIsValid) return badRequest('Link has invalid URL')

      const company = await this.createCompanyRepository.createCompany(
        httpRequest.body!
      )

      return created<Company>(company)
    } catch (error) {
      return internalServerError('Something went wrong')
    }
  }
}
