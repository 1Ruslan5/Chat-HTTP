import { FastifyReply, FastifyRequest } from "fastify";
import { AccountService } from "../services/account.service";
import { CreateAccountBody } from "../types/create-account.type";
import { SuccessResponseDto } from "../dtos/succes-response.dto";

export class AccountController {
  private readonly accountService: AccountService = new AccountService();

  register = async (req: FastifyRequest<{ Body: CreateAccountBody }>, res: FastifyReply) => {
    const data = req.body;
    const { currentUser } = await this.accountService.createAccount(data);

    res.status(201).send(new SuccessResponseDto({ success: true, currentAccount: currentUser }))
  }
}