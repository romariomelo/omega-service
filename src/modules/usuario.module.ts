import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/user.controller';
import { UsuarioService } from 'src/services/usuario.service';
import { Usuario } from 'src/entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';

const jwtModule = JwtModule.register({
  secret: process.env.SECRET_JWT,
  signOptions: { expiresIn: '1h' },
});

@Module({
  imports: [jwtModule, TypeOrmModule.forFeature([Usuario])],
  controllers: [UsersController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
