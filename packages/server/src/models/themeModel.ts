import { DataType } from 'sequelize-typescript'
import { v4 as makeUUID } from 'uuid'

const theme = {
  themeUID: {
    type: DataType.UUIDV4,
    defaultValue: () => makeUUID(),
    allowNull: false,
    unique: true,
  },
  theme: {
    type: DataType.ENUM('dark', 'light'),
    defaultValue: 'dark',
    allowNull: false,
  },
}

export default theme
