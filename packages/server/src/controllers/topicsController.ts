import type { Request, Response } from 'express'
import { TopicModel } from '../models/topicModel'
import { CommentModel } from '../models/commentModel'
import { DATA_DELETED, FORUM_ID_ERROR, SERVER_ERROR, TOPIC_ID_ERROR } from '../constants'

class TopicsController {
  async createTopic(req: Request, res: Response) {
    try {
      const forumId = Number(req.body.forumId) ?? null
      const { title, content, user } = req.body

      if (!forumId) {
        return res.status(400).json({
          message: FORUM_ID_ERROR,
        })
      }

      const topic = await TopicModel.create({
        title,
        content,
        user,
        forumId,
      })

      return res.status(201).json(topic)
    } catch {
      return res.status(500).json({
        message: SERVER_ERROR,
      })
    }
  }

  async getTopic(req: Request, res: Response) {
    try {
      const topicId = Number(req.params.id) ?? null

      if (!topicId) {
        return res.status(400).json({
          message: TOPIC_ID_ERROR,
        })
      }

      const topic = await TopicModel.findOne({
        where: { id: topicId },
        attributes: { exclude: ['createdAt', 'updatedAt', 'forumId'] },
        include: {
          model: CommentModel,
          order: [['id', 'ASC']],
          separate: true,
          attributes: { exclude: ['topicId', 'updatedAt'] },
        },
      })

      if (!topic) {
        return res.status(400).json({
          message: TOPIC_ID_ERROR,
        })
      }

      return res.json(topic)
    } catch {
      return res.status(500).json({
        message: SERVER_ERROR,
      })
    }
  }

  async updateTopic(req: Request, res: Response) {
    try {
      const topicId = Number(req.params.id) ?? null
      const { title, content } = req.body

      if (!topicId) {
        return res.status(400).json({
          message: TOPIC_ID_ERROR,
        })
      }

      const topic = await TopicModel.findOne({ where: { id: topicId } })

      if (!topic) {
        return res.status(400).json({
          message: TOPIC_ID_ERROR,
        })
      }

      await TopicModel.update({ title, content }, { where: { id: topic.id } })
      const updTopic = await TopicModel.findOne({ where: { id: topicId } })

      if (!updTopic) {
        return res.status(400).json({
          message: TOPIC_ID_ERROR,
        })
      }

      return res.json({
        title: updTopic.title,
        content: updTopic.content,
      })
    } catch {
      return res.status(500).json({
        message: SERVER_ERROR,
      })
    }
  }

  async deleteTopic(req: Request, res: Response) {
    try {
      const topicId = Number(req.params.id) ?? null

      if (!topicId) {
        return res.status(404).json({
          message: TOPIC_ID_ERROR,
        })
      }
      const topic = await TopicModel.findOne({ where: { id: topicId } })

      if (!topic) {
        return res.status(404).json({
          message: TOPIC_ID_ERROR,
        })
      }

      await TopicModel.destroy({ where: { id: topic.id } })

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

export default new TopicsController()
