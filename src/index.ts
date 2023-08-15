import express from 'express'
import { config } from 'dotenv'
import { GetCompaniesController } from './controllers/get_companies/get_companies'
import { MongoGetCompaniesRepository } from './repositories/get_companies/mongo_get_companies'
import { MongoClient } from './database/mongo'
import { MongoCreateCompanyRepository } from './repositories/create_company/mongo_create_company'
import { CreateCompanyController } from './controllers/create_company/create_company'

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

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

main()
