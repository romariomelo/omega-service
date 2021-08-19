import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  MethodNotAllowedException,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from 'src/services/usuario.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { Response } from 'express';

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

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<Usuario[]> {
    const usuarios = this.usuarioService.findAll();
    return usuarios;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':public_id')
  async findByPublicId(@Param() params, @Query() query) {
    const { public_id } = params;
    const { relations } = query;
    let options = {};

    if (relations) Object.assign(options, { relations: relations.split(';') });
    return this.usuarioService.findByPublicId(public_id, options);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Headers() header,
    @Res() res: Response,
  ) {
    try {
      const { authorization } = header;
      const usuario = await this.usuarioService.getUsuarioLogado(authorization);
      this.usuarioService.update(usuario, updateUserDto);
      res.status(200).json({ message: 'Registro atualizado' });
    } catch (error) {
      throw new MethodNotAllowedException();
    }
  }
}
