import { Router } from 'express'
import { putTheme } from '../controllers/themesControllers'

const router = Router()

router.route('/').put(putTheme)

export default router
