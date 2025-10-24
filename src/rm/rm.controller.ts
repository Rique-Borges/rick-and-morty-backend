import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RmService } from './rm.service';

@Controller('rm')
export class RmController {
  constructor(private readonly rm: RmService) {}

  @Get('characters')
  list(@Query('page') page?: string, @Query('name') name?: string) {
    const p = Number(page) > 0 ? Number(page) : 1;
    return this.rm.listCharacters(p, name);
  }

  @Get('characters/:id')
  details(@Param('id', ParseIntPipe) id: number) {
    return this.rm.getCharacter(id);
  }

  @Get('stats')
  stats() {
    return this.rm.getStats();
  }
}
