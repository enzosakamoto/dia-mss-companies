import { IMongoCompany, IMongoUser } from './../repositories/mongo_protocols'
import { MongoClient as Mongo, Db } from 'mongodb'
import { Company } from '../models/company'
import { User } from '../models/user'

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || ''
    const username = process.env.MONGODB_USERNAME || ''
    const password = process.env.MONGODB_PASSWORD || ''

    const client = new Mongo(url, {
      auth: {
        username,
        password
      }
    })
    const db = client.db('diq-companies')

    this.client = client
    this.db = db

    console.log('Connected to MongoDB! 🚀')
  },

  map(company: IMongoCompany): Company {
    const { _id, ...rest } = company

    return {
      id: _id.toHexString(),
      ...rest
    }
  },

  userMap(user: IMongoUser): User {
    const { _id, ...rest } = user

    return {
      id: _id.toHexString(),
      ...rest
    }
  }
}
