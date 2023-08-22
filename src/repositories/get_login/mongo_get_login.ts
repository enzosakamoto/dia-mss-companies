import { IGetLoginRepository } from '../../controllers/get_login/protocols'
import { MongoClient } from '../../database/mongo'
import { User } from '../../models/user'
import { MongoUser } from '../mongo_protocols'
import bcrypt from 'bcrypt'

export class MongoGetLogin implements IGetLoginRepository {
  async getLogin(username: string, password: string): Promise<User> {
    const user = await MongoClient.db.collection<MongoUser>('users').findOne({
      username: username
    })

    if (!user) {
      throw new Error('Login is incorrect')
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      throw new Error('Login is incorrect')
    }

    return MongoClient.userMap(user)
  }
}
