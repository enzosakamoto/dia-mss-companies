import { ObjectId } from 'mongodb'
import {
  IUpdateCompanyRepository,
  UpdateCompanyParams
} from '../../controllers/update_company/protocols'
import { MongoClient } from '../../database/mongo'
import { Company } from '../../models/company'
import { MongoCompany } from '../mongo_protocols'

export class MongoUpdateCompanyRepository implements IUpdateCompanyRepository {
  async updateCompany(
    id: string,
    params: UpdateCompanyParams
  ): Promise<Company> {
    await MongoClient.db.collection('companies').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params
        }
      }
    )

    const company = await MongoClient.db
      .collection<MongoCompany>('companies')
      .findOne({ _id: new ObjectId(id) })

    if (!company) {
      throw new Error('Company was not updated')
    }

    return MongoClient.map(company)
  }
}
