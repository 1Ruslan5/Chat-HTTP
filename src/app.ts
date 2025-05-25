import Fastify from 'fastify';
import cors from '@fastify/cors';
import router from './routes/router';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import multipart from '@fastify/multipart';
import env from "./env";
import { SwaggerProvider } from './config/provider/swagger-config.provider';
import { registerGlobalErrorHandler } from './plugins/error.handler';
import authPlugin from './plugins/auth-basic.plugin'

const start = async () => {
  const app = Fastify({
    ajv: {
      customOptions: {
        removeAdditional: 'all',
        coerceTypes: true,
      }
    }
  });
  const swaggerProvider = new SwaggerProvider();

  await app.register(cors, {
    origin: env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await app.register(multipart, {
    limits: { fileSize: 10 * 1024 * 1024 }
  })

  await app.register(swagger, swaggerProvider.swaggerSetup());
  await app.register(swaggerUI, swaggerProvider.swaggerSetupUI());
  await app.register(authPlugin);

  registerGlobalErrorHandler(app);

  await app.register(router, { prefix: '/api/v1' });

  await app.listen({ host: env.BASE_URL, port: env.PORT });
  
  const address = app.server.address();
  if (address && typeof address === 'object') {
    console.info(`Server is running on path http://${address.address}:${address.port}`);
    console.info(`Docs is on this path http://${address.address}:${address.port}/docs`)
  }
}

export { start };