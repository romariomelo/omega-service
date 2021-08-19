import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubmercadoDto } from 'src/dtos/create-subMercado.dto';
import { Submercado } from 'src/entities/submercado.entity';
import { SubmercadoService } from 'src/services/submercado.service';

@Controller('submercado')
export class SubmercadoController {
  constructor(private submercadoService: SubmercadoService) {}

  @Get()
  async findAll(): Promise<Submercado[]> {
    const submercados = await this.submercadoService.findAll();
    return submercados;
  }

  @Post()
  async create(
    @Body() createSubmercadoDto: SubmercadoDto,
  ): Promise<Submercado> {
    const submercado = await this.submercadoService.add(createSubmercadoDto);
    return submercado;
  }
}
