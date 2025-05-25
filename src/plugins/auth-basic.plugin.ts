import fp from 'fastify-plugin';
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import basicAuth from '@fastify/basic-auth'
import prisma from "../db/data-source";
import { Unauthorized } from "http-errors";
import bcrypt from "bcryptjs";
import { User } from '@prisma/client';


declare module 'fastify' {
  interface FastifyRequest {
    user?: User
  }
}

const authPlugin = async (app: FastifyInstance) => {
  app.decorateRequest('user', undefined)
  
  await app.register(basicAuth, {
    validate: async (username: string, password: string, req: FastifyRequest, _reply: FastifyReply) => {
      const user = await prisma.user.findUnique({ where: { login: username } })
      if (!user) {
        throw new Unauthorized('Invalid credentials')
      }

      const match = await bcrypt.compare(password, user.passwordHash)
      if (!match) {
        throw new Unauthorized('Invalid credentials')
      }

      req.user = user
    },
    authenticate: true
  })
}

export default fp(authPlugin);