import validator from 'validator'
import { Company } from '../../models/company'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { IUpdateCompanyRepository, UpdateCompanyParams } from './protocols'

export class UpdateCompanyController implements IController {
  constructor(
    private readonly updateCompanyRepository: IUpdateCompanyRepository
  ) {}
  async handle(
    httpRequest: HttpRequest<UpdateCompanyParams>
  ): Promise<HttpResponse<Company>> {
    try {
      // Gets the id from the request params
      const id = httpRequest?.params?.id
      // Gets the body from the request
      const body = httpRequest?.body

      if (!body) {
        return {
          statusCode: 400,
          body: 'Missing body'
        }
      }

      // If the company's id isn't provided, returns a 400 status code
      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing company id'
        }
      }

      // Allowed fields to update
      const allowedFieldsToUpdate: (keyof UpdateCompanyParams)[] = [
        'name',
        'image',
        'description',
        'link'
      ]

      // Verify if the fields of the request aren't allowed to update
      const someFieldsIsNotAllowedToUpdate = Object.keys(body).some(
        (key) =>
          !allowedFieldsToUpdate.includes(key as keyof UpdateCompanyParams)
      )

      // If some fields aren't allowed to update, returns a 400 status code
      if (someFieldsIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: 'Some fields are not allowed to be updated'
        }
      }

      // Verify if the company's name is provided and has at least 4 characters
      if (body.name && body.name.length < 4) {
        return {
          statusCode: 400,
          body: 'Name must be at least 4 characters'
        }
      }

      // Verify if the company's image is provided and has a valid URL
      if (body.image) {
        const imageUrlIsValid = validator.isURL(httpRequest.body!.image!)

        if (!imageUrlIsValid)
          return {
            statusCode: 400,
            body: 'Image has invalid URL'
          }
      }

      // Verify if the company's description is provided and has at least 10 characters
      if (body.description && body.description.length < 10) {
        return {
          statusCode: 400,
          body: 'Description must be at least 10 characters'
        }
      }

      // Verify if the company's link is provided and has a valid URL
      if (body.link) {
        const linkIsValid = validator.isURL(httpRequest.body!.link!)

        if (!linkIsValid)
          return {
            statusCode: 400,
            body: 'Link has invalid URL'
          }
      }

      // Updates the company
      const company = await this.updateCompanyRepository.updateCompany(id, body)

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
