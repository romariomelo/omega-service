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
import { UpdateProspostaDto } from 'src/dtos/update-proposta.dto';

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

  async findByPublicId(public_id: string): Promise<Proposta> {
    return this.propostaRepository.findOne({ where: { public_id } });
  }

  async create(
    createPropostaDto: CreatePropostaDto,
    id_usuario: string,
    timediff: number,
  ) {
    const proposta = new Proposta();
    proposta.public_id = Guid.create().toString();

    proposta.data_inicio = createPropostaDto.data_inicio;
    proposta.data_fim = createPropostaDto.data_fim;
    proposta.consumo_total = createPropostaDto.consumo_total;
    proposta.contratado = createPropostaDto.contratado;
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

    const periodo_horas = Math.ceil(timediff / (1000 * 60 * 60));
    const valor_kW_por_hora = 10000;

    proposta.valor_proposta = proposta.cargas.reduce((acc, carga) => {
      const { submercado, fonte_energia } = proposta;
      const consumo_carga_currente: number =
        carga.consumo *
        periodo_horas *
        (valor_kW_por_hora + submercado.valor + fonte_energia.valor);
      return acc + consumo_carga_currente;
    }, 0);

    return this.propostaRepository.save(proposta);
  }

  async remove(proposta: Proposta) {
    return this.propostaRepository.remove(proposta);
  }

  async update(proposta: Proposta, updatePropostaDto: UpdateProspostaDto) {
    return this.propostaRepository.update(proposta.id, updatePropostaDto);
  }
}
