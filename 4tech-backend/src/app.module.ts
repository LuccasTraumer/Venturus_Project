import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './Controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { UserRepository } from './repository/user-repository/user-repository';
import { AuthController } from './Controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy, secretKey } from './services/auth/jwt.strategy';
import {JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      secret: secretKey, signOptions: {
        expiresIn: '1m',
      },
    }),
  ],
  controllers: [AppController,UserController,AuthController],
  providers: [AppService,UserService,UserRepository,AuthService, JwtStrategy],
})
export class AppModule {}
