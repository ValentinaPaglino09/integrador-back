import { IsEmail, IsOptional, IsString, IsUUID, Max, MaxLength, Min, MinLength } from "class-validator"
import { Role } from "src/roles/entities/role.entity"

export class CreateSignupDto {
    @IsString()
    @IsEmail()
    email: string
    
    @IsString()
    @MinLength(6)
    @MaxLength(10)
    password: string
    
    
}
