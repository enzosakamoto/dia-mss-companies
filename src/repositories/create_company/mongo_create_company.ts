import { MongoClient } from './../../database/mongo'
import {
  CreateCompanyParams,
  ICreateCompanyRepository
} from '../../controllers/create_company/protocols'
import { MongoClient } from '../../database/mongo'
import { Company } from '../../models/company'

export class MongoCreateCompany implements ICreateCompanyRepository {
  async createCompany(params: CreateCompanyParams): Promise<Company> {
    const { insertedId } = await MongoClient.db
      .collection('companies')
      .insertOne(params)

    const company = await MongoClient.db
      .collection<Omit<Company, 'id'>>('companies')
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
