import * as dotenv from 'dotenv';
import dataSource from '../data-source';
import { Lead } from '../leads/leads.entity';

dotenv.config();

async function seed() {
  await dataSource.initialize();
  const repo = dataSource.getRepository(Lead);
  await repo.clear();
  const leads: Partial<Lead>[] = [
    {
      nombre: 'Juan Perez',
      email: 'juan1@test.com',
      fuente: 'instagram',
      presupuesto: 100,
    },
    {
      nombre: 'Ana Gomez',
      email: 'ana@test.com',
      fuente: 'facebook',
      presupuesto: 200,
    },
    {
      nombre: 'Carlos Ruiz',
      email: 'carlos@test.com',
      fuente: 'landing_page',
      presupuesto: 150,
    },
    {
      nombre: 'Laura Diaz',
      email: 'laura@test.com',
      fuente: 'referido',
      presupuesto: 300,
    },
    {
      nombre: 'Pedro Torres',
      email: 'pedro@test.com',
      fuente: 'otro',
      presupuesto: 50,
    },
    {
      nombre: 'Maria Lopez',
      email: 'maria@test.com',
      fuente: 'instagram',
      presupuesto: 400,
    },
    {
      nombre: 'Andres Vega',
      email: 'andres@test.com',
      fuente: 'facebook',
      presupuesto: 250,
    },
    {
      nombre: 'Sofia Rios',
      email: 'sofia@test.com',
      fuente: 'landing_page',
      presupuesto: 180,
    },
    {
      nombre: 'Diego Castro',
      email: 'diego@test.com',
      fuente: 'referido',
      presupuesto: 90,
    },
    {
      nombre: 'Valentina Mora',
      email: 'valentina@test.com',
      fuente: 'otro',
      presupuesto: 120,
    },
  ];

  await repo.save(leads);

  console.log('✅ Seed ejecutado correctamente');

  await dataSource.destroy();
}

seed().catch((error) => {
  console.error('❌ Error en seed:', error);
});
