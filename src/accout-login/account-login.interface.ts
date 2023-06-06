import { Document } from 'mongoose';

export interface AccountLogin extends Document {
  readonly userName: string;
  readonly password: string;
  readonly lastLoginDateTime: Date;
  readonly userId: string;
}
