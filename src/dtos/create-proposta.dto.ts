import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Carga } from 'src/entities/carga.entity';
import { CreateCargaDto } from './create-carga.dto';

const TAM_MIN_LISTA_CARGAS = 1; // Tamanho mínimo da lista de cargas

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
  @ArrayMinSize(TAM_MIN_LISTA_CARGAS, {
    message: 'Deve ser informado pelo menos uma carga.',
  })
  @ApiProperty({ type: CreateCargaDto, isArray: true })
  public cargas: Carga[];

  @IsBoolean({ message: 'Campo contratado deve ser um valor boolean' })
  @ApiProperty()
  public contratado: boolean;
}
