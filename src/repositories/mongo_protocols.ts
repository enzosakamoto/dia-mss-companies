import { ObjectId } from 'mongodb'
import { Company } from '../models/company'

export type MongoCompany = Omit<Company, 'id'>

export interface IMongoCompany {
  _id: ObjectId
  name: string
  image: string
  description: string
  link: string
}
