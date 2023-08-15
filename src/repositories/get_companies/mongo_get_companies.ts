import { IGetCompaniesRepository } from '../../controllers/get_companies/protocols'
import { Company } from '../../models/company'

export class MongoGetCompaniesRepository implements IGetCompaniesRepository {
  async getCompanies(): Promise<Company[]> {
    return [
      {
        id: 1,
        name: 'Company 1',
        image: 'asd',
        description: 'asd',
        link: 'asd'
      }
    ]
  }
}
