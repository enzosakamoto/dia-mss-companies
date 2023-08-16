import { MongoClient } from './../../database/mongo'
import {
  CreateCompanyParams,
  ICreateCompanyRepository
} from '../../controllers/create_company/protocols'
import { Company } from '../../models/company'
import { MongoCompany } from '../mongo_protocols'

export class MongoCreateCompanyRepository implements ICreateCompanyRepository {
  async createCompany(params: CreateCompanyParams): Promise<Company> {
    const { insertedId } = await MongoClient.db
      .collection('companies')
      .insertOne(params)

    const company = await MongoClient.db
      .collection<MongoCompany>('companies')
      .findOne({
        _id: insertedId
      })

    if (!company) {
      throw new Error('Company was not created')
    }

    const { _id, ...rest } = company

    return {
      id: _id.toHexString(),
      ...rest
    }
  }
}
