import { Type } from "@sinclair/typebox";
import { currentUserDto } from "../user/currentUser.dto";

export const textMessageDto = Type.Object({
  id: Type.String(),
  content: Type.String(),
  type: Type.Literal('TEXT'),
  createdAt: Type.String({ format: 'date-time' }),

  user: currentUserDto,
});