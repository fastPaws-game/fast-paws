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
} from 'sequelize-typescript'
import { TopicModel } from './topicModel'

interface IComment {
  id: number
  topicId: number
  user: string
  content: string
}

type CreationComment = Optional<IComment, 'id'>

@Table({
  tableName: 'comments',
})
export class CommentModel extends Model<IComment, CreationComment> {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number

  @ForeignKey(() => TopicModel)
  @Column
  topicId!: number

  @BelongsTo(() => TopicModel)
  topic!: TopicModel

  @AllowNull(false)
  @Column(DataType.STRING)
  user!: string

  @Column(DataType.STRING)
  content!: string
}
