import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FonteEnergia } from 'src/entities/fonteenergia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FonteEnergiaService {
  constructor(
    @InjectRepository(FonteEnergia)
    private fonteEnergiaRepository: Repository<FonteEnergia>,
  ) {}

  findAll(): Promise<FonteEnergia[]> {
    return this.fonteEnergiaRepository.find();
  }

  findByDescricao(descricao: string): Promise<FonteEnergia> {
    return this.fonteEnergiaRepository.findOne({ where: { descricao } });
  }
}
