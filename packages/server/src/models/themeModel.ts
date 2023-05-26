import { DataType, BeforeValidate, Column, Model, Default, Table } from 'sequelize-typescript'
import { v4 as makeUUID } from 'uuid'

@Table({
  tableName: 'themes',
})
export default class ThemeModel extends Model<any> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
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
