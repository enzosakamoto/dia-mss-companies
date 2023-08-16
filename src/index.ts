import express from 'express'
import { config } from 'dotenv'
import { MongoClient } from './database/mongo'
import router from './routes/companies.routes'

const main = async () => {
  config()
  const app = express()
  app.use(express.json())

  app.use('/companies', router)

  await MongoClient.connect()

  const port = process.env.PORT || 3000

  app.get('/', (req, res) => {
    res.send('API is running! 🚀')
  })

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

main()
