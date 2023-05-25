import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { ForumModel } from './src/models/forumModel'
import { TopicModel } from './src/models/topicModel'
import { CommentModel } from './src/models/commentModel'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env
const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT) || 5432,
  username: POSTGRES_USER || 'admin',
  password: POSTGRES_PASSWORD || 'admin',
  database: POSTGRES_DB || 'postgres',
  dialect: 'postgres',
  models: [ForumModel, TopicModel, CommentModel],
}

export const sequelize = new Sequelize(sequelizeOptions)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    // Создание строк в таблице с форумами
    await ForumModel.create({ title: 'New Games' })
    await ForumModel.create({ title: 'Games designers' })
    await ForumModel.create({ title: 'Technologies' })

    console.log(
      `\x1b[33m  ➜ 🚀 Connection to \x1b[96m${process.env.POSTGRES_DB}\x1b[33m has been established successfully.\x1b[0m`
    )
  } catch (error) {
    console.error(`  ➜ ❌ Unable to connect to the ${process.env.POSTGRES_DB}:`, error)
  }
}
