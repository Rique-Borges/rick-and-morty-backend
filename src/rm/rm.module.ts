import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RmService } from './rm.service';
import { RmController } from './rm.controller';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://rickandmortyapi.com/api',
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [RmController],
  providers: [RmService],
  exports: [RmService],
})
export class RickAndMortyModule {}
