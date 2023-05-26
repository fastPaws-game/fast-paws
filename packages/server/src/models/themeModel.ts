import type { Optional } from 'sequelize'
import { DataType, BeforeValidate, Column, Model, Default, Table } from 'sequelize-typescript'
import { v4 as makeUUID } from 'uuid'

interface ITheme {
  themeUID: string
  theme?: string
  id: number
}

type CreationTheme = Optional<ITheme, 'id'>
@Table({
  tableName: 'themes',
})
export default class ThemeModel extends Model<ITheme, CreationTheme> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  themeUID!: string

  @Default('dark')
  @Column({
    type: DataType.ENUM('dark', 'light'),
    allowNull: false,
  })
  theme!: string

  @BeforeValidate
  static generateUUID(instance: ThemeModel) {
    instance.themeUID = makeUUID()
  }

  @BeforeValidate
  static setDefaultTheme(instance: ThemeModel) {
    if (!instance.theme) {
      instance.theme = 'dark'
    }
  }
}
