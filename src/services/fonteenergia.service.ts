import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FonteEnergiaDto } from 'src/dtos/create-fonte.dto';

import { FonteEnergia } from 'src/entities/fonteenergia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FonteEnergiaService {
  constructor(
    @InjectRepository(FonteEnergia)
    private fonteEnergiaRepository: Repository<FonteEnergia>,
  ) {}

  add(createFonteEnergiaDto: FonteEnergiaDto): Promise<FonteEnergia> {
    const fonteEnergia = new FonteEnergia();
    fonteEnergia.descricao = createFonteEnergiaDto.descricao;
    fonteEnergia.valor = createFonteEnergiaDto.valor;
    return this.fonteEnergiaRepository.save(fonteEnergia);
  }

  findAll(): Promise<FonteEnergia[]> {
    return this.fonteEnergiaRepository.find();
  }

  findByDescricao(descricao: string): Promise<FonteEnergia> {
    return this.fonteEnergiaRepository.findOne({ where: { descricao } });
  }
}
