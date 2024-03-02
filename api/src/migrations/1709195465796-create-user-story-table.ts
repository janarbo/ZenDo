import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserStoryTable1709195465796 implements MigrationInterface {
    name = 'CreateUserStoryTable1709195465796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_story" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "status" character varying NOT NULL DEFAULT 'To Do', "featureId" integer, CONSTRAINT "PK_cd6f5a48fae7109fbc55f19720e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_story" ADD CONSTRAINT "FK_65784c20d2a4562774fa196596c" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_story" DROP CONSTRAINT "FK_65784c20d2a4562774fa196596c"`);
        await queryRunner.query(`DROP TABLE "user_story"`);
    }
}
