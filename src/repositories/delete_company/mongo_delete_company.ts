import { ObjectId } from 'mongodb'
import { IDeleteCompanyRepository } from '../../controllers/delete_company/protocols'
import { MongoClient } from '../../database/mongo'
import { Company } from '../../models/company'
import { MongoCompany } from '../mongo_protocols'

export class MongoDeleteCompanyRepository implements IDeleteCompanyRepository {
  async deleteCompany(id: string): Promise<Company> {
    const company = await MongoClient.db
      .collection<MongoCompany>('companies')
      .findOne({ _id: new ObjectId(id) })

    if (!company) {
      throw new Error('Company was not found')
    }

    const { deletedCount } = await MongoClient.db
      .collection('companies')
      .deleteOne({ _id: new ObjectId(id) })

    if (!deletedCount) {
      throw new Error('Company was not deleted')
    }

    const { _id, ...rest } = company

    return {
      id: _id.toHexString(),
      ...rest
    }
  }
}
