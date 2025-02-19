import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [JwtModule.register({
    secret: 'secreto',
  }), TypeOrmModule.forFeature([User])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
