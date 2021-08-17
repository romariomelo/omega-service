import { Injectable } from '@nestjs/common';

import { FonteEnergia } from 'src/entities/fonteenergia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FonteEnergiaService {
  constructor(private fonteEnergiaRepository: Repository<FonteEnergia>) {}

  findAll(): Promise<FonteEnergia[]> {
    return this.fonteEnergiaRepository.find();
  }
}
