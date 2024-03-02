import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1709327647178 implements MigrationInterface {
    name = 'CreateTaskTable1709327647178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'To Do', "userStoryId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "user_story" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "feature" DROP COLUMN "status"`);

        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_b1500fa73277080dc0d730f2316" FOREIGN KEY ("userStoryId") REFERENCES "user_story"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_b1500fa73277080dc0d730f2316"`);
  
        await queryRunner.query(`ALTER TABLE "feature" ADD "status" character varying NOT NULL DEFAULT 'To Do'`);
        await queryRunner.query(`ALTER TABLE "user_story" ADD "status" character varying NOT NULL DEFAULT 'To Do'`);
        await queryRunner.query(`ALTER TABLE "project" ADD "status" character varying NOT NULL DEFAULT 'To Do'`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
