import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Carga } from '../entities/carga.entity';

@Injectable()
export class CargaService {
  constructor(
    @InjectRepository(Carga)
    private cargaRepository: Repository<Carga>,
  ) {}

  async findAll(): Promise<Carga[]> {
    return this.cargaRepository.find();
  }
}
