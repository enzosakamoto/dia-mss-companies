import { Company } from '../models/company'

export type MongoCompany = Omit<Company, 'id'>
