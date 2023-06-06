import { Module } from '@nestjs/common';
import { UserController } from './user-info.controller';
import { UserService } from './user-info.service';
import { userInfoProviders } from './user-info.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userInfoProviders],
  exports: [UserService],
})
export class UserInfoModule {}
