import * as mongoose from 'mongoose';

export const AccountLoginSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLoginDateTime: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo',
    required: true,
  },
});

AccountLoginSchema.index({ userName: 1 });
