import { Type } from "@sinclair/typebox";

export const ErrorResponse = Type.Object({
  success: Type.Literal(false),
  message: Type.String(),
});