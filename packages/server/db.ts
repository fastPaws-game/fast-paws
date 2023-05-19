import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { ForumModel } from './src/models/forumModel'
import { TopicModel } from './src/models/topicModel'
import { CommentModel } from './src/models/commentModel'

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  dialect: 'postgres',
  models: [ForumModel, TopicModel, CommentModel],
}

export const sequelize = new Sequelize(sequelizeOptions)

export async function dbConnect() {
  try {
    console.log(process.env.POSTGRES_PASSWORD)
    await sequelize.authenticate()
    await sequelize.sync()

    // Создание строк в таблице с форумами
    ForumModel.create({ title: 'New Games' })
    ForumModel.create({ title: 'Games designers' })
    ForumModel.create({ title: 'Technologies' })

    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
