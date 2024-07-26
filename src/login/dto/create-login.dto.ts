import { IsEmail, IsString, Max, MaxLength, Min, MinLength } from "class-validator"

export class CreateLoginDto {
    @IsString()
    @IsEmail()
    email: string
    
    @IsString()
    @MinLength(6)
    @MaxLength(10)
    password: string
}
