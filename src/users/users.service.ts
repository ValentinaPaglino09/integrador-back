import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { User } from './entities/user.entity';
const crypto = require('crypto')

@Injectable()
export class UsersService {

constructor(
  @InjectRepository(User)
  private readonly usersRepository: Repository<User> 
) {}

  create(createUserDto: CreateUserDto, request: Request) {

    const {email, password, role} = createUserDto 
    
    const userRole = request['user']
    if (userRole != "admin") throw new UnauthorizedException()

      const hashPass =  crypto.createHash('sha256').update(password).digest('hex')

    return this.usersRepository.save({email: email, password: hashPass, role: role})
  }

  findAll(request: Request) {
   
   const userRole = request['user']
   
    if (userRole != "admin" && userRole != "basic") throw new UnauthorizedException()

    return this.usersRepository.find({relations: {role: true}})
  }

  async findOne(id: string, request: Request) {
   
    const userRole = request['user']
   
    if (userRole != "admin" && userRole != "basic") throw new UnauthorizedException()

    const user = await this.usersRepository.findOne({where: {id: Equal(id)}, relations: {role: true}})
    if (!user) throw new BadRequestException(`El usuario con id ${id} no existe.`)
    return user  
  }

  async update(id: string, updateUserDto: UpdateUserDto, request: Request) {

    const userRole = request['user']
    if (userRole != "admin") throw new UnauthorizedException()

    const user = await this.usersRepository.findOne({where: {id: Equal(id)}, relations: {role: true}})
    if (!user) throw new BadRequestException(`El usuario con id ${id} no existe.`)
    await this.usersRepository.update({id}, updateUserDto)  
  }

  async remove(id: string, request: Request) {

   
   const userRole = request['user']
    if (userRole != "admin") throw new UnauthorizedException()

    const user = await this.usersRepository.findOne({where: {id: Equal(id)}, relations: {role: true}})
    if (!user) throw new BadRequestException(`El usuario con id ${id} no existe.`)
      await this.usersRepository.softDelete({id})
    return this.usersRepository.find() 
  }
}
