import { IsOptional, IsIn, IsDateString } from 'class-validator';

export class AiSummaryDto {
  @IsOptional()
  @IsIn(['instagram', 'facebook', 'landing_page', 'referido', 'otro'])
  fuente?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
