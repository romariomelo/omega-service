import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.userRepository.find();
  }

  findOne(id): Promise<Usuario> {
    return this.userRepository.findOne({ id });
  }

  findByEmail(email: string): Promise<Usuario> {
    return this.userRepository.findOne({ email });
  }

  findByPublicId(public_id: string, options = {}): Promise<Usuario> {
    return this.userRepository.findOne({ public_id }, options);
  }

  add(createUserDto: CreateUserDto): Promise<Usuario> {
    const usuario = new Usuario();
    usuario.public_id = Guid.create().toString();
    usuario.name = createUserDto.name;
    usuario.email = createUserDto.email;
    usuario.senha = createUserDto.password;
    return this.userRepository.save(usuario);
  }

  async update(usuario: Usuario, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(usuario.id, updateUserDto);
  }

  async remove(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    return this.userRepository.remove(usuario);
  }

  getUsuarioLogado(access_token: string): Promise<Usuario> {
    const payload = this.jwtService.decode(access_token, { json: true });

    if (!payload) throw new UnauthorizedException('Token inválido');

    const id = String(payload.sub);
    return this.findOne(id);
  }
}
