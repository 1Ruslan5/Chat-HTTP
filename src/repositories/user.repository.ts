import { Prisma } from "@prisma/client";
import prisma from "../db/data-source";

export class UserRepository {
  private readonly userRepository = prisma.user;

  async findUserByLogin(login: string) {
    return await this.userRepository.findUnique({
      where: {
        login,
      },
    });
  }

  async findUserById(userId: string) {
    return await this.userRepository.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async createUser(user: Prisma.UserCreateInput, tx?: Prisma.TransactionClient) {
    if (!tx) {
      return await this.userRepository.create({ data: user });
    }

    return await tx.user.create({ data: user });
  }
}
