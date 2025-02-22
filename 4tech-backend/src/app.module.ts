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
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './domain/schemas/user.schema';
import { UserActivityController } from './Controllers/user-activity/user-activity.controller';
import { UserActivitySchema } from './domain/schemas/user-activity-schema';
import { UserActivityService } from './services/user-activity/user-activity.service';
import { UserActivityRepository } from './repository/user-repository/user-activity-repository/user-activity.repository';
import { WebSocketGateway } from '@nestjs/websockets';
import { WebscoketGateway } from './webscoket/webscoket.gateway';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/admin',
    {
      // Para nao importar as antigas confs
      useNewUrlParse: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema},
      { name: 'UserActivity', schema: UserActivitySchema},
      
    ]),
    JwtModule.register({
      secret: secretKey, signOptions: {
        expiresIn: '10000m',
      },
    }),
  ],
  controllers: [AppController,UserController,AuthController,UserActivityController],
  providers: [AppService,UserService,UserRepository,AuthService, JwtStrategy,UserActivityService,UserActivityRepository,WebscoketGateway],
})
export class AppModule {}
