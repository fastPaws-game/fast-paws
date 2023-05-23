import type { Request, Response } from 'express'
import { ForumModel } from '../models/forumModel'
import { TopicModel } from '../models/topicModel'
import { CommentModel } from '../models/commentModel'
import { FORUM_ID_ERROR, SERVER_ERROR } from '../constants'

class ForumsController {
  async getAll(_: Request, res: Response) {
    try {
      const forums = await ForumModel.findAll({
        include: [{ model: TopicModel }],
        order: [['id', 'ASC']],
      })

      return res.json(
        forums.map(forum => ({
          id: forum.id,
          title: forum.title,
          topicsCount: forum.topics.length,
        }))
      )
    } catch {
      return res.status(500).json({
        reason: SERVER_ERROR,
      })
    }
  }

  async getForum(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!Number(id)) {
        return res.status(400).json({
          message: FORUM_ID_ERROR,
        })
      }

      const forum = await ForumModel.findOne({
        where: { id },
        include: {
          model: TopicModel,
          order: [['id', 'ASC']],
          separate: true,
          include: [
            { model: CommentModel, separate: true, attributes: ['id', 'user', 'createdAt'], order: [['id', 'ASC']] },
          ],
          attributes: ['id', 'title'],
        },
      })

      if (!forum) {
        return res.status(400).json({
          message: FORUM_ID_ERROR,
        })
      }

      const topics = forum.topics.map(topic => ({
        id: topic.id,
        title: topic.title,
        commentsCount: topic.comments.length,
        lastMessage: topic.comments[topic.comments.length - 1],
      }))

      return res.json({
        id: forum.id,
        title: forum.title,
        topics,
      })
    } catch {
      return res.status(500).json({
        message: SERVER_ERROR,
      })
    }
  }
}

export default new ForumsController()
