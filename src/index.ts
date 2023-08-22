import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { MongoClient } from './database/mongo'
import router from './routes/companies.routes'
import userRouter from './routes/users.routes'

const server = async () => {
  config()
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.use('/companies', router)
  app.use('/users', userRouter)

  await MongoClient.connect()

  const port = process.env.PORT || 3000

  app.get('/', (req, res) => {
    res.send('API is running! 🚀')
  })

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

server()
