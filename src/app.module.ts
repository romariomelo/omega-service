import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const configModule = ConfigModule.forRoot();

const typeOrmModule = TypeOrmModule.forRoot();

@Module({
  imports: [configModule, typeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
