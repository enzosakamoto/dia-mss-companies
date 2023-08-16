import { Company } from '../../models/company'

export interface IDeleteCompanyRepository {
  deleteCompany(id: string): Promise<Company>
}
