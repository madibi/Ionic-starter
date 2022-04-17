import { Token } from './token.dto';

export interface VerifyCodeRS {
  status: boolean;
  message: string;
  token?: Token;
}
