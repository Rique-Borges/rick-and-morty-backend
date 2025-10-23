import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client'; 

@Injectable()
export class UsersService {
    //Injeçao PrismaService para ter acesso ao banco de dados
    constructor(private prisma: PrismaService){}

    //Método Encontrar Usuário Por Email
    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email } ,
        });
    }
    //Método Criar Usuário
    async create(data : Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

}
