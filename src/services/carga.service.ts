import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Carga } from '../entities/carga.entity';

@Injectable()
export class CargaService {
  constructor(private cargaRepository: Repository<Carga>) {}

  async findAll(): Promise<Carga[]> {
    return this.cargaRepository.find();
  }
}
