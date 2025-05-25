import { Type } from '@sinclair/typebox'
import { ErrorResponse } from '../error-response.dto'

export const GetMessageContentQuery = Type.Object({
  id: Type.String({ format: 'uuid', description: 'Message Id' })
})

export const GetMessageContentSchema = {
  params: GetMessageContentQuery,
  response: {
    200: Type.Union([
      Type.String({
        format:      'text',
        description: 'Raw text content (Content-Type: text/plain)'
      }),
      Type.String({
        format:      'binary',
        description: 'Raw file data (Content-Type matches stored mimeType)'
      })
    ]),
    401: ErrorResponse,
    404: ErrorResponse,
    500: ErrorResponse
  },
  tags:    ['Message'],
  summary: 'Get raw content for a single message'
}
