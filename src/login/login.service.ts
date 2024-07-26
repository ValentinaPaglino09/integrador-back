import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Equal, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
const crypto = require('crypto');

@Injectable()
export class LoginService {

 
constructor(
  @InjectRepository(User)
  private readonly usersRepository: Repository<User> ,
  private readonly jwtService: JwtService,
) {}
  
  async login(login: CreateLoginDto) {

   const {email, password} = login
   const hashPass =  crypto.createHash('sha256').update(password).digest('hex')
   
   const user = await this.usersRepository.findOne({where: {email: Equal(email)}, relations: {role: true} })
   if (!user || user.password != hashPass) throw new UnauthorizedException()
    
      
      const token = this.jwtService.sign({user: {id: user.id, email: email, role: user.role.name}}, { expiresIn: 1200000, secret: 'secreto' });
      return {token}
  }

}
