import type { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import type { FastifySwaggerUiOptions }        from '@fastify/swagger-ui'

export class SwaggerProvider {
  swaggerSetup(): FastifyDynamicSwaggerOptions {
    return {
      mode: 'dynamic',
      openapi: {
        openapi: '3.0.0',
        info: {
          title:   'Chat API',
          version: '1.0.0'
        },
        components: {
          securitySchemes: {
            basicAuth: {
              type:   'http',
              scheme: 'basic'
            }
          }
        },
        security: [
          { basicAuth: [] }
        ]
      }
    }
  }

  swaggerSetupUI(): FastifySwaggerUiOptions {
    return {
      routePrefix: '/docs',
      uiConfig:    { docExpansion: 'list' },
      staticCSP:   true,
    }
  }
}
