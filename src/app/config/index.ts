import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.MONGODB_URL,
  bcrypt_solt_round: process.env.BYCRIPT_SOLT_ROUND,
  jwt_secret: process.env.JWT_SECRET,
  jwt_access_expiration_minutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  jwt_refresh_expiration_days: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  jwt_reset_password_expiration_minutes:
    process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  jwt_verify_email_expiration_minutes:
    process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_username: process.env.SMTP_USERNAME,
  smtp_password: process.env.SMTP_PASSWORD,
  email_from: process.env.EMAIL_FROM,
  cookie_secret: process.env.COOKIE_SECRET,
  client_url: process.env.CLIENT_URL,
}
