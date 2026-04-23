import { Module } from '@nestjs/common';
import { LeadsModule } from './leads/leads.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataBaseConfig from './dataBaseConfig';

@Module({
  imports: [TypeOrmModule.forRoot(dataBaseConfig), LeadsModule],
})
export class AppModule {}
