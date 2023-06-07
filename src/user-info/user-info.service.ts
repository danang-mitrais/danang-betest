import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserInfo } from './user-info.interface';
import { CreateUserInfoDto } from './dto/user-info.dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_INFO_MODEL') private userModel: Model<UserInfo>) {}

  async create(createUserDto: CreateUserInfoDto): Promise<UserInfo> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserInfo[]> {
    return this.userModel.find().exec();
  }

  async findOneById(userId: string): Promise<UserInfo> {
    return this.userModel.findOne({ _id: userId });
  }

  async findOneByEmail(email: string): Promise<UserInfo> {
    return this.userModel.findOne({ emailAddress: email });
  }

  async findOneByAccountNumber(accountNumber: string): Promise<UserInfo> {
    return this.userModel.findOne({ accountNumber: accountNumber });
  }

  async findOneByRegistrationNumber(
    registrationNumber: string,
  ): Promise<UserInfo> {
    return this.userModel.findOne({ registrationNumber: registrationNumber });
  }

  async updateById(userId: string) {
    return `this ${userId} has been updated`;
  }

  async deleteById(userId: string) {
    return `this ${userId} has been deleted`;
  }

  // continue to define other CRUD operations (update, delete)
}
