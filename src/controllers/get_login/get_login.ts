import { badRequest, internalServerError } from '../helpers'
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { GetLoginParams, IGetLoginRepository, Login } from './protocols'
import jwt from 'jsonwebtoken'

export class GetLoginController implements IController {
  constructor(private readonly getLoginRepository: IGetLoginRepository) {}
  async handle(
    httpRequest: HttpRequest<GetLoginParams>
  ): Promise<HttpResponse<any | string>> {
    try {
      const requiredFields = ['username', 'password']

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof GetLoginParams]?.length) {
          return badRequest(`Field ${field} is required`)
        }
      }

      const { username, password } = httpRequest.body!

      const user = await this.getLoginRepository.getLogin(username, password)

      const secret = process.env.SECRET

      if (!secret) {
        return internalServerError('Something went wrong')
      }

      const token = jwt.sign({ id: user.id }, secret)

      return {
        statusCode: 200,
        body: {
          message: 'Login successful',
          token
        }
      }
    } catch (error) {
      return internalServerError('Something went wrong. ' + error)
    }
  }
}
