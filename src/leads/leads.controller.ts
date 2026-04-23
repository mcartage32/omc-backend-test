import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto, GetLeadsDto } from './leads.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiService } from '../ai/ai.service';
import { AiSummaryDto } from '../ai/ai-summary.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Leads')
@ApiBearerAuth()
@Controller('leads')
export class LeadsController {
  constructor(
    private readonly service: LeadsService,
    private readonly aiService: AiService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo lead' })
  @ApiBody({ type: CreateLeadDto })
  @ApiResponse({
    status: 201,
    description: 'Lead creado correctamente',
  })
  create(@Body() dto: CreateLeadDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar leads con filtros y paginación' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({
    name: 'fuente',
    required: false,
    example: 'facebook',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    example: '2026-01-01',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    example: '2026-12-31',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de leads',
  })
  findAll(@Query() query: GetLeadsDto) {
    return this.service.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  @ApiOperation({ summary: 'Obtener estadísticas de leads' })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas generadas correctamente',
    schema: {
      example: {
        total: 10,
        porFuente: [
          { fuente: 'facebook', count: 5 },
          { fuente: 'instagram', count: 5 },
        ],
        promedioPresupuesto: 150,
        ultimos7dias: 3,
      },
    },
  })
  stats() {
    return this.service.getStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un lead por ID' })
  @ApiParam({ name: 'id', example: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Lead encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Lead no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un lead' })
  @ApiParam({ name: 'id', example: 'uuid' })
  @ApiBody({ type: CreateLeadDto })
  @ApiResponse({
    status: 200,
    description: 'Lead actualizado',
  })
  update(@Param('id') id: string, @Body() dto: Partial<CreateLeadDto>) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un lead (soft delete)' })
  @ApiParam({ name: 'id', example: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Lead eliminado correctamente',
  })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('ai/summary')
  @ApiOperation({ summary: 'Generar resumen de leads usando IA' })
  @ApiBody({ type: AiSummaryDto })
  @ApiResponse({
    status: 200,
    description: 'Resumen generado',
    schema: {
      example: {
        summary: '📊 Resumen Ejecutivo...',
      },
    },
  })
  async getSummary(@Body() query: AiSummaryDto) {
    const leads = await this.service.getLeadsForAI(query);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const summary = await this.aiService.generateSummary(leads);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { summary };
  }
}
