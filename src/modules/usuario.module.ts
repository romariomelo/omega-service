import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/user.controller';
import { UsuarioService } from 'src/services/usuario.service';
import { Usuario } from 'src/entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/shared/auth.service';

const configModule = ConfigModule.forRoot();

const jwtModule = JwtModule.register({
  secret: process.env.SECRET_JWT,
  signOptions: { expiresIn: '1h' },
});

@Module({
  imports: [configModule, jwtModule, TypeOrmModule.forFeature([Usuario])],
  controllers: [UsersController],
  providers: [UsuarioService, AuthService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
