import express from 'express'
import forumsController from '../controllers/forumsController'

const router = express.Router()

router.route('/').get(forumsController.getAll)

router.route('/:id').get(forumsController.getForum)

export default router
