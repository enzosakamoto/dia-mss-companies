import { User } from '../../models/user'
import { HTTP_STATUS_CODE } from '../protocols'

export interface GetLoginParams {
  username: string
  password: string
}

export interface Login {
  statusCode: HTTP_STATUS_CODE
  body: any
}

export interface IGetLoginRepository {
  getLogin(username: string, password: string): Promise<User>
}
