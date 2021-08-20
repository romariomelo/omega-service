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
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CargaService } from 'src/services/carga.service';
import { Carga } from 'src/entities/carga.entity';
import { CargaController } from 'src/controllers/carga.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Proposta, FonteEnergia, Submercado, Carga]),
    UsuarioModule,
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [PropostaController, CargaController],
  providers: [
    PropostaService,
    FonteEnergiaService,
    SubmercadoService,
    CargaService,
  ],
})
export class PropostaModule {}
