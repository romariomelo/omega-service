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
import { PropostaService } from 'src/services/proposta.service';
import { Request } from 'express';
import { CreatePropostaDto } from 'src/dtos/create-proposta.dto';

@Controller('proposta')
export class PropostaController {
  constructor(private propostasService: PropostaService) {}
  @Get()
  async findAll(@Body() body) {
    console.log(body);
    const { usuarioId } = body;
    const propostas = await this.propostasService.findAll(usuarioId);
    return propostas;
  }
  @Post()
  async create(
    @Body() createPropostaDto: CreatePropostaDto,
    @Req() request: Request,
  ) {
    console.log('PropostaController.create');
    const create = await this.propostasService.create(createPropostaDto);
    console.log(create);
    return create;
    // const user = request.user;
    // const proposta = this.propostasService.create(createProspostaDto, user.id);
    // return this.propostasService.add(proposta);
  }

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
