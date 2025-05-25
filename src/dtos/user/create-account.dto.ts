import { Type } from '@sinclair/typebox';
import { currentUserDto } from './currentUser.dto';
import { ErrorResponse } from '../error-response.dto';

export const CreateAccountRequestBody = Type.Object({
  login: Type.String({ format: 'email', description: "Your email" }),
  password: Type.String({
    minLength: 10,
    maxLength: 30,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]{10,30}$',
    description: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character from the set !@#$%^&*()"
  }),
});

export const CreateAccountSuccessResponse = Type.Object({
  success: Type.Boolean(),
  data: Type.Object({ currentAccount: currentUserDto }),
});

export const CreateAccountSchema = {
  body: CreateAccountRequestBody,
  response: {
    201: CreateAccountSuccessResponse,
    409: ErrorResponse,
    500: ErrorResponse,
  },
  tags: ['Account'],
  summary: 'Register new account',
};
