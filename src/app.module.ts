import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserInfoModule } from './user-info/user-info.module';
import { AccountLoginModule } from './accout-login/account-login.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { KafkaProducerService } from './services/kafka.producer.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserInfoModule,
    AccountLoginModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService, KafkaProducerService],
})
export class AppModule {}
