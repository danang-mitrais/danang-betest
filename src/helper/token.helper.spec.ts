import * as jwt from 'jsonwebtoken';
import { TokenHelper } from './token.helper';

describe('TokenHelper', () => {
  describe('generate', () => {
    it('should return token and expires', async () => {
      const dummyToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiamhvbiIsImxhc3RfbmFtZSI6ImRvZSIsImVtYWlsIjoiamhvbi5kb2VAZ21haWwuY29tIiwibW9iaWxlX251bWJlciI6bnVsbCwiaWQiOjQwLCJyb2xlX2lkIjozLCJhZGRyZXNzIjp7fSwiaWF0IjoxNjc4OTMyNDA1LCJleHAiOjE2NzkwMTg4MDV9.sWq-Q9fkm_0uL6S3lnnVGVzPRTMtbk5bv2KwfE-PnAc';

      // const dummyDecoded = {
      //   first_name: 'Jhon',
      //   last_name: 'Doe',
      //   email: 'jhon.doe@gmail.com',
      //   mobile_number: null,
      //   id: 1,
      //   role_id: 3,
      //   address: {},
      //   iat: 1678430531,
      //   exp: 1678434131,
      // };

      const jwtSign = jest.spyOn(jwt, 'sign');
      jwtSign.mockImplementation(async () => dummyToken);

      // const jwtDecode = jest.spyOn(jwt, 'decode');
      // jwtDecode.mockImplementation(() => () => dummyDecoded);

      const body = {
        first_name: 'jhon',
        last_name: 'doe',
        email: 'jhon.doe@gmail.com',
        mobile_number: '0890890890890',
        id: 1,
        role_id: 3,
        address: 1,
      };

      const result = await TokenHelper.generate(
        body,
        'process.env.TOKEN_SECRET',
        '1000',
      );

      expect(jwtSign).toHaveBeenCalled();
      expect(typeof result == 'object').toBe(true);
      expect(Object.keys(result).sort()).toEqual(['token', 'expires'].sort());
    });
  });
});
