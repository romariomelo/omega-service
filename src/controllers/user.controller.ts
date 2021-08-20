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
import { AuthService } from 'src/auth/shared/auth.service';
import {
  ApiBearerAuth,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseUserDto } from 'src/dtos/response-usuario.dto';

@ApiTags('usuario')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      if (await this.usuarioService.findByEmail(createUserDto.email)) {
        throw new ForbiddenException(
          `Usuário já cadastrado com e-mail: ${createUserDto.email}`,
        );
      }

      const user = await this.usuarioService.add(createUserDto);
      const login = await this.authService.login({
        email: user.email,
        id: user.id,
      });
      return { user, access_token: login.access_token };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: ResponseUserDto, isArray: true, status: 200 })
  @Get()
  async find(): Promise<Usuario[]> {
    const usuarios = this.usuarioService.findAll();
    return usuarios;
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    required: false,
    name: 'relations',
    description: 'Retorna a requisição com as relações especificadas',
    enum: ['propostas'],
    isArray: true,
  })
  @ApiParam({
    format: 'uuid',
    name: 'public_id',
    description: 'Id público do usuário',
  })
  @Get(':public_id')
  async findByPublicId(@Param() params, @Query() query) {
    const { public_id } = params;
    const { relations } = query;
    const options = {};

    if (relations) Object.assign(options, { relations });
    return this.usuarioService.findByPublicId(public_id, options);
  }

  @Get(':access_token/verify')
  @ApiParam({
    name: 'access_token',
    description: 'Token de acesso do usuário',
  })
  async verifyToken(@Param() param) {
    const { access_token } = param;

    return this.usuarioService.getUsuarioLogado(access_token);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Headers() header,
    @Res() res: Response,
  ) {
    try {
      const { authorization } = header;

      const access_token = authorization.split(' ')[1];

      const usuario = await this.usuarioService.getUsuarioLogado(access_token);
      this.usuarioService.update(usuario, updateUserDto);
      res.status(200).json({ message: 'Registro atualizado' });
    } catch (error) {
      throw new MethodNotAllowedException();
    }
  }
}
