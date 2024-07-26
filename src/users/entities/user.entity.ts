import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
@PrimaryGeneratedColumn('uuid')
id: string;

@Column('text')
email: string

@Column('text')
password: string

@CreateDateColumn()
createdAt: Date

@DeleteDateColumn()
deletedAt: Date

@ManyToOne(() => Role, role => role.users)
role: Role
}
