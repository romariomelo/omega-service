import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../ dtos/create-user.dto';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from 'src/services/usuario.service';

@Controller('user')
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
  async findByPublicId(@Param() public_id) {
    const usuario = await this.usuarioService.findByPublicId(public_id);
    return usuario;
  }
}
