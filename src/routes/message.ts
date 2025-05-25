
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { MessageController } from '../controllers/message.controller'
import { CreateTextMessageSchema } from '../dtos/message/create-text-message.dto'
import { CreateFileMessageSchema } from '../dtos/message/create-file-message.dto'
import { GetAllMessagesSchema } from '../dtos/message/get-all-messages.dto'
import { GetMessageContentSchema } from '../dtos/message/get-message-by-id.dto'
import type { CreateTextMessageBody } from '../types/create-text-message.type'
import type { PaginationQuery } from '../types/pagination.type'
import type { GetMessageContentQuery } from '../types/get-message-content.type'

const messageController = new MessageController()

export const message = async ( fastify: FastifyInstance, _options: FastifyPluginOptions): Promise<void> => {

  fastify.post<{ Body: CreateTextMessageBody }>(
    '/text',
    {
      preValidation: fastify.basicAuth,
      schema:     CreateTextMessageSchema
    },
    messageController.createTextMessage
  )

  fastify.post(
    '/file',
    {
      preValidation: fastify.basicAuth,
      schema:     CreateFileMessageSchema
    },
    messageController.createFileMessage
  )

  fastify.get<{ Querystring: PaginationQuery }>(
    '/list',
    {
      preValidation: fastify.basicAuth,
      schema:     GetAllMessagesSchema
    },
    messageController.getListMessages
  )

  fastify.get<{ Params: GetMessageContentQuery }>(
    '/content/:id',
    {
      preValidation: fastify.basicAuth,
      schema:     GetMessageContentSchema
    },
    messageController.getContentOfMessage
  )
}
