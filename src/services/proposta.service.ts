import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';

import { UsuarioService } from './usuario.service';
import { Proposta } from 'src/entities/proposta.entity';
import { CreatePropostaDto } from 'src/dtos/create-proposta.dto';
import { FonteEnergiaService } from './fonteenergia.service';
import { SubmercadoService } from './submercado.service';

@Injectable()
export class PropostaService {
  constructor(
    @InjectRepository(Proposta)
    private propostaRepository: Repository<Proposta>,
    private usuarioService: UsuarioService,
    private fonteEnergiaService: FonteEnergiaService,
    private submercadoService: SubmercadoService,
  ) {}

  async findAll(usuarioId: string): Promise<Proposta[]> {
    const usuario = await this.usuarioService.findByPublicId(usuarioId);
    return this.propostaRepository.find({ where: { usuario } });
  }

  async create(createPropotaDto: CreatePropostaDto) {
    console.log('PropostaService.create');
    const proposta = new Proposta();
    proposta.public_id = Guid.create().toString();

    proposta.data_inicio = createPropotaDto.data_inicio;
    proposta.data_fim = createPropotaDto.data_fim;
    proposta.consumo_total = createPropotaDto.consumo_total;
    proposta.contratado = false;
    proposta.valor_proposta = 6;
    proposta.usuario = await this.usuarioService.findOne(1);

    proposta.fonte_energia = await this.fonteEnergiaService.findByDescricao(
      createPropotaDto.fonte_energia,
    );

    proposta.submercado = await this.submercadoService.findByDescricao(
      createPropotaDto.submercado,
    );

    console.log(proposta);

    // if (proposta.validadeData());
    return this.propostaRepository.save(proposta);
  }

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
