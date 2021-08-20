import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({
    format: 'uuid',
    description: 'Id público do usuário',
  })
  public public_id: string;

  @ApiProperty({ required: true, description: 'Nome do usuário' })
  public name: string;

  @ApiProperty({ required: true, description: 'E-mail do usuário' })
  public email: string;
}
