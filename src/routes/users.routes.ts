import express from 'express'
import { MongoGetLoginRepository } from '../repositories/get_login/mongo_get_login'
import { GetLoginController } from '../controllers/get_login/get_login'
const userRouter = express.Router()

userRouter.post('/', async (req, res) => {
  const mongoGetLoginRepository = new MongoGetLoginRepository()
  const getLoginController = new GetLoginController(mongoGetLoginRepository)

  const { body, statusCode } = await getLoginController.handle({
    body: req.body
  })

  res.status(statusCode).send(body)
})

export default userRouter
