import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account-login.service';
import { UserService } from '../user-info/user-info.service';
import { LoginAccountDto, RegisterAccountDto } from './dto/account-login.dto';
import { AuthenticationService } from '../authentication/authentication.service';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
    private readonly authService: AuthenticationService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async accountDetail() {
    return 'this is details about your account';
  }

  @Post('registers')
  async create(@Body() body: RegisterAccountDto) {
    const resUserInfo = await this.userService.create({
      fullName: body.fullName,
      accountNumber: body.accountNumber,
      emailAddress: body.emailAddress,
      registrationNumber: body.registrationNumber,
    });
    this.accountService.create({
      userName: body.userName,
      password: body.password,
      userId: resUserInfo._id,
    });
    return 'Account has been created';
  }

  @Post('signin')
  async login(@Body() body: LoginAccountDto) {
    try {
      const account = await this.accountService.findOneByUserName(
        body.userName,
      );
      if (!account) {
        throw new BadRequestException('User not found');
      }
      const isPasswordMatch = body.password === account.password;
      if (!isPasswordMatch) {
        throw new BadRequestException('Username or Password incorrect');
      }
      const userInfo = await this.userService.findOneById(account.userId);
      this.accountService.updateLastLogin(body.userName);

      return this.authService.generateTokens(userInfo);
    } catch (error) {
      if (error.response) {
        throw new BadRequestException(error.response);
      }
      throw new BadRequestException(error);
    }
  }
}
