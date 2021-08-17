import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/user.controller';
import { UsuarioService } from 'src/services/usuario.service';
import { Usuario } from 'src/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsersController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
