import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

const NAME_MIN_LENGTH = 3;
const PASSWORD_MIN_LENGTH = 8;

export class CreateUserDto {
  @IsNotEmpty({ message: 'nome é obrigatório' })
  @MinLength(NAME_MIN_LENGTH, {
    message: 'O nome deve ter no mínimo 3 caracteres',
  })
  @IsString()
  @ApiProperty({ required: true, description: 'Nome do usuário' })
  public name: string;

  @IsNotEmpty({ message: 'email é obrigatório' })
  @IsEmail({}, { message: 'O e-mail deve ser um e-mail válido' })
  @ApiProperty({ required: true, description: 'E-mail do usuário' })
  public email: string;

  @IsNotEmpty({ message: 'senha é obrigatório' })
  @MinLength(PASSWORD_MIN_LENGTH, {
    message: 'A senha deve ter no mínimo 8 caracteres',
  })
  @ApiProperty({
    required: true,
    description: 'Senha do usuário. Deve ter pelo menos 8 caracteres',
  })
  public password: string;
}
