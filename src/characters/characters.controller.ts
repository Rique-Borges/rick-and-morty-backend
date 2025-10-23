import {
  Controller, Get, Post, Body, UseGuards, Req, Param, ParseIntPipe,
  Patch, Delete
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { AuthGuard } from '../auth/auth/auth.guard'; // ajuste o path conforme seu projeto

@UseGuards(AuthGuard)
@Controller()
export class CharactersController {
  constructor(private readonly svc: CharactersService) {}

  // Meus Personagens (lista)
 @Get('characters')
listMine(@Req() req: any) {
  console.log('USER NO TOKEN:', req.user);
  return this.svc.listMine(req.user?.user_id);
}



  // Detalhe local
  @Get('characters/:id')
  getOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const user_id = req.user?.user_id;
    return this.svc.getOneLocal(id, user_id);
  }

  // Salvar
  @Post('characters')
  create(@Body() dto: CreateCharacterDto, @Req() req: any) {
    const user_id = req.user?.user_id;
    return this.svc.create(dto, user_id);
  }

  // Editar
  @Patch('characters/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCharacterDto,
    @Req() req: any,
  ) {
    const user_id = req.user?.user_id;
    return this.svc.update(id, dto, user_id);
  }

  // Excluir
  @Delete('characters/:id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const user_id = req.user?.user_id;
    return this.svc.remove(id, user_id);
  }

  // Apoio à Home (dados do usuário logado)
  @Get('me/home-counters')
  homeCounters(@Req() req: any) {
    const user_id = req.user?.user_id;
    return this.svc.countersForHome(user_id);
  }
}
