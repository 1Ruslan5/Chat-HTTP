import { FastifyPluginAsync } from "fastify";
import { message } from "./message";
import { account } from "./account";

const router: FastifyPluginAsync = async (fastify) => {
  fastify.register(message, { prefix: '/message'});
  fastify.register(account, { prefix: '/account'})
};

export default router;