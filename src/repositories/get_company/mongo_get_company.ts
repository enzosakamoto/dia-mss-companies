import { ObjectId } from 'mongodb'
import { IGetCompanyRepository } from '../../controllers/get_company/protocols'
import { MongoClient } from '../../database/mongo'
import { Company } from '../../models/company'
import { MongoCompany } from '../mongo_protocols'

export class MongoGetCompanyRepository implements IGetCompanyRepository {
  async getCompany(id: string): Promise<Company> {
    const company = await MongoClient.db
      .collection<MongoCompany>('companies')
      .findOne({ _id: new ObjectId(id) })

    if (!company) {
      throw new Error('Company was not found')
    }

    return MongoClient.map(company)
  }
}
