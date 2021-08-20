import { ApiProperty } from '@nestjs/swagger';

export class ResponseFonteEnergiaDto {
  @ApiProperty({ description: 'Descrição da fonte de energia' })
  descricao: string;

  @ApiProperty({ description: 'Valor da fonte de energia' })
  valor: number;
}
