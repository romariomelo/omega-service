import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Proposta } from 'src/entities/proposta.entity';
import { UpdateProspostaDto } from 'src/ dtos/update-proposta.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PropostaService {
  constructor(
    @InjectRepository(Proposta)
    private propostaRepository: Repository<Proposta>,
  ) {}

  // async findAll(usuarioId: number): Promise<Proposta[]> {
  //   return this.propostaRepository.find({ usuarioId });
  // }

  // async create(createProspostaDto, CreateProspostaDto, ususarioId: number) {
  //   return this.propostaRepository.create();
  // }

  // async add(proposta: Proposta) {
  //   return this.propostaRepository.save(proposta);
  // }

  // async remove(propostaId) {
  //   return this.propostaRepository.remove(propostaId);
  // }

  // async upadate(public_id: string, updatePropostaDto: UpdateProspostaDto) {
  //   return this.propostaRepository.update({ public_id }, updatePropostaDto);
  // }
}
