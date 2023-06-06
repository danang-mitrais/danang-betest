import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserInfoModule } from './user-info/user-info.module';
import { AccountLoginModule } from './accout-login/account-login.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserInfoModule,
    AccountLoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
