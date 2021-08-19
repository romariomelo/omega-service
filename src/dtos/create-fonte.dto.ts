import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FonteEnergiaDto {
  @IsNotEmpty({ message: 'descrição da fonte de energia é obrigatório' })
  @IsIn(['CONVENCIONAL', 'RENOVAVEL'], {
    message: 'Campo fonte_energia deve ser CONVENCIONAL ou RENOVAVEL',
  })
  @IsString()
  public descricao: string;

  @IsNotEmpty({ message: 'valor é obrigatório' })
  @IsNumber()
  public valor: number;
}
