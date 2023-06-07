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
  access_token: string;
  access_token_exp: number;
  refresh_token: string;
  refresh_token_exp: number;
}
