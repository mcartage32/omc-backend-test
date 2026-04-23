import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLeadDto {
  @ApiProperty({ example: 'Marcelo Cartagena' })
  @IsString()
  @MinLength(2)
  nombre!: string;

  @ApiProperty({ example: 'test@email.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ example: '3001234567' })
  @IsOptional()
  telefono?: string;

  @ApiProperty({
    example: 'facebook',
    enum: ['instagram', 'facebook', 'landing_page', 'referido', 'otro'],
  })
  @IsIn(['instagram', 'facebook', 'landing_page', 'referido', 'otro'])
  fuente!: string;

  @ApiPropertyOptional({ example: 'CRM LowCode' })
  @IsOptional()
  producto_interes?: string;

  @ApiPropertyOptional({ example: 1500, type: Number })
  @IsOptional()
  @IsNumber()
  presupuesto?: number;
}

export class GetLeadsDto {
  @ApiPropertyOptional({ example: 1, description: 'Número de página' })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ example: 10, description: 'Cantidad por página' })
  @IsOptional()
  @IsNumberString()
  limit?: string;

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
