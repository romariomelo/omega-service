import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCargaDto {
  @IsNotEmpty({ message: 'nome da empresa é obrigatório' })
  @IsString()
  public nome_empresa: string;

  @IsNotEmpty({ message: 'valor é obrigatório' })
  @IsNumber()
  public consumo: number;
}
