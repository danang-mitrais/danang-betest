import { Connection } from 'mongoose';
import { AccountLoginSchema } from './account-login.schema';

export const accountLoginProviders = [
  {
    provide: 'ACCOUNT_LOGIN_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('AccountLogin', AccountLoginSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
