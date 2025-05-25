import { Type } from "@sinclair/typebox";
import { currentUserDto } from "../user/currentUser.dto";

export const fileMessageDto = Type.Object({
  id: Type.String(),
  mimeType: Type.String(),
  fileName: Type.String(),
  type: Type.Literal('FILE'),
  createdAt: Type.String({ format: 'date-time' }),

  user: currentUserDto,
});