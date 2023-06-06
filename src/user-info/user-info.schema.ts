import * as mongoose from 'mongoose';

export const UserInfoSchema = new mongoose.Schema({
  fullName: String,
  accountNumber: String,
  emailAddress: String,
  registrationNumber: String,
});
