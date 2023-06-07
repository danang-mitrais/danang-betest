import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
// import {
//   ApiInternalServerErrorResponse,
//   ApiOkResponse,
//   ApiTags,
// } from '@nestjs/swagger';
import { refreshTokenDTO } from '../user-info/dto/user-info.dto';
import { AuthenticationService } from './authentication.service';
import { IAuthResponse } from './interfaces/auth.interface';

// @ApiTags('Authentications')
@Controller('authentications')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('refresh-token')
  // @ApiOkResponse({
  //   description: 'Refresh Token success',
  //   type: [IAuthResponse],
  // })
  async refreshToken(@Body() token: refreshTokenDTO): Promise<IAuthResponse> {
    try {
      return await this.authenticationService.refreshToken(token.refresh_token);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
