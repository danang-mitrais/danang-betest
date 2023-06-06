// src/user/user.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user-info.service';
import { CreateUserInfoDto } from './dto/user-info.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() body: CreateUserInfoDto) {
    return this.userService.create({ ...body });
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  async findById(@Body() body: { userId: string }) {
    return this.userService.findOneById(body.userId);
  }

  // define other HTTP verbs (put, delete)
}
