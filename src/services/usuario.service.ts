import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/ dtos/create-user.dto';
import { UpdateUserDto } from 'src/ dtos/update-user.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(private userRepository: Repository<Usuario>) {}

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
