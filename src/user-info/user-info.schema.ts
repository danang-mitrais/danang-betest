import * as mongoose from 'mongoose';

export const UserInfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  emailAddress: { type: String, required: true, unique: true },
  registrationNumber: { type: String, required: true, unique: true },
});

UserInfoSchema.index({
  emailAddress: 1,
});
