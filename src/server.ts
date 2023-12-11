import app from './app'
import mongoose from 'mongoose'
import config from './app/config'
import logger from './app/lib/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    logger.error(error)
  }
}

main()
