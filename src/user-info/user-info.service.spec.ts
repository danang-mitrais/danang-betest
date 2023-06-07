import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserService } from './user-info.service';
import { UserInfo } from './user-info.interface';
import { CreateUserInfoDto } from './dto/user-info.dto';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<UserInfo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'USER_INFO_MODEL',
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<UserInfo>>('USER_INFO_MODEL');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const findAllSpy = jest.spyOn(userModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      } as any);

      const result = await service.getAllUsers();

      expect(findAllSpy).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });

  describe('findOneById', () => {
    it('should find a user by ID', async () => {
      const userId = 'user123';
      const findOneSpy = jest.spyOn(userModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: userId }),
      } as any);

      const result = await service.findOneById(userId);

      expect(findOneSpy).toHaveBeenCalledWith({ _id: userId });
    });
  });

  // Add more test cases for other methods (findOneByEmail, findOneByAccountNumber, etc.)

  describe('updateById', () => {
    it('should update a user by ID', async () => {
      const userId = 'user123';

      const result = await service.updateById(userId);

      expect(result).toBe(`this ${userId} has been updated`);
    });
  });

  describe('deleteById', () => {
    it('should delete a user by ID', async () => {
      const userId = 'user123';

      const result = await service.deleteById(userId);

      expect(result).toBe(`this ${userId} has been deleted`);
    });
  });
});
