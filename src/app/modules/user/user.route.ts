import { Router } from 'express'
import validateRequest from '../../middlewares/validationRequest'
import { userValidation } from './user.validation'
import { userControllers } from './user.controller'

const router = Router()

router.post(
  '/create-user',
  validateRequest(userValidation.createUserValidation),
  userControllers.createUser,
)

export const UserRouter = router
