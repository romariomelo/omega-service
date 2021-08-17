import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostaController } from 'src/controllers/proposta.controller';
import { FonteEnergia } from 'src/entities/fonteenergia.entity';
import { Proposta } from 'src/entities/proposta.entity';
import { Submercado } from 'src/entities/submercado.entity';
import { FonteEnergiaService } from 'src/services/fonteenergia.service';
import { PropostaService } from 'src/services/proposta.service';
import { SubmercadoService } from 'src/services/submercado.service';
import { UsuarioModule } from './usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proposta, FonteEnergia, Submercado]),
    UsuarioModule,
  ],
  controllers: [PropostaController],
  providers: [PropostaService, FonteEnergiaService, SubmercadoService],
})
export class PropostaModule {}
