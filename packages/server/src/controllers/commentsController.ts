import type { Request, Response } from 'express'
import { CommentModel } from '../models/commentModel'
import { COMMENT_ID_ERROR, DATA_DELETED, SERVER_ERROR, TOPIC_ID_ERROR } from '../constants'

class CommentsController {
  async createComment(req: Request, res: Response) {
    try {
      const topicId = Number(req.body.topicId) ?? null
      const { content, user } = req.body

      if (!topicId) {
        return res.status(404).json({
          message: TOPIC_ID_ERROR,
        })
      }

      const comment = await CommentModel.create({
        content,
        user,
        topicId,
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
      const commentId = Number(req.params.id) ?? null

      if (!commentId) {
        return res.status(400).json({
          message: COMMENT_ID_ERROR,
        })
      }

      const comment = await CommentModel.findOne({
        where: { id: commentId },
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
      const commentId = Number(req.params.id) ?? null
      const { content } = req.body

      if (!commentId) {
        return res.status(400).json({
          message: COMMENT_ID_ERROR,
        })
      }
      const comment = await CommentModel.findOne({ where: { id: commentId } })

      if (!comment) {
        return res.status(400).json({
          message: COMMENT_ID_ERROR,
        })
      }

      await CommentModel.update({ content }, { where: { id: comment.id } })
      const updComment = await CommentModel.findOne({ where: { id: commentId } })

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
      const commentId = Number(req.params.id) ?? null

      if (!commentId) {
        return res.status(400).json({
          message: COMMENT_ID_ERROR,
        })
      }
      const comment = await CommentModel.findOne({ where: { id: commentId } })

      if (!comment) {
        return res.status(400).json({
          message: COMMENT_ID_ERROR,
        })
      }

      await CommentModel.destroy({ where: { id: comment.id } })

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
