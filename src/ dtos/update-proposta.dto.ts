import { IsBoolean } from 'class-validator';

export class UpdateProspostaDto {
  @IsBoolean()
  public contratado: boolean;
}
