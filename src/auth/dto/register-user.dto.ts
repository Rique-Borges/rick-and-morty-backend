import { IsEmail, IsString, MinLength } from 'class-validator'

export class RegisterUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, {message: 'Senha precisa ter um mínimo de 8 caracteres'})
    password: string;

}