import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import router from './app/routes'
import morganMiddleware from './app/middlewares/morganMiddleware'
import notFound from './app/middlewares/notFound'
import globalErrorHandaller from './app/middlewares/globalErrorHandaller'
import cookieParser from 'cookie-parser'

const app: Application = express()

//parser
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser())
app.use(morganMiddleware)

//*Application Routes
app.use('/', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(notFound)
app.use(globalErrorHandaller)

export default app
