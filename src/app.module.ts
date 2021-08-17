import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropostaModule } from './modules/proposta.module';
import { UsuarioModule } from './modules/usuario.module';

const configModule = ConfigModule.forRoot();

const typeOrmModule = TypeOrmModule.forRoot();

@Module({
  imports: [configModule, typeOrmModule, UsuarioModule, PropostaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
