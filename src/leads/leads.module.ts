import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './leads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
})
export class LeadsModule {}
