import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateProspostaDto } from 'src/ dtos/create-proposta.dto';
import { UpdateProspostaDto } from 'src/ dtos/update-proposta.dto';
import { Proposta } from 'src/entities/proposta.entity';

@Controller('proposta')
export class PropostaController {
  @Get()
  findAll(): Observable<Proposta[]> {
    const propostas = this.propostasService.findAll();
    return propostas;
  }
  @Post()
  create(@Body() createProspostaDto: CreateProspostaDto): Observable<Proposta> {
    const proposta = this.propostasService.create(createProspostaDto);
    return this.propostasService.add(proposta);
  }

  @Delete(':id')
  remove(@Param('id') id: 'uuid'): void {
    this.propostasService.remove(id);
  }

  @Put(':id')
  update(@Param('id') id: 'uuid', @Body() dto: UpdateProspostaDto): void {
    this.propostasService.update(id, dto);
  }
}
