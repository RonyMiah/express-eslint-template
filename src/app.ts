import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import router from './app/routes'
import morganMiddleware from './app/middlewares/morganMiddleware'
import notFound from './app/middlewares/notFound'
import globalErrorHandaller from './app/middlewares/globalErrorHandaller'


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

app.use(notFound);
app.use(globalErrorHandaller);

export default app
