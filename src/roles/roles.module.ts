import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), JwtModule.register({
    secret: 'secreto',
  })],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
