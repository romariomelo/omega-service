import { ApiProperty } from '@nestjs/swagger';
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
import { CreateCargaDto } from './create-carga.dto';

export class CreatePropostaDto {
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ format: 'date' })
  public data_inicio: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({ format: 'date' })
  public data_fim: Date;

  @IsNotEmpty({ message: 'descrição da fonte de energia é obrigatório' })
  @IsIn(['CONVENCIONAL', 'RENOVAVEL'], {
    message: 'Campo fonte_energia deve ser CONVENCIONAL ou RENOVAVEL',
  })
  @IsString()
  @ApiProperty({ enum: ['CONVENCIONAL', 'RENOVAVEL'] })
  public fonte_energia: string;

  @IsIn(['NORTE', 'NORDESTE', 'SUL', 'SULDESTE'], {
    message: 'Campo submercado deve ser NORTE, NORDESTE, SUL ou SULDESTE',
  })
  @IsNotEmpty({ message: 'descrição do submercado é obrigatório' })
  @ApiProperty({ enum: ['NORTE', 'NORDESTE', 'SUDESTE', 'SUL'] })
  public submercado: string;

  @IsNotEmpty({ message: 'As cargas são obrigatórias' })
  @IsArray({ message: 'Deve ser uma lista com as cargas' })
  @ApiProperty({ type: CreateCargaDto, isArray: true })
  public cargas: Carga[];

  @IsNumber({}, { message: 'Campo consumo_total deve ser um valor numérico' })
  @ApiProperty()
  public consumo_total: number;

  @IsBoolean({ message: 'Campo contratado deve ser um valor boolean' })
  @ApiProperty()
  public contratado: boolean;
}
