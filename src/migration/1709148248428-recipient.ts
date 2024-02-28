import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1709148248428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipient" (
            "id" SERIAL NOT NULL,
            "name" character varying NOT NULL,
            "email" character varying NOT NULL,
            "isSubscribed" boolean NOT NULL DEFAULT true,
            "userId" uuid NOT NULL,
            "unsubscribeToken" character varying NOT NULL,
            CONSTRAINT "PK_8b0b4c2f15c1a3e0b2f3fda3f6d" PRIMARY KEY ("id")
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "recipient"`);
  }
}
