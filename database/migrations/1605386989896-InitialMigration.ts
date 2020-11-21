import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1605386989896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" (
          "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(), 
          "name" character varying(300) NOT NULL, 
          "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
          "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE product`);
  }
}
