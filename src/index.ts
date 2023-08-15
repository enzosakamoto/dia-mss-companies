import express from 'express'
import { config } from 'dotenv'
import { GetCompaniesController } from './controllers/get_companies/get_companies'
import { MongoGetCompaniesRepository } from './repositories/get_companies/mongo_get_companies'

config()

const app = express()

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
