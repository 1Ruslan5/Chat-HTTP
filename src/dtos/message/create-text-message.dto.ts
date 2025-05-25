import { Type } from '@sinclair/typebox';
import { textMessageDto } from './textMessage.dto';
import { ErrorResponse } from '../error-response.dto';

export const CreateTextMessageBody = Type.Object({
  content: Type.String({ 
    minLength: 1, 
    description: 'Text message' 
  }),
})

export const CreateTextMessgeSuccessResponse = Type.Object({
  success: Type.Boolean(),
  data: Type.Object({ textMessage: textMessageDto }),
});

export const CreateTextMessageSchema = {
  body: CreateTextMessageBody,
  response: {
    201: CreateTextMessgeSuccessResponse,
    401: ErrorResponse,
    500: ErrorResponse,
  },
  tags: ['Message'],
  summary: 'Create new text message',
};
