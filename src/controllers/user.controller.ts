import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from 'src/services/usuario.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Usuario> {
    const user = await this.usuarioService.add(createUserDto);
    return user;
  }

  @Get()
  async find(): Promise<Usuario[]> {
    const usuarios = this.usuarioService.findAll();
    return usuarios;
  }

  @Get(':public_id')
  async findByPublicId(@Param() params) {
    const { public_id } = params;
    const usuario = await this.usuarioService.findByPublicId(public_id);
    return usuario;
  }
}
