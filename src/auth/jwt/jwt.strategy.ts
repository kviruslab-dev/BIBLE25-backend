import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CatRepository } from 'src/cat/cat.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catRepo: CatRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catRepo.findCatByWithoutPassword(payload.sub);

    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }
}
