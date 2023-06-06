// import { ApiProperty } from '@nestjs/swagger';

export interface ITokenPayload {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  email: string;
  exp: number;
}

export interface IBaseRequest extends Request {
  accessToken: string;
}

export interface IAuthRequest extends IBaseRequest {
  tokenPayload: ITokenPayload;
}

export interface IRefreshToken {
  refresh_token: string;
}

export class IAuthResponse {
  // @ApiProperty({
  //   type: String,
  // })
  access_token: string;
  // @ApiProperty({
  //   type: Number,
  // })
  access_token_exp: number;
  // @ApiProperty({
  //   type: String,
  // })
  refresh_token: string;
  // @ApiProperty({
  //   type: Number,
  // })
  refresh_token_exp: number;
}
