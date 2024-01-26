import { Router } from 'express'
import validateRequest from '../../middlewares/validationRequest'
import { AuthValidation } from './auth.validation'
import { AuthControllers } from './auth.controller'
import auth from '../../middlewares/auth'

const router = Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
)
router.post(
  '/change-password',
  auth(),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
)
router.post(
  '/refresh-token',
  // validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
)

export const AuthRoutes = router
