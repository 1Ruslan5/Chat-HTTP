import { Type } from "@sinclair/typebox";

export const currentUserDto = Type.Object({
  id: Type.String(),
  login: Type.String({ format: 'email' }),
  createdAt: Type.String({ format: 'date-time' }),
});