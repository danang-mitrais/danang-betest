import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';
import { IAuthResponse } from './interfaces/auth.interface';
import { TokenHelper } from 'src/helper/token.helper';
import { UserService } from 'src/user-info/user-info.service';
import { UserInfo } from 'src/user-info/user-info.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(UserService) protected readonly userService: UserService,
  ) {}

  /**
   * Verify token string and extract data from it
   * @param  {string} token
   * @param  {string} secrect
   */
  async verifyToken(token: string, secret: string) {
    try {
      return await TokenHelper.verify(token, secret);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('auth.token.expired');
      }
      throw new UnauthorizedException('auth.token.invalid');
    }
  }

  /**
   * Generate:
   *   - accessToken: To access to our service.
   *   - refreshToken: To refesh the accessToken.
   * @param user object of User
   */
  async generateTokens(user: UserInfo): Promise<IAuthResponse> {
    const promises = [];

    const body = {
      full_name: user.fullName,
      account_number: user.accountNumber,
      email: user.emailAddress,
      registration_number: user.registrationNumber,
    };

    promises.push(
      TokenHelper.generate(
        body,
        process.env.TOKEN_SECRET,
        process.env.TOKEN_EXPIRES,
      ),
    );

    promises.push(
      TokenHelper.generate(
        body,
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXPIRES,
      ),
    );
    const [accessToken, refreshToken] = await Promise.all(promises);

    return {
      access_token: accessToken.token,
      access_token_exp: accessToken.expires,
      refresh_token: refreshToken.token,
      refresh_token_exp: refreshToken.expires,
    };
  }

  async refreshToken(refresh_token: string): Promise<any> {
    const tokenPayload = await TokenHelper.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const email = await TokenHelper.getEmailFromToken(refresh_token);
    const user = await this.userService.findOneByEmail(email);

    let tokens: any;
    if (user) {
      const body = {
        full_name: user.fullName,
        account_number: user.accountNumber,
        email: user.emailAddress,
        registration_number: user.registrationNumber,
      };

      tokens = await TokenHelper.generate(
        body,
        process.env.TOKEN_SECRET,
        process.env.TOKEN_EXPIRES,
      );
    } else {
      throw new Error('Failed to get user.');
    }

    if (!tokens) {
      throw new Error('Failed to refresh token.');
    }
    return {
      access_token: tokens.token,
      access_token_exp: tokens.expires,
    };
  }
}
