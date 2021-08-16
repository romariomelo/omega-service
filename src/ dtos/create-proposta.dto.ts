import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProspostaDto {
  @IsDate()
  public data_inicio: Date;
  @IsDate()
  public data_fim: Date;
  @IsNotEmpty({
    groups: ['CONVECIONAL', 'RENOVAVEL'],
    message: 'descrição da fonte de energia é obrigatório',
  })
  @IsString()
  public fonte_energia: String;
  @IsNotEmpty({
    groups: ['NORTE', 'NORDESTE', 'SUL', 'SULDESTE'],
    message: 'descrição do submercado é obrigatório',
  })
  public submercado: String;
  @IsNumber()
  public consumo_total: number;
  @IsBoolean()
  public contratado: boolean;
}
