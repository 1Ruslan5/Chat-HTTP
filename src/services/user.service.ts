import { Prisma } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private readonly userRepository: UserRepository = new UserRepository();

  async findUserByLogin(login: string) {
    return await this.userRepository.findUserByLogin(login);
  }

  async createUser(user: Prisma.UserCreateInput, tx?: Prisma.TransactionClient) {
    return await this.userRepository.createUser(user, tx);
  }

  async findUserById(id: string) {
    return await this.userRepository.findUserById(id);
  }
}