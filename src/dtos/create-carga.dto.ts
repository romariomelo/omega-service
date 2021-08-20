import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCargaDto {
  @IsNotEmpty({ message: 'nome da empresa é obrigatório' })
  @IsString()
  @ApiProperty()
  public nome_empresa: string;

  @IsNotEmpty({ message: 'valor é obrigatório' })
  @IsNumber()
  @ApiProperty()
  public consumo: number;
}
