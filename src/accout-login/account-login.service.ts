import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { AccountLogin } from './account-login.interface';
import {
  CreateAccountLoginDto,
  UpdateAccountLoginDto,
} from './dto/account-login.dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_LOGIN_MODEL') private accountModel: Model<AccountLogin>,
  ) {}

  async create(createAccountDto: CreateAccountLoginDto): Promise<AccountLogin> {
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  async findAll(): Promise<AccountLogin[]> {
    return this.accountModel.find().exec();
  }

  async findOneByUserName(userName: string): Promise<AccountLogin> {
    return this.accountModel.findOne({ userName: userName });
  }

  async updateLastLogin(userName: string) {
    return this.accountModel.findOneAndUpdate(
      { userName: userName },
      { lastLoginDateTime: new Date() },
    );
  }

  async updateAccountData(
    accountId: string,
    updateAccountDto: UpdateAccountLoginDto,
  ) {
    return this.accountModel.findOneAndUpdate(
      { _id: accountId },
      updateAccountDto,
    );
  }

  async updateById(accountId: string) {
    return `this ${accountId} has been updated`;
  }

  async deleteById(accountId: string) {
    return `this ${accountId} has been deleted`;
  }

  // continue to define other CRUD operations (update, delete)
}
