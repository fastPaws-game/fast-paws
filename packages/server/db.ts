import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { ForumModel } from './src/models/forumModel'
import { TopicModel } from './src/models/topicModel'
import { CommentModel } from './src/models/commentModel'
import dotenv from 'dotenv'

dotenv.config(process.env.NODE_ENV === 'development' ? { path: '../../.env' } : { path: './.env' })

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env
const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [ForumModel, TopicModel, CommentModel],
}

export const sequelize = new Sequelize(sequelizeOptions)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    console.log(
      `\x1b[33m  ➜ 🚀 Connection to \x1b[96m${process.env.POSTGRES_DB}\x1b[33m has been established successfully.\x1b[0m`
    )
  } catch (error) {
    console.error(`  ➜ ❌ Unable to connect to the ${process.env.POSTGRES_DB}:`, error)
  }
}
