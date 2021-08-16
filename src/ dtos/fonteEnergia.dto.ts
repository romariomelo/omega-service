import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FonteEnergia {
  @IsNotEmpty({
    groups: ['CONVECIONAL', 'RENOVAVEL'],
    message: 'descrição é obrigatório',
  })
  @IsString()
  public descricao: String;

  @IsNotEmpty({ message: 'valor é obrigatório' })
  @IsNumber()
  public valor: number;
}
