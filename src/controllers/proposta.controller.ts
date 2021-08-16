import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Delete,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateProspostaDto } from 'src/ dtos/create-proposta.dto';
import { UpdateProspostaDto } from 'src/ dtos/update-proposta.dto';
import { Proposta } from 'src/entities/proposta.entity';

@Controller('proposta')
export class PropostaController {
  @Get()
  async findAll(@Request() request): Promise<Proposta[]> {
    const user = request.user;
    const propostas = await this.propostasService.findAll(user.id);
    return propostas;
  }
  @Post()
  async create(
    @Body() createProspostaDto: CreateProspostaDto,
  ): Promise<Proposta> {
    const user = request.user;
    const proposta = this.propostasService.create(createProspostaDto, user.id);
    return this.propostasService.add(proposta);
  }

  @Delete(':id')
  async remove(@Param('id') id: 'uuid'): void {
    await this.propostasService.remove(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: 'uuid',
    @Body() updatePropostDto: UpdateProspostaDto,
  ): void {
    await this.propostasService.update(id, updatePropostDto);
  }
}
