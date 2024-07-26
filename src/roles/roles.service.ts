import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role> 
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.rolesRepository.save(createRoleDto)
  }

  findAll() {
    return this.rolesRepository.find({relations: {users: true}})
  }

 async findOne(id: string) {
    const role = await this.rolesRepository.findOne({where: {id: Equal(id)}, relations: {users: true}})
    if (!role) throw new BadRequestException(`El rol con id ${id} no existe.`)
    return role  
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepository.findOne({where: {id: Equal(id)}, relations: {users: true}})
    if (!role) throw new BadRequestException(`El rol con id ${id} no existe.`)
    await this.rolesRepository.update({id}, updateRoleDto)
  }

 async remove(id: string) {
    const role = await this.rolesRepository.findOne({where: {id: Equal(id)}, relations: {users: true}})
    if (!role) throw new BadRequestException(`El rol con id ${id} no existe.`)
      await this.rolesRepository.softDelete({id})
    return `Rol ${id} eliminado.`
  }
}
