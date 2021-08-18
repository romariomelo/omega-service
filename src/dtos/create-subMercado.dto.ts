import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubmercadoDto {
  @IsNotEmpty({
    groups: ['NORTE', 'NORDESTE', 'SUL', 'SULDESTE'],
    message: 'descrição é obrigatório',
  })
  @IsString()
  public descricao: String;

  @IsNotEmpty({ message: 'valor é obrigatório' })
  @IsNumber()
  public valor: number;
}
