import type { Optional } from 'sequelize'
import {
  DataType,
  Model,
  Table,
  AllowNull,
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
  declare id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string

  @HasMany(() => TopicModel)
  topics!: TopicModel[]
}
