import { Connection } from 'mongoose';
import { UserInfoSchema } from './user-info.schema';

export const userInfoProviders = [
  {
    provide: 'USER_INFO_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('UserInfo', UserInfoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
