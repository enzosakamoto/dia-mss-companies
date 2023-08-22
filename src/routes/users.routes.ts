import express from 'express'
const userRouter = express.Router()

userRouter.post('/', async (req, res) => {
  //   const mongoGetCompanyRepository = new MongoGetCompanyRepository()
  //   const getCompanyController = new GetCompanyController(
  //     mongoGetCompanyRepository
  //   )
  //   const { body, statusCode } = await getCompanyController.handle({
  //     params: req.params
  //   })
  //   res.status(statusCode).send(body)
})

export default userRouter
