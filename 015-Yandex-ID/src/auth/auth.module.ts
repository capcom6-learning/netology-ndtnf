import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from './auth.models';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { YandexStrategy } from './yandex.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '2 days',
        }
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, YandexStrategy],
})
export class AuthModule { }
