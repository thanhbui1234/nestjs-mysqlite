import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/middleware/logger/logger.middleware';
import { UserModule } from 'src/User/User.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/database/app.db', // đặt file db trong source
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // tự động tạo bảng (chỉ dùng lúc dev)
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'], // 👈 Chỉ định nơi để migrations
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Apply cho tất cả routes
  }
}
