import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        // Conecta ao banco de dados quando o módulo init
        await this.$connect();
    }
    async onModuleDestroy() {
        // Desconecta ao banco de dados quando o app é encerrado
        await this.$disconnect
    }
}
