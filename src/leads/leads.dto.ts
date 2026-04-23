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

export class CreateLeadDto {
  @IsString()
  @MinLength(2)
  nombre!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  telefono?: string;

  @IsIn(['instagram', 'facebook', 'landing_page', 'referido', 'otro'])
  fuente!: string;

  @IsOptional()
  producto_interes?: string;

  @IsOptional()
  @IsNumber()
  presupuesto?: number;
}

export class GetLeadsDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

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
