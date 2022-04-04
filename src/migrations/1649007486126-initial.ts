import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1649007486126 implements MigrationInterface {
    name = 'initial1649007486126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "board_sleep_history" ("id" SERIAL NOT NULL, "time" TIMESTAMP WITH TIME ZONE NOT NULL, "howLong" integer NOT NULL, "boardId" integer, CONSTRAINT "PK_9af346ee11e6c47db28d6233551" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "watering_history" ("id" SERIAL NOT NULL, "time" TIMESTAMP WITH TIME ZONE NOT NULL, "howLong" integer NOT NULL, "wasSuccessful" boolean NOT NULL, "flowerId" integer, CONSTRAINT "PK_53a0a7865e7ec16ad12d6732ef2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flower" ("id" SERIAL NOT NULL, "wateringTime" integer NOT NULL, "boardId" integer, CONSTRAINT "PK_8d89826a15a9d5d16567c055637" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "maxSleepTime" integer NOT NULL, "lastWatering" TIMESTAMP WITH TIME ZONE NOT NULL, "sleepTo" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "board_sleep_history" ADD CONSTRAINT "FK_1d1a1accb601926f7c990f91eba" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "watering_history" ADD CONSTRAINT "FK_4b206c9e3132dc55603dc76aafc" FOREIGN KEY ("flowerId") REFERENCES "flower"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "flower" ADD CONSTRAINT "FK_3c7aeb916636375231a3a05bdc6" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flower" DROP CONSTRAINT "FK_3c7aeb916636375231a3a05bdc6"`);
        await queryRunner.query(`ALTER TABLE "watering_history" DROP CONSTRAINT "FK_4b206c9e3132dc55603dc76aafc"`);
        await queryRunner.query(`ALTER TABLE "board_sleep_history" DROP CONSTRAINT "FK_1d1a1accb601926f7c990f91eba"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "flower"`);
        await queryRunner.query(`DROP TABLE "watering_history"`);
        await queryRunner.query(`DROP TABLE "board_sleep_history"`);
    }

}
