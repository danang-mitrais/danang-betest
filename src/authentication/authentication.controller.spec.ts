import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let mockAuthenticationService: any;

  beforeEach(async () => {
    mockAuthenticationService = {
      refreshToken: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthenticationService },
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('refreshToken', () => {
    it('should refresh a token', async () => {
      const refreshTokenDTO = { refresh_token: 'valid-refresh-token' };
      const expectedResponse = {
        access_token: 'valid-access-token',
        access_token_exp: new Date(Date.now() + 3600 * 1000),
      };

      mockAuthenticationService.refreshToken.mockResolvedValue(
        expectedResponse,
      );

      const result = await controller.refreshToken(refreshTokenDTO);

      expect(result).toEqual(expectedResponse);
      expect(mockAuthenticationService.refreshToken).toHaveBeenCalledWith(
        refreshTokenDTO.refresh_token,
      );
    });

    it('should throw BadRequestException when refresh token fails', async () => {
      const refreshTokenDTO = { refresh_token: 'invalid-refresh-token' };
      const error = new Error('Failed to refresh token.');

      mockAuthenticationService.refreshToken.mockRejectedValue(error);

      await expect(controller.refreshToken(refreshTokenDTO)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
