import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';

import { UsuarioService } from './usuario.service';
import { Proposta } from 'src/entities/proposta.entity';
import { CreatePropostaDto } from 'src/dtos/create-proposta.dto';
import { FonteEnergiaService } from './fonteenergia.service';
import { SubmercadoService } from './submercado.service';
import { CargaService } from './carga.service';

@Injectable()
export class PropostaService {
  constructor(
    @InjectRepository(Proposta)
    private propostaRepository: Repository<Proposta>,
    private usuarioService: UsuarioService,
    private fonteEnergiaService: FonteEnergiaService,
    private submercadoService: SubmercadoService,
    private cargaService: CargaService,
  ) {}

  async findAll(usuarioId: string): Promise<Proposta[]> {
    const usuario = await this.usuarioService.findOne(usuarioId);
    return this.propostaRepository.find({ where: { usuario } });
  }

  async create(createPropostaDto: CreatePropostaDto, id_usuario: string) {
    console.log('PropostaService.create');
    const proposta = new Proposta();
    proposta.public_id = Guid.create().toString();

    proposta.data_inicio = createPropostaDto.data_inicio;
    proposta.data_fim = createPropostaDto.data_fim;
    proposta.consumo_total = createPropostaDto.consumo_total;
    proposta.contratado = createPropostaDto.contratado;
    proposta.valor_proposta = 6;
    proposta.usuario = await this.usuarioService.findOne(id_usuario);

    proposta.fonte_energia = await this.fonteEnergiaService.findByDescricao(
      createPropostaDto.fonte_energia,
    );

    proposta.submercado = await this.submercadoService.findByDescricao(
      createPropostaDto.submercado,
    );

    Promise.all(
      createPropostaDto.cargas.map((carga) => {
        return this.cargaService.findByNomeEmpresa(carga.nome_empresa);
      }),
    ).then((cargas) => (proposta.cargas = cargas));

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
