import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FonteEnergia {
  @IsNotEmpty({
    groups: ['NORTE', 'NORDESTE', 'SUL', 'SULDESTE'],
    message: 'descrição é obrigatório',
  })
  @IsString()
  public descricao: String;
}
