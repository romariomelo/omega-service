import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateProspostaDto } from 'src/ dtos/create-proposta.dto';
import { UpdateProspostaDto } from 'src/ dtos/update-proposta.dto';
import { Proposta } from 'src/entities/proposta.entity';

@Controller('proposta')
export class PropostaController {
  @Get()
  findAll(@Request() request): Observable<Proposta[]> {
    const user = request.user;
    const propostas = this.propostasService.findAll(user.id);
    return propostas;
  }
  @Post()
  create(@Body() createProspostaDto: CreateProspostaDto): Observable<Proposta> {
    const user = request.user;
    const proposta = this.propostasService.create(createProspostaDto, user.id);
    return this.propostasService.add(proposta);
  }

  @Delete(':id')
  remove(@Param('id') id: 'uuid'): void {
    return this.propostasService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: 'uuid',
    @Body() updatePropostDto: UpdateProspostaDto,
  ): void {
    return this.propostasService.update(id, updatePropostDto);
  }
}
