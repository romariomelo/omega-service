import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { PropostaService } from 'src/services/proposta.service';
import { CreatePropostaDto } from 'src/dtos/create-proposta.dto';
import { Proposta } from 'src/entities/proposta.entity';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('proposta')
export class PropostaController {
  constructor(
    private propostasService: PropostaService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() request) {
    const token = request.headers.authorization.split(' ')[1];
    const payload = this.jwtService.decode(token, { json: true });
    const id = String(payload.sub);
    const propostas = await this.propostasService.findAll(id);
    return propostas;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createPropostaDto: CreatePropostaDto,
    @Request() request,
    @Response() response,
  ): Promise<Proposta> {
    const token = request.headers.authorization.split(' ')[1];
    const payload = this.jwtService.decode(token, { json: true });
    const id = String(payload.sub);
    const date1 = new Date(createPropostaDto.data_inicio);
    const date2 = new Date(createPropostaDto.data_fim);
    const timeDiff = date2.getTime() - date1.getTime();
    if (timeDiff <= 0) {
      return response
        .status(400)
        .json({ message: 'Data final deve ser maior que a inicial' });
    }
    const proposta = await this.propostasService.create(createPropostaDto, id);
    return response.status(201).send(proposta);
  }
}
