import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { FonteEnergia } from '../entities/fonteenergia.entity';
import { FonteEnergiaService } from 'src/services/fonteenergia.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseFonteEnergiaDto } from 'src/dtos/response-fonte-energia.dto';

@Controller('fonteEnergia')
@ApiTags('fonte-energia')
@UseInterceptors(ClassSerializerInterceptor)
export class FonteEnergiaController {
  constructor(private readonly fonteEnergiaService: FonteEnergiaService) {}

  @ApiOkResponse({ type: ResponseFonteEnergiaDto, isArray: true })
  @Get()
  async findAll(): Promise<FonteEnergia[]> {
    const propostas = await this.fonteEnergiaService.findAll();
    return propostas;
  }
}
