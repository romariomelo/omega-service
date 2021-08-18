import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class LoginJwtDto {
  @IsNotEmpty({ message: 'email é obrigatório' })
  @IsNumber()
  public id: number;
  @IsNotEmpty({ message: 'email é obrigatório' })
  @IsEmail({}, { message: 'O e-mail deve ser um e-mail válido' })
  public email: string;
}
