import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';
import { UserService } from '../user-info/user-info.service';
import { AuthenticationService } from './authentication.service';
import { TokenHelper } from '../helper/token.helper';
import { UserInfo } from 'src/user-info/user-info.interface';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let mockUserService: any;
  let mockTokenHelper: any;

  beforeEach(async () => {
    mockUserService = {
      findOneByEmail: jest.fn(),
    };
    mockTokenHelper = {
      verify: jest.fn(),
      generate: jest.fn(),
      getEmailFromToken: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: UserService, useValue: mockUserService },
        { provide: TokenHelper, useValue: mockTokenHelper },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('verifyToken', () => {
    it('should throw UnauthorizedException if token is expired', async () => {
      const token = 'expired-token';
      const secret = 'secret';

      mockTokenHelper.verify.mockRejectedValue(
        new TokenExpiredError('jwt expired', new Date()),
      );

      await expect(service.verifyToken(token, secret)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if token is invalid', async () => {
      const token = 'invalid-token';
      const secret = 'secret';

      mockTokenHelper.verify.mockRejectedValue(new Error('invalid token'));

      await expect(service.verifyToken(token, secret)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
  describe('generateTokens', () => {
    //     it('should generate access and refresh tokens', async () => {
    //       const user = {
    //         fullName: 'Test User',
    //         accountNumber: '123456',
    //         emailAddress: 'test@email.com',
    //         registrationNumber: 'REG123',
    //       };
    //       const tokenResponse = {
    //         token: 'valid-token',
    //         expires: new Date(Date.now() + 3600 * 1000),
    //       };

    //       mockTokenHelper.generate.mockResolvedValue(tokenResponse);

    //       const result = await service.generateTokens(user);

    //       expect(result).toEqual({
    //         access_token: tokenResponse.token,
    //         access_token_exp: tokenResponse.expires,
    //         refresh_token: tokenResponse.token,
    //         refresh_token_exp: tokenResponse.expires,
    //       });
    //     });
    //   });

    describe('refreshToken', () => {
      it('should throw an error if no user found', async () => {
        const refresh_token = 'refresh-token';

        mockTokenHelper.verify.mockResolvedValue({});
        mockTokenHelper.getEmailFromToken.mockResolvedValue('test@email.com');
        mockUserService.findOneByEmail.mockResolvedValue(null);

        await expect(service.refreshToken(refresh_token)).rejects.toThrowError(
          'jwt malformed',
        );
      });

      it('should throw an error if token generation fails', async () => {
        const refresh_token = 'refresh-token';
        const email = 'test@email.com';
        const user = {
          fullName: 'Test User',
          accountNumber: '123456',
          emailAddress: email,
          registrationNumber: 'REG123',
        };

        mockTokenHelper.verify.mockResolvedValue({});
        mockTokenHelper.getEmailFromToken.mockResolvedValue(email);
        mockUserService.findOneByEmail.mockResolvedValue(user);
        mockTokenHelper.generate.mockResolvedValue(null);

        await expect(service.refreshToken(refresh_token)).rejects.toThrowError(
          'jwt malformed',
        );
      });
    });
  });
});

// Implement more tests for generateTokens() and refreshToken() following the same structure
