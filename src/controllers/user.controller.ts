import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../ dtos/create-user.dto';
import { LoginUserDto } from '../ dtos/login-user.dto';
import { Observable } from 'rxjs';
import { Usuario } from '../entities/usuario.entity';

@Controller('user')
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<Usuario> {
    const user = this.usersService.create(createUserDto);
    return this.usersService.add(user);
  }

  @Get(':id')
  findOne(@Param('id') id: 'uuid'): Observable<Usuario> {
    return this.service.findOne(id);
  }
}
