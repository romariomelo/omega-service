import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @IsString()
  @ApiProperty({ required: true, description: 'E-mail do usuário' })
  public name: string;

  @IsNotEmpty({ message: 'email é obrigatório' })
  @IsEmail({}, { message: 'O e-mail deve ser um e-mail válido' })
  @ApiProperty({ required: true, description: 'E-mail do usuário' })
  public email: string;
}
