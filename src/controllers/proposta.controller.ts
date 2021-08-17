import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Delete,
} from '@nestjs/common';
import { CreateProspostaDto } from 'src/ dtos/create-proposta.dto';
import { UpdateProspostaDto } from 'src/ dtos/update-proposta.dto';
import { Proposta } from 'src/entities/proposta.entity';
import { PropostaService } from 'src/services/proposta.service';
import { Request } from 'express';

@Controller('proposta')
export class PropostaController {
  constructor(private propostasService: PropostaService) {}
  // @Get()
  // async findAll(@Req() request: Request): Promise<Proposta[]> {
  //   const user = request.user;
  //   const propostas = await this.propostasService.findAll(user.id);
  //   return propostas;
  // }
  // @Post()
  // async create(
  //   @Body() createProspostaDto: CreateProspostaDto,
  //   @Req() request: Request,
  // ): Promise<Proposta> {
  //   const user = request.user;
  //   const proposta = this.propostasService.create(createProspostaDto, user.id);
  //   return this.propostasService.add(proposta);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: 'uuid') {
  //   await this.propostasService.remove(id);
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: 'uuid',
  //   @Body() updatePropostaDto: UpdateProspostaDto,
  // ) {
  //   await this.propostasService.update(id, updatePropostaDto);
  // }
}
