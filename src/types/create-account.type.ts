import { Static } from '@sinclair/typebox';
import { CreateAccountRequestBody } from '../dtos/user/create-account.dto';

export type CreateAccountBody = Static<typeof CreateAccountRequestBody>;

