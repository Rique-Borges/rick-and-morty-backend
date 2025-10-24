import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Global() //Módulo global

@Module({
  providers: [PrismaService],
  exports: [PrismaService], //Exporta o prisma.service
})



export class PrismaModule {}
