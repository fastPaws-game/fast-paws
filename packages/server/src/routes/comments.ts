import express from 'express'
import commentsController from '../controllers/commentsController'

const router = express.Router()

router.route('/').post(commentsController.createComment)

router
  .route('/:id')
  .get(commentsController.getComment)
  .patch(commentsController.updateComment)
  .delete(commentsController.deleteComment)

export default router
