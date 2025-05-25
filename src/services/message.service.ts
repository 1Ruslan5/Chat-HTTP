import { InternalServerError, NotFound,  } from "http-errors"
import errorConstant from "../constants/error";
import prisma from "../db/data-source";
import { CreateTextMessageBody } from "../types/create-text-message.type";
import { MessageRepository } from "../repositories/message.repository";
import { MessageType, User } from "@prisma/client";
import { CreateFileMessageBody } from "../types/create-file-message.type";
import fs from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'
import { PaginationQuery } from "../types/pagination.type";


export class MessageService {
  private readonly messageRepository = new MessageRepository();

  async createMessageText(data: CreateTextMessageBody, user: User) {
    const { content } = data;

    const textMessageToCreate = {
      content,
      user: {
        connect: {
          id: user.id,
        }
      },
      type: MessageType.TEXT,
    };

    try {
      return await prisma.$transaction(async (tx) => {
        const createdTextMessage = await this.messageRepository.createMessage(textMessageToCreate, tx);

        return { textMessage: createdTextMessage };
      });
    } catch (error) {
      throw new InternalServerError(errorConstant.INTERNAL_SERVER_ERROR);
    }
  }

  async createMessageFile(
    data: CreateFileMessageBody,
    user: User
  ) {
    const { buffer, originalName, mimetype } = data;
    const uploadsDir = path.resolve(`${process.cwd()}/src/uploads/`, user.id)
    await fs.mkdir(uploadsDir, { recursive: true })

    const ext = path.extname(originalName)
    const fileId = randomUUID()
    const storedName = `${fileId}${ext}`
    const fullPath = path.join(uploadsDir, storedName)

    try {
      await fs.writeFile(fullPath, buffer)

      const fileMessageToCreate = {
        content: storedName,
        fileName: originalName,
        mimeType: mimetype,
        user: {
          connect: { id: user.id }
        },
        type: MessageType.FILE
      }

      return await prisma.$transaction(async tx => {
        const created = await this.messageRepository.createMessage(
          fileMessageToCreate,
          tx
        )
        return { fileMessage: created }
      })
    } catch (err) {
      throw new InternalServerError(errorConstant.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllMessages(query: PaginationQuery) {
    const pageQuery = query.page!;
    const perPageQuery = query.perPage!;

    try {
      const { 
        messages, 
        page, 
        perPage, 
        total  
      } = await this.messageRepository.findAllMessages(pageQuery, perPageQuery);

      const totalPages = Math.ceil(total / perPage)
        
      return {
        messages,
        total,
        page,
        perPage,
        totalPages
      }
    } catch (err) {
      throw new InternalServerError(errorConstant.INTERNAL_SERVER_ERROR)
    }
  }

  async getMessageContent(id: string, user: User) {
    try {
      const msg = await this.messageRepository.findMessageById(id)
      if (!msg) {
        throw new NotFound(errorConstant.MESSAGE_NOT_FOUND)
      }

      if (msg.type === MessageType.TEXT) {
        return {
          type:    MessageType.TEXT,
          content: msg.content!
        }
      } else {
        const filePath = path.join(
          `${process.cwd()}/src/uploads/`,
          `${user.id}`,
          msg.content!
        )

        try {
          await fs.access(filePath)
        } catch {
          throw new NotFound(errorConstant.FILE_NOT_FOUND)
        }
        return {
          type:     MessageType.FILE,
          filePath,
          mimeType: msg.mimeType
        }
      }
    } catch (err) {
      if (err instanceof NotFound) {
        throw err
      }
      throw new InternalServerError(errorConstant.INTERNAL_SERVER_ERROR)
    }
  }
}