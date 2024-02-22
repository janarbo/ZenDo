import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectTable1708579269614 implements MigrationInterface {
    name = 'CreateProjectTable1708579269614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "status" character varying NOT NULL DEFAULT 'To Do'`);
       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "status"`);
    }

}
