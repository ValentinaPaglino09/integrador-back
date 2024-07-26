import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateGuard } from './validate/validate.guard';


@Controller('users')
@UseGuards(ValidateGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() request: Request) {
    return this.usersService.create(createUserDto, request);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.usersService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    return this.usersService.findOne(id, request);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() request: Request) {
    return this.usersService.update(id, updateUserDto, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.usersService.remove(id, request);
  }
}
