import { EmployeeEntity, PersonEntity } from '@app/common/database/models';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @InjectRepository(PersonEntity)
    private readonly personEntity: Repository<PersonEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: EmployeeEntity) {
    try {
      console.log('Token payload', payload);
      const employee = await this.personEntity.findOneBy({
        email: payload._person.email,
      });

      if (!employee) throw new UnauthorizedException();

      return payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
