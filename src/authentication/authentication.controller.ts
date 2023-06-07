import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { refreshTokenDTO } from '../user-info/dto/user-info.dto';
import { AuthenticationService } from './authentication.service';
import { IAuthResponse } from './interfaces/auth.interface';

@Controller('authentications')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('refresh-token')
  async refreshToken(@Body() token: refreshTokenDTO): Promise<IAuthResponse> {
    try {
      return await this.authenticationService.refreshToken(token.refresh_token);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
