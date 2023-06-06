import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account-login.service';
import { UserService } from 'src/user-info/user-info.service';
import { LoginAccountDto, RegisterAccountDto } from './dto/account-login.dto';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
  ) {}

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
      const user = await this.accountService.findOneByUserName(body.userName);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const isPasswordMatch = body.password === user.password;
      if (!isPasswordMatch) {
        throw new BadRequestException('Username or Password incorrect');
      }
      return 'Login Success';
    } catch (error) {
      if (error.response) {
        throw new BadRequestException(error.response);
      }
      throw new BadRequestException(error);
    }
  }
}
