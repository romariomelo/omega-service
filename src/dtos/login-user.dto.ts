import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'email é obrigatório' })
  @IsEmail({}, { message: 'O e-mail deve ser um e-mail válido' })
  public email: string;

  @IsNotEmpty({ message: 'senha é obrigatório' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  public password: string;
}
