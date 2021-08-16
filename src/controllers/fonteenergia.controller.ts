import { Controller, Get } from '@nestjs/common';
import { FonteEnergia } from '../entities/fonteenergia.entity';
@Controller('fonteEnergia')
export class FonteEnergiaController {
  @Get()
  async findAll(): Promise<FonteEnergia[]> {
    const propostas = await this.fonteEnergiaService.findAll();
    return propostas;
  }
}
