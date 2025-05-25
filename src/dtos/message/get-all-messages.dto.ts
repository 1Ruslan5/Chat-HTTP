import { Type } from "@sinclair/typebox"
import { ErrorResponse } from "../error-response.dto"
import { PaginationQuerySchema } from "../pagination.dto"
import { fileMessageDto } from "./fileMessage.dto"
import { textMessageDto } from "./textMessage.dto"

export const MessageListItemDto = Type.Union([
  Type.Intersect([
    textMessageDto,
    Type.Object({ type: Type.Literal('TEXT') })
  ]),
  Type.Intersect([
    fileMessageDto,
    Type.Object({ type: Type.Literal('FILE') })
  ])
])

export const GetAllMessagesSuccessResponse = Type.Object({
  success: Type.Boolean(),
  data: Type.Object({
    messages:  Type.Array(MessageListItemDto),
    total:     Type.Integer({ minimum: 0 }),
    page:      Type.Integer({ minimum: 1 }),
    perPage:   Type.Integer({ minimum: 1 }),
    totalPages:Type.Integer({ minimum: 1 }),
  })
})

export const GetAllMessagesSchema = {
  querystring: PaginationQuerySchema,
  response: {
    200: GetAllMessagesSuccessResponse,
    401: ErrorResponse,
    500: ErrorResponse,
  },
  tags:    ['Message'],
  summary: 'Get all messages with pagination',
}
