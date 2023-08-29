import jwt from 'jsonwebtoken'
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

userRouter.post('/validate', (req, res) => {
  const { token } = req.body

  if (!token) {
    return res.status(401).send({ message: 'No token provided.' })
  }

  try {
    const secret = process.env.SECRET

    if (!secret) {
      throw new Error('Something went wrong')
    }

    jwt.verify(token, secret)

    res.status(200).send({ isValid: true, message: 'Token is valid' })
  } catch (error) {
    res.status(401).send({ isValid: false, message: 'Token is not valid' })
  }
})

export default userRouter
