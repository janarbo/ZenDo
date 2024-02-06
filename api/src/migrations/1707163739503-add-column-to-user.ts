import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToUser1707163739503 implements MigrationInterface {
    name = 'AddColumnToUser1707163739503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" TYPE character varying`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" TYPE character varying`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "photo" TYPE character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "photo" DROP TYPE`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP TYPE`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP TYPE`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username" `);
    }

}
