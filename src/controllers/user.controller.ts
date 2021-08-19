import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
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
    try {
      if (await this.usuarioService.findByEmail(createUserDto.email)) {
        throw new ForbiddenException(
          `Usuário já cadastrado com e-mail: ${createUserDto.email}`,
        );
      }

      const user = await this.usuarioService.add(createUserDto);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async find(): Promise<Usuario[]> {
    const usuarios = this.usuarioService.findAll();
    return usuarios;
  }

  @Get(':id')
  async findByPublicId(@Param('id') id: 'uuid'): Promise<Usuario> {
    return this.usuarioService.findByPublicId(id);
  }
}
