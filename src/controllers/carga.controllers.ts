import { Controller, Get } from '@nestjs/common';
import { Carga } from '../entities/carga.entity';

@Controller('carga')
export class CargaController {
  // constructor(private readonly usuarioService: UsuarioService) {}
  @Get()
  async findAll(): Promise<Carga[]> {
    const propostas = await this.cargaService.findAll();
    return propostas;
  }
}
