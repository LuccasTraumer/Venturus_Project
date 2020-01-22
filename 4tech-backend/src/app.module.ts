import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './Controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { UserRepository } from './repository/user-repository/user-repository';

@Module({
  imports: [],
  controllers: [AppController,UserController],
  providers: [AppService,UserService,UserRepository],
})
export class AppModule {}
