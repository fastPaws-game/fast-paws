import { Router } from 'express'
import { putTheme, getThemeController } from '../controllers/themesControllers'

const router = Router()

router.route('/').get(getThemeController).put(putTheme)

export default router
