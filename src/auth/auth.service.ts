import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;

    // 1. Verificar se o usuário já existe
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // 2. Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10); // O '10' é o salt round

    // 3. Criar o novo usuário
    const user = await this.usersService.create({
        name,
        email,
        password: hashedPassword,
    });

    // 4. Retornar o usuário criado (sem a senha)
    // eext-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }
}