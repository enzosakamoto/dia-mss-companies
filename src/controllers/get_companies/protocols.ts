import { Company } from '../../models/company'

export interface IGetCompaniesRepository {
  getCompanies(): Promise<Company[]>
}
