import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToUser1706815057959 implements MigrationInterface {
    name = 'AddColumnToUser1706815057959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "photo" character varying `);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" TYPE character varying`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" TYPE character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP  TYPE`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP  TYPE`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photo"`);
    }

}
