import { Company } from '../../models/company'

export interface UpdateCompanyParams {
  name?: string
  image?: string
  description?: string
  link?: string
}

export interface IUpdateCompanyRepository {
  updateCompany(id: string, params: UpdateCompanyParams): Promise<Company>
}
