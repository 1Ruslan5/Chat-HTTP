import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateTextMessageBody } from '../types/create-text-message.type'
import { CreateFileMessageBody } from '../types/create-file-message.type'
import { PaginationQuery } from '../types/pagination.type'
import { GetMessageContentQuery } from '../types/get-message-content.type'
import { MessageService } from '../services/message.service'
import { MessageType, User } from '@prisma/client'
import { BadRequest } from 'http-errors'
import error from '../constants/error'
import { createReadStream } from 'fs'
import { stat } from 'fs/promises'

export class MessageController {
  private readonly messageService = new MessageService()

  createTextMessage = async (
    req: FastifyRequest<{ Body: CreateTextMessageBody }>,
    rep: FastifyReply
  ): Promise<void> => {
    const user = req.user as User
    const { textMessage } = await this.messageService.createMessageText(req.body, user)
    rep.code(201).send({ success: true, data: { textMessage } })
  }

  createFileMessage = async (
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<void> => {
    const filePart = await req.file()
    if (!filePart) {
      throw new BadRequest(error.FILE_NOT_FOUND)
    }
    const data: CreateFileMessageBody = {
      buffer: await filePart.toBuffer(),
      originalName: filePart.filename,
      mimetype: filePart.mimetype,
    }
    const user = req.user as User
    const { fileMessage } = await this.messageService.createMessageFile(data, user)
    rep.code(201).send({ success: true, data: { fileMessage } })
  }

  getListMessages = async (
    req: FastifyRequest<{ Querystring: PaginationQuery }>,
    rep: FastifyReply
  ): Promise<void> => {
    const { messages, total, page, perPage, totalPages } =
      await this.messageService.getAllMessages(req.query)
    
    console.log({ messages, total, page, perPage, totalPages });
    rep.send({ success: true, data: { messages, total, page, perPage, totalPages } })
  }

  getContentOfMessage = async (
    req: FastifyRequest<{ Params: GetMessageContentQuery }>,
    rep: FastifyReply
  ): Promise<void> => {
    const { id } = req.params
    const user = req.user as User
    const result = await this.messageService.getMessageContent(id, user)

    if (result.type === MessageType.TEXT) {
      rep.type('text/plain').send(result.content)
    } else {
      const fullPath = result.filePath;

      const fileStats = await stat(fullPath);

      rep.raw.writeHead(200, {
        'Content-Type': result.mimeType!,
        'Content-Length': String(fileStats.size)
      })
      const stream = createReadStream(fullPath)
      stream.pipe(rep.raw)
    }
  }
}

