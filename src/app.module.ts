import { Module } from '@nestjs/common';
import { LeadsModule } from './leads/leads.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import dataBaseConfig from './dataBaseConfig';

@Module({
  imports: [TypeOrmModule.forRoot(dataBaseConfig), LeadsModule, AuthModule],
})
export class AppModule {}
