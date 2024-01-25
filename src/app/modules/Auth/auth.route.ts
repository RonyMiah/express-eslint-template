import { Router } from 'express'
import validateRequest from '../../middlewares/validationRequest'
import { AuthValidation } from './auth.validation'
import { AuthControllers } from './auth.controller'

const router = Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
)

export const AuthRoutes = router
