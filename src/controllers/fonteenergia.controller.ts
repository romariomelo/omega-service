import { Body, Controller, Get, Post } from '@nestjs/common';
import { FonteEnergia } from '../entities/fonteenergia.entity';
import { FonteEnergiaService } from 'src/services/fonteenergia.service';
import { FonteEnergiaDto } from 'src/dtos/create-fonte.dto';

@Controller('fonteEnergia')
export class FonteEnergiaController {
  constructor(private readonly fonteEnergiaService: FonteEnergiaService) {}

  @Get()
  async findAll(): Promise<FonteEnergia[]> {
    const propostas = await this.fonteEnergiaService.findAll();
    return propostas;
  }

  @Post()
  async create(
    @Body() createFonteEnergiaDto: FonteEnergiaDto,
  ): Promise<FonteEnergia> {
    const fonteEnergia = await this.fonteEnergiaService.add(
      createFonteEnergiaDto,
    );
    return fonteEnergia;
  }
}
