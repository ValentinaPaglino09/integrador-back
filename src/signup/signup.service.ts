import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSignupDto } from './dto/create-signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Equal, Repository } from 'typeorm';
const crypto = require('crypto');

@Injectable()
export class SignupService {

constructor(
  @InjectRepository(User)
  private readonly usersRepository: Repository<User> 
){}

  async create(createSignupDto: CreateSignupDto) {
    
    const {email, password} = createSignupDto

    const userExists = await this.usersRepository.findOne({where: {email: Equal(email)}})
    if (userExists) throw new BadRequestException('El usuario ya existe.')

    const hashPass =  crypto.createHash('sha256').update(password).digest('hex')

    return this.usersRepository.save({email: email, password: hashPass})
  }

 
}
