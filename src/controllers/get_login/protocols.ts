import { User } from '../../models/user'

export interface IGetLoginRepository {
  getLogin(username: string, password: string): Promise<User>
}
