import type { Response } from 'express'

import Theme from '../models/themeModel'

export async function updateTheme(themeUID: string, theme: string, res: Response) {
  try {
    const updatedData = await Theme.update({ theme }, { where: { themeUID } })

    if (updatedData[0]) {
      res.status(200).json({
        theme: theme,
      })
    } else {
      res.status(400).json({ error: 'Failed to update theme' })
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export async function createNewTheme(themeUID: string, theme: string | null, res: Response) {
  try {
    const createdData = theme ? await Theme.create({ themeUID, theme }) : await Theme.create({ themeUID })
    if (createdData) {
      res.status(200).json({
        theme: createdData.dataValues.theme,
      })
    } else {
      res.status(400).json({ error: 'Failed to create new theme' })
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export async function getTheme(themeUID: string) {
  const themeData = await Theme.findOne({ where: { themeUID } })
  return themeData?.getDataValue('theme') || null
}
