import { UsuarioService } from '../../services/usuario.service';
import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../../dtos/login-user.dto';
import { LoginJwtDto } from 'src/dtos/login-jwt.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUsuario(user: LoginUserDto) {
    const usuario = await this.usuarioService.findByEmail(user.email);
    if (usuario && usuario.senha === user.password) {
      const { id, name, email } = usuario;
      return { id, name, email };
    }
    return null;
  }

  async login(user: LoginJwtDto) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
