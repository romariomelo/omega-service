import {
  Body,
  Controller,
  ExecutionContext,
  Get,
  Param,
  Post,
  Put,
  Headers,
} from '@nestjs/common';
import { CreateUserDto } from '../ dtos/create-user.dto';
import { LoginUserDto } from '../ dtos/login-user.dto'
import {Observable} from 'rxjs';
import {Usuario} from '../entities/usuario.entity';


@Controller('user')
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<Usuario> {
    const user = this.usersService.create(createUserDto);
    return this.usersService.add(user);
  }

  @Post('/login')
  login(@Body() logindto: LoginUserDto): Observable<void> {
    return this.service.login(logindto);
  }

  @Get(':id')
  findOne(@Param('id') id: ): Observable<Usuario> {
    return this.service.findOne(id);
  }
}