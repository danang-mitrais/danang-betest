import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class TokenHelper {
  /**
   * Signs token helper
   * @param payload - your json object
   * @param secret - your private hash
   * @param expiresIn - seconds
   * @returns
   */
  static async generate(
    payload: Record<string, any>,
    secret: string,
    expiresIn: string,
  ): Promise<{
    token: string;
    expires: number;
  }> {
    const token = await jwt.sign(payload, secret, {
      expiresIn: expiresIn,
    });

    const decoded = jwt.decode(token) as jwt.JwtPayload;

    return {
      token: token,
      expires: decoded.exp,
    };
  }

  static async verify(token: string, secret: string): Promise<jwt.JwtPayload> {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.verify(token, secret) as jwt.JwtPayload;
        resolve(payload);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getIdFromToken(token: string): Promise<string> {
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      const { id } = decoded;
      return id;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  static async getEmailFromToken(token: string): Promise<string> {
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      const { email } = decoded;
      return email;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
