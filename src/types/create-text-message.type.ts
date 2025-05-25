import { Static } from "@sinclair/typebox";
import { CreateTextMessageBody } from "../dtos/message/create-text-message.dto";

export type CreateTextMessageBody = Static<typeof CreateTextMessageBody>