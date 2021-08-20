import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'email é obrigatório' })
  @IsEmail({}, { message: 'O e-mail deve ser um e-mail válido' })
  @ApiProperty({
    required: true,
    description: 'E-mail do usuário',
  })
  public email: string;

  @IsNotEmpty({ message: 'senha é obrigatório' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @ApiProperty({
    required: true,
    description: 'Senha do usuário',
  })
  public password: string;
}
