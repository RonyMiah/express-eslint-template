import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import morganMiddleware from './app/middlewares/morganMiddleware'
import router from './app/routes'
const app: Application = express()

//parser
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(morganMiddleware)

//*Application Routes
app.use('/', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
