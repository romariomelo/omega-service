import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
  Headers,
  Param,
  UnauthorizedException,
  Patch,
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
  async findAll(@Headers() headers) {
    const { authorization } = headers;
    const token = authorization.split(' ')[1];
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
    const proposta = await this.propostasService.create(
      createPropostaDto,
      id,
      timeDiff,
    );
    return response.status(201).send(proposta);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':public_id')
  async remove(@Param() params, @Headers() headers, @Response() response) {
    const { authorization } = headers;
    const { public_id } = params;
    const token = authorization.split(' ')[1];
    const payload = this.jwtService.decode(token, { json: true });
    const id_usuario = payload.sub;
    const proposta = await this.propostasService.findByPublicId(public_id);
    if (!proposta) {
      response.status(400).json({
        message: 'Não foi encontrada nenhuma posposta com essa referência',
      });
    } else if (proposta.usuario.id !== id_usuario) {
      throw new UnauthorizedException();
    } else if (proposta.contratado) {
      response
        .status(400)
        .json({ message: 'Posposta contratada não pode ser excluida' });
    }
    return this.propostasService.remove(proposta);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':public_id')
  async update(@Param() params, @Headers() headers, @Response() response) {
    const { authorization } = headers;
    const { public_id } = params;
    const token = authorization.split(' ')[1];
    const payload = this.jwtService.decode(token, { json: true });
    const id_usuario = payload.sub;
    const proposta = await this.propostasService.findByPublicId(public_id);
    if (!proposta) {
      response.status(400).json({
        message: 'Não foi encontrada nenhuma posposta com essa referência',
      });
    } else if (proposta.usuario.id !== id_usuario) {
      throw new UnauthorizedException();
    } else if (proposta.contratado) {
      response.status(400).json({ message: 'Posposta já contratada' });
    }
    return this.propostasService.update(proposta, { contratado: true });
  }
}
