import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsToUser1707163739503 implements MigrationInterface {
    name = 'AddColumnsToUser1707163739503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "username" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "email" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "password" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "photo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photo"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    }
}
