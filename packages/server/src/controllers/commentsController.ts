import type { Request, Response } from 'express'
import { CommentModel } from '../models/commentModel'
import { COMMENT_ID_ERROR, DATA_DELETED, SERVER_ERROR, TOPIC_ID_ERROR } from '../constants'

class CommentsController {
  async createComment(req: Request, res: Response) {
    try {
      const { content, user, topicId, parentId } = req.body

      if (!Number(topicId)) {
        return res.status(404).json({
          message: TOPIC_ID_ERROR,
        })
      }

      const comment = await CommentModel.create({
        content,
        user,
        topicId,
        parentId,
      })

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

      if (!comment) {
        return res.status(400).json({
          message: COMMENT_ID_ERROR,
        })
      }

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

      if (!comment) {
        return res.status(400).json({
          message: COMMENT_ID_ERROR,
        })
      }

      await CommentModel.update({ content }, { where: { id } })
      const updComment = await CommentModel.findOne({ where: { id } })

      if (!updComment) {
        return res.status(400).json({
          message: COMMENT_ID_ERROR,
        })
      }

      return res.json({
        content: updComment.content,
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

      if (!comment) {
        return res.status(400).json({
          message: COMMENT_ID_ERROR,
        })
      }

      await CommentModel.destroy({ where: { id } })

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
