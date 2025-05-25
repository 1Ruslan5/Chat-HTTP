import { MessageType } from "@prisma/client";
import { Type } from "@sinclair/typebox";

export const messageType = Type.Union([
  Type.Literal(MessageType.TEXT),
  Type.Literal(MessageType.FILE),
]);