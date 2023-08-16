import { Company } from '../../models/company'
export interface CreateCompanyParams {
  name: string
  image: string
  description: string
  link: string
}

export interface ICreateCompanyRepository {
  createCompany(params: CreateCompanyParams): Promise<Company>
}
