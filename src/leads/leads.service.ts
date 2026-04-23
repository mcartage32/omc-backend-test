import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Lead } from './leads.entity';
import { CreateLeadDto, GetLeadsDto } from './leads.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly repo: Repository<Lead>,
  ) {}

  async create(dto: CreateLeadDto) {
    const existing = await this.repo.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('The email address is already registered');
    }

    const lead = this.repo.create(dto);
    return this.repo.save(lead);
  }

  async findAll(query: GetLeadsDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const where: any = {};

    if (query.fuente) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.fuente = query.fuente;
    }

    if (query.startDate && query.endDate) {
      if (new Date(query.startDate) > new Date(query.endDate)) {
        throw new BadRequestException(
          'startDate must be less than or equal to endDate',
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.createdAt = Between(
        new Date(query.startDate),
        new Date(query.endDate),
      );
    }

    const [data, total] = await this.repo.findAndCount({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where,
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: 'DESC' },
    });

    return {
      page,
      limit,
      total,
      lastPage: Math.ceil(total / limit),
      data,
    };
  }

  async findOne(id: string) {
    const lead = await this.repo.findOne({ where: { id } });

    if (!lead) throw new NotFoundException('Lead not found');

    return lead;
  }

  async update(id: string, dto: Partial<CreateLeadDto>) {
    const lead = await this.findOne(id);

    Object.assign(lead, dto);

    return this.repo.save(lead);
  }

  async remove(id: string) {
    const result = await this.repo.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Lead not found');
    }

    return { message: 'Lead deleted successfully' };
  }

  async getStats() {
    const total = await this.repo.count();

    const porFuente = await this.repo
      .createQueryBuilder('lead')
      .select('lead.fuente', 'fuente')
      .addSelect('COUNT(*)', 'count')
      .groupBy('lead.fuente')
      .getRawMany();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const promedio = await this.repo
      .createQueryBuilder('lead')
      .select('AVG(lead.presupuesto)', 'avg')
      .getRawOne();

    const ultimos7dias = await this.repo
      .createQueryBuilder('lead')
      .where("lead.createdAt >= NOW() - INTERVAL '7 days'")
      .getCount();

    return {
      total,
      porFuente,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      promedioPresupuesto: Number(promedio.avg) || 0,
      ultimos7dias,
    };
  }
}
