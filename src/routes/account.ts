import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { AccountController } from "../controllers/account.controller";
import { CreateAccountSchema } from "../dtos/user/create-account.dto";

const accountController = new AccountController();

export const account = async (fastify: FastifyInstance, _options: FastifyPluginOptions): Promise<void> => {
  fastify.post("/register", { schema: CreateAccountSchema }, accountController.register);
}