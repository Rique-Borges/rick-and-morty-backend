import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {}

  async register(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;

    //Verificar se o usuário já existe
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Já existe um usuário com este email');
    }

    //Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10); // O '10' é o salt round

    //Criar o novo usuário
    const user = await this.usersService.create({
        name,
        email,
        password: hashedPassword,
    });

    //Retornar o usuário criado (sem a senha)
    const { password: _, ...result } = user;
    return result;
  }


  async login(loginUserDto: LoginUserDto){
    const {email, password} = loginUserDto

    //Encontrar o User pelo email
    const user = await this.usersService.findByEmail(email);
    if(!user) {
      throw new UnauthorizedException('Credenciais Inválidas')
    }

    //Comparar senhas
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciais Inválidas')
    }

    //Gerar payload do JWT
    const payload = {user_id: user.id, email: user.email};

    //Assinar e retornar o token
    return{
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}