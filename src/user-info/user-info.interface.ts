import { Document } from 'mongoose';

export interface UserInfo extends Document {
  readonly fullName: string;
  readonly accountNumber: string;
  readonly emailAddress: string;
  readonly registrationNumber: string;
}
