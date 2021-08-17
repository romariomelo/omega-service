import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Submercado } from 'src/entities/submercado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubmercadoService {
  constructor(
    @InjectRepository(Submercado)
    private submercadoRepository: Repository<Submercado>,
  ) {}

  findAll(): Promise<Submercado[]> {
    return this.submercadoRepository.find();
  }

  findByDescricao(descricao: string): Promise<Submercado> {
    return this.submercadoRepository.findOne({ where: { descricao } });
  }
}
