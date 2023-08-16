import { IGetCompaniesRepository } from '../../controllers/get_companies/protocols'
import { MongoClient } from '../../database/mongo'
import { Company } from '../../models/company'
import { MongoCompany } from '../mongo_protocols'

export class MongoGetCompaniesRepository implements IGetCompaniesRepository {
  async getCompanies(): Promise<Company[]> {
    const companies = await MongoClient.db
      .collection<MongoCompany>('companies')
      .find({})
      .toArray()

    return companies.map((company) => MongoClient.map(company))
  }
}
