import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './Controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { UserRepository } from './repository/user-repository/user-repository';
import { AuthController } from './Controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [],
  controllers: [AppController,UserController,AuthController],
  providers: [AppService,UserService,UserRepository,AuthService],
})
export class AppModule {}
