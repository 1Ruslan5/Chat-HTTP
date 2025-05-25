import { CreateAccountBody } from "../types/create-account.type";
import { UserService } from "./user.service";
import { Conflict, InternalServerError } from "http-errors"
import errorConstant from "../constants/error";
import bcryptjs from "bcryptjs";
import prisma from "../db/data-source";

export class AccountService {
  private readonly userService: UserService = new UserService();

  async createAccount (data: CreateAccountBody) {
    const { login, password } = data;

    const user = await this.userService.findUserByLogin(login);

    if(user) {
      throw new Conflict(errorConstant.USER_ALREADY_EXIST)
    }

    const passwordHash = await bcryptjs.hash(password, 12)
  
    const userToCreate = {
      login,
      passwordHash,
    };

    try {
      return await prisma.$transaction(async (tx) => {
        const createdUser = await this.userService.createUser(userToCreate, tx);

        return { currentUser: createdUser};
      });
    } catch (error) {
      throw new InternalServerError(errorConstant.INTERNAL_SERVER_ERROR);
    }
  }
}