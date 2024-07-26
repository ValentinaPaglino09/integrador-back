import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORM } from './config/typeORM';

@Module({
  imports: [TypeOrmModule.forRoot(typeORM()), UsersModule, RolesModule, LoginModule, SignupModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
