import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './leads.entity';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { AiService } from '../ai/ai.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  providers: [LeadsService, AiService],
  controllers: [LeadsController],
})
export class LeadsModule {}
