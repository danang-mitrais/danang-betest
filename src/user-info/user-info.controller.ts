import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user-info.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.getAllUsers();
  }

  @Post()
  async findById(@Body() body: { userId: string }) {
    return this.userService.findOneById(body.userId);
  }

  // define other HTTP verbs (put, delete)
}
