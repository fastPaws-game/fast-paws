import type { Request, Response } from 'express'
import { CommentModel } from '../models/commentModel'
import { COMMENT_ID_ERROR, DATA_DELETED, DATA_UPDATED, SERVER_ERROR, TOPIC_ID_ERROR } from '../constants'

class CommentsController {
  async createComment(req: Request, res: Response) {
    try {
      const topicId = Number(req.body.topicId) ?? null
      if (!topicId) {
        return res.status(404).json({
          message: TOPIC_ID_ERROR,
        })
      }

      const comment = await CommentModel.create({
        ...req.body,
        topicId,
      })
      console.log(comment)

      return res.status(201).json(comment)
    } catch {
      return res.status(500).json({
        message: SERVER_ERROR,
      })
    }
  }

  async getComment(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!Number(id)) {
        return res.status(400).json({
          message: COMMENT_ID_ERROR,
        })
      }

      const comment = await CommentModel.findOne({
        where: { id },
        attributes: { exclude: ['topicId'] },
      })

      return res.json(comment)
    } catch {
      return res.status(500).json({
        message: SERVER_ERROR,
      })
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const { content } = req.body
      const { id } = req.params

      if (!Number(id)) {
        return res.status(400).json({
          message: COMMENT_ID_ERROR,
        })
      }
      const comment = await CommentModel.findOne({ where: { id } })

      await CommentModel.update({ content }, { where: { id: comment?.id } })

      return res.json({
        message: DATA_UPDATED,
      })
    } catch {
      return res.status(500).json({
        message: SERVER_ERROR,
      })
    }
  }
  async deleteComment(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!Number(id)) {
        return res.status(400).json({
          message: COMMENT_ID_ERROR,
        })
      }
      const comment = await CommentModel.findOne({ where: { id } })

      await CommentModel.destroy({ where: { id: comment?.id } })

      return res.json({
        message: DATA_DELETED,
      })
    } catch {
      return res.status(500).json({
        message: SERVER_ERROR,
      })
    }
  }
}

export default new CommentsController()
