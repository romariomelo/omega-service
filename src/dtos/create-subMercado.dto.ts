import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubmercadoDto {
  @IsIn(['NORTE', 'NORDESTE', 'SUL', 'SULDESTE'], {
    message: 'Campo submercado deve ser NORTE, NORDESTE, SUL ou SULDESTE',
  })
  @IsNotEmpty({ message: 'descrição do submercado é obrigatório' })
  public submercado: string;

  @IsNotEmpty({ message: 'valor é obrigatório' })
  @IsNumber()
  public valor: number;
}
