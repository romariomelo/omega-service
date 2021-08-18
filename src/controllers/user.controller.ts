<<<<<<< HEAD
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
=======
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
>>>>>>> 5260cdf05ffeca40669759b7277b5ac01cfa08b7
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from 'src/services/usuario.service';

<<<<<<< HEAD
@Controller('user')
=======
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
>>>>>>> 5260cdf05ffeca40669759b7277b5ac01cfa08b7
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
  @Get(':email')
  async findByEmail(@Param('email') email: 'email'): Promise<Usuario> {
    return this.usuarioService.findByEmail(email);
  }

  @Get(':id')
  async findOne(@Param('id') id: 'uuid'): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  @Get(':id')
  async findByPublicId(@Param('id') id: 'uuid'): Promise<Usuario> {
    return this.usuarioService.findByPublicId(id);
  }
}
