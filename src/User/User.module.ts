import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from 'src/User/User.controller';
import { UserService } from 'src/User/User.service';
import { ValidateUserNameMiddleware } from 'src/middleware/validator-user/validator-user.middleware';
import { User } from './User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserNameMiddleware).forRoutes(
      {
        path: 'users',
        method: RequestMethod.POST,
      },
      {
        path: 'users/:id',
        method: RequestMethod.PUT,
      },
    );
  }
}
