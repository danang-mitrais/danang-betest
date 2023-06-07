import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account-login.controller';
import { AccountService } from './account-login.service';
import { UserService } from '../user-info/user-info.service';
import { AuthenticationService } from '../authentication/authentication.service';

describe('AccountController', () => {
  let controller: AccountController;
  let accountService: AccountService;
  let userService: UserService;
  let authService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        { provide: AccountService, useValue: {} },
        { provide: UserService, useValue: {} },
        { provide: AuthenticationService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    accountService = module.get<AccountService>(AccountService);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more test cases for each method in the controller
  // For example
  describe('create', () => {
    it('should call userService.create and accountService.create', async () => {
      const mockUser = { _id: 'someId' };
      const mockAccount = {
        userName: 'test',
        password: 'test',
        fullName: 'John Doe',
        accountNumber: '12345',
        emailAddress: 'john@gmail.com',
        registrationNumber: '09876',
      };
      userService.create = jest.fn().mockResolvedValue(mockUser);
      accountService.create = jest.fn().mockResolvedValue(null);

      await controller.create(mockAccount);
      expect(userService.create).toHaveBeenCalled();
      expect(accountService.create).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should call accountService.findOneByUserName, userService.findOneById, accountService.updateLastLogin and authService.generateTokens', async () => {
      const mockAccount = { userName: 'test', password: 'test' };
      const mockUser = { _id: 'someId' };
      accountService.findOneByUserName = jest
        .fn()
        .mockResolvedValue(mockAccount);
      userService.findOneById = jest.fn().mockResolvedValue(mockUser);
      accountService.updateLastLogin = jest.fn().mockResolvedValue(null);
      authService.generateTokens = jest.fn().mockResolvedValue('token');

      await controller.login(mockAccount);
      expect(accountService.findOneByUserName).toHaveBeenCalled();
      expect(userService.findOneById).toHaveBeenCalled();
      expect(accountService.updateLastLogin).toHaveBeenCalled();
      expect(authService.generateTokens).toHaveBeenCalled();
    });
  });
});
