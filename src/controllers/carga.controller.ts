import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CargaService } from 'src/services/carga.service';
import { Carga } from '../entities/carga.entity';
import { CreateCargaDto } from '../dtos/create-carga.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('carga')
export class CargaController {
  constructor(private cargaService: CargaService) {}

  @Get()
  async findAll(): Promise<Carga[]> {
    const cargas = await this.cargaService.findAll();
    return cargas;
  }

  @Post()
  async create(@Body() createCargaDto: CreateCargaDto): Promise<Carga> {
    const carga = await this.cargaService.add(createCargaDto);
    return carga;
  }
}
