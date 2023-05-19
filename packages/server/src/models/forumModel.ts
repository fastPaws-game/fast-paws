import type { Optional } from 'sequelize'
import {
  DataType,
  Model,
  Table,
  AllowNull,
  Length,
  Column,
  Unique,
  AutoIncrement,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript'
import { TopicModel } from './topicModel'

interface IForum {
  id: number
  title: string
}

type CreationForum = Optional<IForum, 'id'>

@Table({
  timestamps: false,
  tableName: 'forums',
})
export class ForumModel extends Model<IForum, CreationForum> {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined

  @AllowNull(false)
  @Length({ min: 3, max: 120 })
  @Column(DataType.STRING)
  title!: string

  @HasMany(() => TopicModel)
  topics!: TopicModel[]
}
