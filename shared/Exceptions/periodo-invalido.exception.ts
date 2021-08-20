import { HttpException, HttpStatus } from '@nestjs/common';

export class PeriodoInvalidoException extends HttpException {
  constructor(mensagem) {
    super(mensagem, HttpStatus.BAD_REQUEST);
  }
}
