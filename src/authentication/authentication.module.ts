import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { UserService } from '../user-info/user-info.service';
import { userInfoProviders } from '../user-info/user-info.providers';
import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/database.providers';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '180s' },
    }),
    DatabaseModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtStrategy,
    UserService,
    ...userInfoProviders,
    ...databaseProviders,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
