import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Res,
} from '@nestjs/common';
import { PropostaService } from 'src/services/proposta.service';
import { CreatePropostaDto } from 'src/dtos/create-proposta.dto';
import { Proposta } from 'src/entities/proposta.entity';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('proposta')
export class PropostaController {
  constructor(
    private propostasService: PropostaService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() request) {
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
    @Req() request,
    @Res() response,
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
