import express from 'express'
import { MongoGetCompaniesRepository } from '../repositories/get_companies/mongo_get_companies'
import { GetCompaniesController } from '../controllers/get_companies/get_companies'
import { MongoCreateCompanyRepository } from '../repositories/create_company/mongo_create_company'
import { CreateCompanyController } from '../controllers/create_company/create_company'
import { MongoUpdateCompanyRepository } from '../repositories/update_company/mongo_update_company'
import { UpdateCompanyController } from '../controllers/update_company/update_company'
import { MongoDeleteCompanyRepository } from '../repositories/delete_company/mongo_delete_company'
import { DeleteCompanyController } from '../controllers/delete_company/delete_company_controller'

const router = express.Router()

router.get('/', async (req, res) => {
  const mongoGetUsersRepository = new MongoGetCompaniesRepository()
  const getCompaniesController = new GetCompaniesController(
    mongoGetUsersRepository
  )

  const response = await getCompaniesController.handle()

  res.status(response.statusCode).json(response.body)
})

router.post('/', async (req, res) => {
  const mongoCreateCompanyRepository = new MongoCreateCompanyRepository()
  const createCompanyController = new CreateCompanyController(
    mongoCreateCompanyRepository
  )

  const { body, statusCode } = await createCompanyController.handle({
    body: req.body
  })

  res.status(statusCode).send(body)
})

router.patch('/:id', async (req, res) => {
  const mongoUpdateCompanyRepository = new MongoUpdateCompanyRepository()
  const updateCompanyController = new UpdateCompanyController(
    mongoUpdateCompanyRepository
  )

  const { body, statusCode } = await updateCompanyController.handle({
    body: req.body,
    params: req.params
  })

  res.status(statusCode).send(body)
})

router.delete('/:id', async (req, res) => {
  const mongoDeleteCompanyRepository = new MongoDeleteCompanyRepository()
  const deleteCompanyController = new DeleteCompanyController(
    mongoDeleteCompanyRepository
  )

  const { body, statusCode } = await deleteCompanyController.handle({
    params: req.params
  })

  res.status(statusCode).send(body)
})

export default router
