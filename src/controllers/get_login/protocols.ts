import { User } from '../../models/user'

export interface GetLoginParams {
  username: string
  password: string
}

export interface Login {
  message: string
  token: string
}

export interface IGetLoginRepository {
  getLogin(username: string, password: string): Promise<User>
}
