import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreatePropostaDto {
  @IsDate()
  @Type(() => Date)
  public data_inicio: Date;

  @IsDate()
  @Type(() => Date)
  public data_fim: Date;

  @IsNotEmpty({
    groups: ['CONVENCIONAL', 'RENOVAVEL'],
    message: 'descrição da fonte de energia é obrigatório',
  })
  @IsString()
  public fonte_energia: string;

  @IsNotEmpty({
    groups: ['NORTE', 'NORDESTE', 'SUL', 'SULDESTE'],
    message: 'descrição do submercado é obrigatório',
  })
  public submercado: string;

  @IsNumber()
  @Min(1)
  public cargas: number;

  @IsNumber()
  public consumo_total: number;

  @IsBoolean()
  public contratado: boolean;
}
