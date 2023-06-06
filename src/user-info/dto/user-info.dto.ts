import { PartialType } from '@nestjs/mapped-types';

export class CreateUserInfoDto {
  fullName: string;
  accountNumber: string;
  emailAddress: string;
  registrationNumber: string;
}

export class UpdateUserInfoDto extends PartialType(CreateUserInfoDto) {
  userId: string;
}

export class refreshTokenDTO {
  refresh_token: string;
}
