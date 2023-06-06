import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInfoDto } from 'src/user-info/dto/user-info.dto';

export class CreateAccountLoginDto {
  userName: string;
  password: string;
  lastLoginDateTime?: Date;
  userId: string;
}
export class RegisterAccountDto extends CreateUserInfoDto {
  userName: string;
  password: string;
}

export class LoginAccountDto {
  userName: string;
  password: string;
}

export class UpdateAccountLoginDto extends PartialType(CreateAccountLoginDto) {
  accountId: string;
  userName?: string;
  password?: string;
}
