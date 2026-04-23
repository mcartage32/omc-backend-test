import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login() {
    const payload = { sub: 1, email: 'admin@test.com' };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
