import { IsOptional, IsIn, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AiSummaryDto {
  @ApiPropertyOptional({
    example: 'facebook',
    enum: ['instagram', 'facebook', 'landing_page', 'referido', 'otro'],
  })
  @IsOptional()
  @IsIn(['instagram', 'facebook', 'landing_page', 'referido', 'otro'])
  fuente?: string;

  @ApiPropertyOptional({
    example: '2026-01-01',
    description: 'Fecha inicial',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2026-12-31',
    description: 'Fecha final',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
