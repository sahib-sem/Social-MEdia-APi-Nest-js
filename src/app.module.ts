import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
