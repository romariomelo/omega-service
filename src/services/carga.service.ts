import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCargaDto } from 'src/dtos/create-carga.dto';
import { Repository } from 'typeorm';
import { Carga } from '../entities/carga.entity';

@Injectable()
export class CargaService {
  constructor(
    @InjectRepository(Carga)
    private cargaRepository: Repository<Carga>,
  ) {}

  add(createCargaDto: CreateCargaDto): Promise<Carga> {
    const carga = new Carga();
    carga.nome_empresa = createCargaDto.nome_empresa;
    carga.consumo = createCargaDto.consumo;
    return this.cargaRepository.save(carga);
  }

  findAll(): Promise<Carga[]> {
    return this.cargaRepository.find();
  }

  findByNomeEmpresa(nome_empresa: string): Promise<Carga> {
    return this.cargaRepository.findOne({ where: { nome_empresa } });
  }
}
