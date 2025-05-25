import { Prisma } from "@prisma/client";
import prisma from "../db/data-source";

export class MessageRepository {
  private readonly messageRepository = prisma.message;

  async findAllMessages(page: number, perPage: number) {
    const [messages, total] = await Promise.all([
      this.messageRepository.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: { id: true, login: true, createdAt: true },
          },
        },
      }),
      this.messageRepository.count(),
    ]);

    return {
      total,
      page,
      perPage,
      messages,
    };
  }

  async findMessageById(meessageId: string) {
    return await this.messageRepository.findUnique({
      where: {
        id: meessageId,
      },
      include: { 
        user: { 
          select: {
            id: true,
            login: true,
            createdAt: true,
          } 
        } 
      } 
    });
  }

  async createMessage(message: Prisma.MessageCreateInput, tx?: Prisma.TransactionClient) {
    if (!tx) {
      return await this.messageRepository.create({ 
        data: message, 
        include: { 
          user: { 
            select: {
              id: true,
              login: true,
              createdAt: true,
            } 
          } 
        } 
      });
    }

    return await tx.message.create({ 
      data: message, 
      include: { 
        user: { 
          select: {
            id: true,
            login: true,
            createdAt: true,
          } 
        } 
      } 
    });
  }
}
