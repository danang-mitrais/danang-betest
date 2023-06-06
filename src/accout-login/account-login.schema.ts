// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class AccountLogin extends Document {
//   @Prop({ required: true })
//   accountId: string;

//   @Prop({ required: true })
//   userName: string;

//   @Prop({ required: true })
//   password: string;

//   @Prop({ required: true })
//   lastLoginDateTime: Date;

//   @Prop({ required: true })
//   userId: string;
// }

// export const AccountSchema = SchemaFactory.createForClass(AccountLogin);

import * as mongoose from 'mongoose';

export const AccountLoginSchema = new mongoose.Schema({
  userName: String,
  password: String,
  lastLoginDateTime: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo' },
});
