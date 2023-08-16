import { Company } from '../../models/company'

export interface IGetCompanyRepository {
  getCompany(id: string): Promise<Company>
}
