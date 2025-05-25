import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import env from '../env';
import errorConstant from '../constants/error';

export function registerGlobalErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((
    error: FastifyError,
    _request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const status = 'statusCode' in error
      ? (error.statusCode as number)
      : 500

    if (status === 401) {
      reply.removeHeader('WWW-Authenticate')
    }

    reply.status(status).send({
      success: false,
      message: env.NODE_ENV === 'development'
        ? error.message
        : errorConstant.INTERNAL_SERVER_ERROR,
    });
  });
}