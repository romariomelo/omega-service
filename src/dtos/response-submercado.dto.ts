import { ApiProperty } from '@nestjs/swagger';

export class ResponseSubmercadoDto {
  @ApiProperty({ description: 'Descrição do submercado' })
  descricao: string;

  @ApiProperty({ description: 'Valor do submercado' })
  valor: number;
}
