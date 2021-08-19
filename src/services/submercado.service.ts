import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmercadoDto } from 'src/dtos/create-subMercado.dto';

import { Submercado } from 'src/entities/submercado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubmercadoService {
  constructor(
    @InjectRepository(Submercado)
    private submercadoRepository: Repository<Submercado>,
  ) {}

  add(createSubmercadoDto: SubmercadoDto): Promise<Submercado> {
    const submercado = new Submercado();
    submercado.descricao = createSubmercadoDto.descricao;
    submercado.valor = createSubmercadoDto.valor;
    return this.submercadoRepository.save(submercado);
  }
  findAll(): Promise<Submercado[]> {
    return this.submercadoRepository.find();
  }

  findByDescricao(descricao: string): Promise<Submercado> {
    return this.submercadoRepository.findOne({ where: { descricao } });
  }
}
