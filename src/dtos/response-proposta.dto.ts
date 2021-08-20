import { ApiProperty } from '@nestjs/swagger';
import { Carga } from 'src/entities/carga.entity';
import { CreateCargaDto } from './create-carga.dto';

export class ResponsePropostaDto {
  @ApiProperty({ type: 'uuid' })
  public_id: string;

  @ApiProperty({ format: 'date' })
  public data_inicio: Date;

  @ApiProperty({ format: 'date' })
  public data_fim: Date;

  @ApiProperty({ enum: ['CONVENCIONAL', 'RENOVAVEL'] })
  public fonte_energia: string;

  @ApiProperty({ enum: ['NORTE', 'NORDESTE', 'SUDESTE', 'SUL'] })
  public submercado: string;

  @ApiProperty({ type: CreateCargaDto, isArray: true })
  public cargas: Carga[];

  @ApiProperty()
  public consumo_total: number;

  @ApiProperty()
  public contratado: boolean;
}
