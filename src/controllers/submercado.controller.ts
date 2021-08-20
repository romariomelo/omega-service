import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseSubmercadoDto } from 'src/dtos/response-submercado.dto';
import { Submercado } from 'src/entities/submercado.entity';
import { SubmercadoService } from 'src/services/submercado.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('submercado')
@Controller('submercado')
export class SubmercadoController {
  constructor(private submercadoService: SubmercadoService) {}

  @Get()
  @ApiResponse({ type: ResponseSubmercadoDto, isArray: true })
  async findAll(): Promise<Submercado[]> {
    const submercados = await this.submercadoService.findAll();
    return submercados;
  }
}
