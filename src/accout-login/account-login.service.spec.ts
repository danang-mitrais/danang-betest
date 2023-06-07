import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AccountService } from './account-login.service';
import { UpdateAccountLoginDto } from './dto/account-login.dto';
import { AccountLogin } from './account-login.interface';

describe('AccountService', () => {
  let service: AccountService;
  let accountModel: Model<AccountLogin>;

  const mockAccountModel = {
    create: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([]),
    }),
    findOne: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    }),
    findOneAndUpdate: jest.fn().mockResolvedValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: 'ACCOUNT_LOGIN_MODEL',
          useValue: mockAccountModel,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    accountModel = module.get<Model<AccountLogin>>('ACCOUNT_LOGIN_MODEL');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all accounts', async () => {
      const result = await service.findAll();

      expect(accountModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOneByUserName', () => {
    it('should return an account by username', async () => {
      const userName = 'johndoe';

      const result = await service.findOneByUserName(userName);

      expect(accountModel.findOne).toHaveBeenCalledWith({ userName });
    });
  });

  describe('updateLastLogin', () => {
    it('should update the last login datetime', async () => {
      const userName = 'johndoe';

      await service.updateLastLogin(userName);

      expect(accountModel.findOneAndUpdate).toHaveBeenCalledWith(
        { userName },
        { lastLoginDateTime: expect.any(Date) },
      );
    });
  });

  describe('updateAccountData', () => {
    it('should update an account by ID', async () => {
      const accountId = 'account123';
      const updateAccountDto: UpdateAccountLoginDto = {
        userName: 'newusername',
      };

      await service.updateAccountData(accountId, updateAccountDto);

      expect(accountModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: accountId },
        updateAccountDto,
      );
    });
  });

  describe('updateById', () => {
    it('should return a success message for update by ID', async () => {
      const accountId = 'account123';

      const result = await service.updateById(accountId);

      expect(result).toBe(`this ${accountId} has been updated`);
    });
  });

  describe('deleteById', () => {
    it('should return a success message for delete by ID', async () => {
      const accountId = 'account123';

      const result = await service.deleteById(accountId);

      expect(result).toBe(`this ${accountId} has been deleted`);
    });
  });
});
