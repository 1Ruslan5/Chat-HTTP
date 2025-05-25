import { Static } from "@sinclair/typebox";
import { PaginationQuerySchema } from "../dtos/pagination.dto";

export type PaginationQuery = Static<typeof PaginationQuerySchema>