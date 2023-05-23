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
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'
import { ForumModel } from './forumModel'
import { CommentModel } from './commentModel'

interface ITopic {
  id: number
  forumId: number
  title: string
  content: string
  user: string
}

type CreationTopic = Optional<ITopic, 'id'>

@Table({
  tableName: 'topics',
})
export class TopicModel extends Model<ITopic, CreationTopic> {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number

  @ForeignKey(() => ForumModel)
  @Column
  forumId!: number

  @BelongsTo(() => ForumModel)
  forum!: ForumModel

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  content!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  user!: string

  @HasMany(() => CommentModel)
  comments!: CommentModel[]
}
