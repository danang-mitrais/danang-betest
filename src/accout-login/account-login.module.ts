import { Module } from '@nestjs/common';
import { AccountController } from './account-login.controller';
import { DatabaseModule } from '../database/database.module';
import { AccountService } from './account-login.service';
import { accountLoginProviders } from './account-login.providers';
import { UserInfoModule } from '../user-info/user-info.module';
import { AuthenticationService } from '../authentication/authentication.service';

@Module({
  imports: [DatabaseModule, UserInfoModule],
  controllers: [AccountController],
  providers: [AccountService, AuthenticationService, ...accountLoginProviders],
})
export class AccountLoginModule {}
