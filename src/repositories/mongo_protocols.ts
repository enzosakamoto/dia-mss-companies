import { ObjectId } from 'mongodb'
import { Company } from '../models/company'
import { User } from '../models/user'

export type MongoCompany = Omit<Company, 'id'>

export type MongoUser = Omit<User, 'id'>

export interface IMongoCompany {
  _id: ObjectId
  name: string
  image: string
  description: string
  link: string
}

export interface IMongoUser {
  _id: ObjectId
  username: string
  password: string
}
