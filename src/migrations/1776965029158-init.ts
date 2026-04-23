import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1776965029158 implements MigrationInterface {
    name = 'Init1776965029158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lead" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying NOT NULL, "email" character varying NOT NULL, "telefono" character varying, "fuente" character varying NOT NULL, "producto_interes" character varying, "presupuesto" double precision, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_82927bc307d97fe09c616cd3f58" UNIQUE ("email"), CONSTRAINT "PK_ca96c1888f7dcfccab72b72fffa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lead"`);
    }

}
