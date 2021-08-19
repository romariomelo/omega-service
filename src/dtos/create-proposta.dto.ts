import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Carga } from 'src/entities/carga.entity';

export class CreatePropostaDto {
  @IsDate()
  @Type(() => Date)
  public data_inicio: Date;

  @IsDate()
  @Type(() => Date)
  public data_fim: Date;

  @IsNotEmpty({ message: 'descrição da fonte de energia é obrigatório' })
  @IsIn(['CONVENCIONAL', 'RENOVAVEL'], {
    message: 'Campo fonte_energia deve ser CONVENCIONAL ou RENOVAVEL',
  })
  @IsString()
  public fonte_energia: string;

  @IsIn(['NORTE', 'NORDESTE', 'SUL', 'SULDESTE'], {
    message: 'Campo submercado deve ser NORTE, NORDESTE, SUL ou SULDESTE',
  })
  @IsNotEmpty({ message: 'descrição do submercado é obrigatório' })
  public submercado: string;

  @IsNotEmpty({ message: 'As cargas são obrigatórias' })
  @IsArray({ message: 'Deve ser uma lista com as cargas' })
  public cargas: Carga[];

  @IsNumber({}, { message: 'Campo consumo_total deve ser um valor numérico' })
  public consumo_total: number;

  @IsBoolean({ message: 'Campo contratado deve ser um valor boolean' })
  public contratado: boolean;
}
