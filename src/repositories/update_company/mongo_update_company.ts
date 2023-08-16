import { ObjectId } from 'mongodb'
import {
  IUpdateCompanyRepository,
  UpdateCompanyParams
} from '../../controllers/update_company/protocols'
import { MongoClient } from '../../database/mongo'
import { Company } from '../../models/company'

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
      .collection<Omit<Company, 'id'>>('companies')
      .findOne({ _id: new ObjectId(id) })

    if (!company) {
      throw new Error('Company was not updated')
    }

    const { _id, ...rest } = company

    return {
      id: _id.toHexString(),
      ...rest
    }
  }
}
