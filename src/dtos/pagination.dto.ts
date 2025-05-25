import { Type } from '@sinclair/typebox'

const BasePagination = Type.Object({
  page:    Type.Integer({ minimum: 1, default: 1 }),
  perPage: Type.Integer({ minimum: 1, maximum: 100, default: 10 }),
})

export const PaginationQuerySchema = Type.Partial(BasePagination)
