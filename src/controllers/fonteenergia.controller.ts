import { Body, Controller, Get, Post } from '@nestjs/common';
import { FonteEnergia } from '../entities/fonteenergia.entity';
import { FonteEnergiaService } from 'src/services/fonteenergia.service';

@Controller('fonteEnergia')
export class FonteEnergiaController {
  constructor(private readonly fonteEnergiaService: FonteEnergiaService) {}

  @Get()
  async findAll(): Promise<FonteEnergia[]> {
    const propostas = await this.fonteEnergiaService.findAll();
    return propostas;
  }
}
