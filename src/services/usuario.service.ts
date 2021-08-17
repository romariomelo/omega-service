import { Injectable } from '@nestjs/common';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.userRepository.find();
  }

  async findOne(id): Promise<Usuario> {
    return this.userRepository.findOne({ id });
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.userRepository.findOne({ email });
  }

  async findByPublicId(public_id: string): Promise<Usuario> {
    return this.userRepository.findOne({ public_id });
  }

  async add(createUserDto: CreateUserDto): Promise<Usuario> {
    const usuario = new Usuario();
    usuario.public_id = Guid.create().toString();
    usuario.name = createUserDto.name;
    usuario.email = createUserDto.email;
    usuario.senha = createUserDto.password;
    return this.userRepository.save(usuario);
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   return this.userRepository.update(id, updateUserDto);
  // }

  async remove(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    return this.userRepository.remove(usuario);
  }
}
