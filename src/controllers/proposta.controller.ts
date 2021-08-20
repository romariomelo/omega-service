import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
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
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponsePropostaDto } from 'src/dtos/response-proposta.dto';
import { UsuarioService } from 'src/services/usuario.service';

@ApiBearerAuth('access-token')
@ApiTags('propostas')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('proposta')
export class PropostaController {
  constructor(
    private propostasService: PropostaService,
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: ResponsePropostaDto, isArray: true })
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
    @Headers('authorization') auth,
  ): Promise<Proposta> {
    const usuario = await this.usuarioService.getUsuarioLogado(
      auth.replace('Bearer ', ''),
    );

    return this.propostasService.create(createPropostaDto, usuario.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':public_id')
  @ApiParam({ name: 'public_id', description: 'Id público da proposta' })
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
  @ApiParam({ name: 'public_id', description: 'Id público da proposta' })
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
