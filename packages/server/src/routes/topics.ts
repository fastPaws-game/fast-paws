import express from 'express'
import topicsController from '../controllers/topicsController'

const router = express.Router()

router.route('/').post(topicsController.createTopic)

router
  .route('/:id')
  .get(topicsController.getTopic)
  .patch(topicsController.updateTopic)
  .delete(topicsController.deleteTopic)

export default router
