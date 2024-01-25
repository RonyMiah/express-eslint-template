import { Router } from 'express'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { UserRouter } from '../modules/user/user.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/auth',
    route: UserRouter,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
