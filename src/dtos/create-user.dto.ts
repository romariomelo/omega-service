import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

const NAME_MIN_LENGTH = 3;
const PASSWORD_MIN_LENGTH = 8;

export class CreateUserDto {
  @IsNotEmpty({ message: 'nome é obrigatório' })
  @MinLength(NAME_MIN_LENGTH, {
    message: 'O nome deve ter no mínimo 3 caracteres',
  })
  @IsString()
  public name: string;

  @IsNotEmpty({ message: 'email é obrigatório' })
  @IsEmail({}, { message: 'O e-mail deve ser um e-mail válido' })
  public email: string;

  @IsNotEmpty({ message: 'senha é obrigatório' })
  @MinLength(PASSWORD_MIN_LENGTH, {
    message: 'A senha deve ter no mínimo 8 caracteres',
  })
  public password: string;
}
