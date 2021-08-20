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
import { Carga } from 'src/entities/carga.entity';
import { Submercado } from 'src/entities/submercado.entity';
import { FonteEnergia } from 'src/entities/fonteenergia.entity';
import { PeriodoInvalidoException } from '../../shared/Exceptions/periodo-invalido.exception';

const VALOR_KWH = 10;

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

  async create(createPropostaDto: CreatePropostaDto, id_usuario: number) {
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

    const periodo_horas = this.periodoEmHoras(
      proposta.data_inicio,
      proposta.data_fim,
    );
    if (periodo_horas <= 0)
      throw new PeriodoInvalidoException(
        'Data final menor que a data de início.',
      );

    await Promise.all(
      createPropostaDto.cargas.map((carga) => {
        return this.cargaService.findByNomeEmpresa(carga.nome_empresa);
      }),
    ).then((cargas) => (proposta.cargas = cargas));

    proposta.consumo_total = this.calculaConsumoTotal(proposta.cargas);

    proposta.valor_proposta = this.calculaValorTotal(
      proposta.consumo_total,
      periodo_horas,
      proposta.submercado,
      proposta.fonte_energia,
    );

    return this.propostaRepository.save(proposta);
  }

  async remove(proposta: Proposta) {
    return this.propostaRepository.remove(proposta);
  }

  async update(proposta: Proposta, updatePropostaDto: UpdateProspostaDto) {
    return this.propostaRepository.update(proposta.id, updatePropostaDto);
  }

  private periodoEmHoras(data_inicio: Date, data_fim: Date) {
    const timediff = data_fim.getTime() - data_inicio.getTime();
    return Math.ceil(timediff / (1000 * 60 * 60)); // MILISEGUNDOS * SEGUNDOS * MINUTOS
  }

  /**
   * Calcula consumo total baseado em uma lista de cargas.
   * @param cargas: Carga[] Lista de cargas
   * @returns Consumo total
   */
  calculaConsumoTotal(cargas: Carga[]): number {
    return cargas.reduce((acc, carga) => {
      return acc + Number(carga.consumo);
    }, 0);
  }

  /**
   * Calcula o valor total da proposta
   * Calculo: consumo_kwh * horas_do_periodo * (preco_kwh + submercado + fonte)
   * @param consumo_total Consumo total das cargas
   * @param submercado Submercado da proposta
   * @param fonte_energia Fonte de energia especificada na proposta
   * @returns Valor Total da proposta
   */
  calculaValorTotal(
    consumo_total: number,
    periodo_horas: number,
    submercado: Submercado,
    fonte_energia: FonteEnergia,
  ) {
    return (
      consumo_total *
      periodo_horas *
      (VALOR_KWH + Number(submercado.valor) + Number(fonte_energia.valor))
    );
  }
}
