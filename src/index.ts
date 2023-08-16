import express from 'express'
import { config } from 'dotenv'
import { GetCompaniesController } from './controllers/get_companies/get_companies'
import { MongoGetCompaniesRepository } from './repositories/get_companies/mongo_get_companies'
import { MongoClient } from './database/mongo'
import { MongoCreateCompanyRepository } from './repositories/create_company/mongo_create_company'
import { CreateCompanyController } from './controllers/create_company/create_company'
import { MongoUpdateCompanyRepository } from './repositories/update_company/mongo_update_company'
import { UpdateCompanyController } from './controllers/update_company/update_company'
import { DeleteCompanyController } from './controllers/delete_company/delete_company_controller'
import { MongoDeleteCompanyRepository } from './repositories/delete_company/mongo_delete_company'

const main = async () => {
  config()
  const app = express()
  app.use(express.json())

  await MongoClient.connect()

  const port = process.env.PORT || 3000

  app.get('/', (req, res) => {
    res.send('API is running! 🚀')
  })

  app.get('/companies', async (req, res) => {
    const mongoGetUsersRepository = new MongoGetCompaniesRepository()
    const getCompaniesController = new GetCompaniesController(
      mongoGetUsersRepository
    )

    const response = await getCompaniesController.handle()

    res.status(response.statusCode).json(response.body)
  })

  app.post('/companies', async (req, res) => {
    const mongoCreateCompanyRepository = new MongoCreateCompanyRepository()
    const createCompanyController = new CreateCompanyController(
      mongoCreateCompanyRepository
    )

    const { body, statusCode } = await createCompanyController.handle({
      body: req.body
    })

    res.status(statusCode).send(body)
  })

  app.patch('/companies/:id', async (req, res) => {
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

  app.delete('/companies/:id', async (req, res) => {
    const mongoDeleteCompanyRepository = new MongoDeleteCompanyRepository()
    const deleteCompanyController = new DeleteCompanyController(
      mongoDeleteCompanyRepository
    )

    const { body, statusCode } = await deleteCompanyController.handle({
      params: req.params
    })

    res.status(statusCode).send(body)
  })

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

main()
