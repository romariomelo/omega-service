import { Controller, Get } from '@nestjs/common';
import { FonteEnergiaService } from 'src/services/fonteenergia.service';
import { FonteEnergia } from '../entities/fonteenergia.entity';

@Controller('fonteEnergia')
export class FonteEnergiaController {
  constructor(private fonteEnergiaService: FonteEnergiaService) {}

  @Get()
  async findAll(): Promise<FonteEnergia[]> {
    const propostas = await this.fonteEnergiaService.findAll();
    return propostas;
  }
}
