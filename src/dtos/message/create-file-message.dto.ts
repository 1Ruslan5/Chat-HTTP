import { Type } from "@sinclair/typebox";
import { fileMessageDto } from "./fileMessage.dto";
import { ErrorResponse } from "../error-response.dto";

export const CreateFileMessgeSuccessResponse = Type.Object({
  success: Type.Boolean(),
  data: Type.Object({ fileMessage: fileMessageDto }),
});

export const CreateFileMessageSchema = {
  consumes: ['multipart/form-data'],
  response: {
    201: CreateFileMessgeSuccessResponse,
    401: ErrorResponse,
    500: ErrorResponse,
  },
  tags: ['Message'],
  summary: 'Create new file message',
};